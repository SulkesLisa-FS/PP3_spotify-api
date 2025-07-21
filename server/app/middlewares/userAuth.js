// Import axios and querysting
const axios = require("axios");
const querystring = require("querystring");

// Import user model and service file
const User = require("../models/User");
const envConfig = require("../config/envConfig");
const spotifyService = require("../services/spotifyService");

// /Middleware  that validates Spotify OAuth tokens and refreshes tokens before accessing protected routes

//  Extract the user Id from the Authorization header
const getSpotifyId = (authHeader) => {
  // Check if header exists and follows Bearer token format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  // Extract everything after "Bearer
  return authHeader.substring(7);
};

// Middleware function to authenticate user using Spotify OAuth
const userAuth = async (req, res, next) => {
  try {
    // GET the spotify Id from Authorization header
    const spotifyId = getSpotifyId(req.headers.authorization);
    // If no Id is provided, return 401 Unauthorized
    if (!spotifyId) {
      return res.status(401).json({
        success: false,
        error: "Authorization header required: Bearer {spotifyUserId}",
      });
    }

    // Find user record in MongoDB using the Id
    let user = await User.findOne({ spotifyId });
    // If user not found, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // Check if token needs refresh using the service validation method
    //  returns true if token is expired or missing
    if (spotifyService.needsTokenRefresh(user)) {
      console.log("Access token expired, needs refresh");

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
            //client_id: envConfig.spotifyClientId,
          },
          // HTTP headers for the request
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                envConfig.spotifyClientId + ":" + envConfig.spotifyClientSecret
              ).toString("base64"),
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
        console.log("Access token refreshed successfully");
      } catch (error) {
        // If token refresh fails, user needs to log in again
        console.error(
          "Token refresh failed:",
          error.response?.data || error.message
        );
        return res.status(401).json({
          success: false,
          error: "Failed to refresh access token. Please log in again.",
        });
      }
    }

    // Attach user object with a valid access token to the request
    // The controller can now use req.user.accessToken for Spotify API calls
    req.user = user;

    // Call next() to pass control to the next middleware/controller in the chain
    next();
  } catch (error) {
    // Handle any unexpected errors during authentication process
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

module.exports = userAuth;
