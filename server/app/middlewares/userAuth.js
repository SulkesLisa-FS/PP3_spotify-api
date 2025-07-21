// Import axios and querysting
const axios = require("axios");
const querystring = require("querystring");


// Import user model and service file
const User = require("../models/User");
const envConfig = require("../config/envConfig");
const spotifyService = require("../services/spotifyService");
const { param } = require("../routes/spotifyRoutes");

// Midleware that validates Spotify OAuth tokens and refreshes tokens before accessing protected routes

/**
 * Parameters string in Authorization header returns the access token
 * @param {string} authHeader 
 * @returns {string | null} 
 */
//  Extract the access token from the Authorization header
const getAccessToken = (authHeader) => {
  // Check if header exists and follows Bearer token format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  // Extract the access token (everything after "Bearer ")
  return authHeader.substring(7);
};


/**
 * Parameters object that contains the request, response, and next function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
// Middleware function to authenticate user using Spotify OAuth
const userAuth = async (req, res, next) => {
  try {
    // GET access token from Authorization header
    const accessToken = getAccessToken(req.headers.authorization);
    // If no access token is provided, return 401 Unauthorized
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: "Authorization header required: Bearer {accessToken}"
      });
    }

    // Find user record in MongoDB using access token
    let user = await User.findOne({ accessToken });
    // If user not found, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid access token or user not found"
      });
    }


    // Check if token needs refresh using the service validation method
    // spotifyService.refreshToken(user) returns true if token is expired or missing
    if (spotifyService.refreshToken(user)) {
      console.log("Access token expired, will refresh...");

      // Refresh token using Spotify's OAuth pattern
      try {
        // Prepare token refresh request options following Spotify's format
        const authOptions = {
          // Spotify's token endpoint for refresh requests
          url: "https://accounts.spotify.com/api/token",
          // Form data to send to Spotify (matches their documentation)
          form: {
            // request type for token refresh
            grant_type: "refresh_token",     
            // send the stored refresh token
            refresh_token: user.refreshToken, 
            //  client ID      
            client_id: envConfig.spotifyClientId,  
          },
          // HTTP headers for the request
          headers: {
            // Required format for token requests
            "content-type": "application/x-www-form-urlencoded", 
          },
        };
        
        // Make the POST request to Spotify's token endpoint
        // Convert form object to URL-encoded string using querystring
        const response = await axios.post(
          // Spotify's token URL
          authOptions.url,  
          // Stringify the form data                       
          querystring.stringify(authOptions.form),  
          // Include required headers
          { headers: authOptions.headers }          
        );
        // Extract new token data from Spotify's response
        const { access_token, refresh_token, expires_in } = response.data;
        
        // Update user object with fresh token information
        // Store new access token
        user.accessToken = access_token;   
        // Calculate expiration time (expires_in is in seconds)                           
        user.tokenExpires = new Date(Date.now() + expires_in * 1000); 
        
       
        //  Check if Spotify provided a new refresh token
        if (refresh_token) {
          // Update the refresh token 
          user.refreshToken = refresh_token;  
        }

        // Save updated token data to database 
        await user.save();
        console.log("Access token refreshed successfully for user:", user.spotifyId);
        
      } catch (error) {
        // If token refresh fails, user needs to log in again
        console.error("Token refresh failed:", error.response?.data || error.message);
        return res.status(401).json({
          success: false,
          error: "Failed to refresh access token. Please log in again."
        });
      }
    }

    // Attach user object with valid access token to the request
    // The controller can now use req.user.accessToken for Spotify API calls
    req.user = user;
    
    // Call next() to pass control to the next middleware/controller in the chain
    next();

  } catch (error) {
    // Handle any unexpected errors during authentication process
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      error: "Authentication failed"
    });
  }
};

module.exports = userAuth;
