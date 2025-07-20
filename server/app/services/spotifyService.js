const axios = require("axios");
const querystring = require("querystring");
const envConfig = require("../config/envConfig");

class SpotifyService {
  // Exchange authorization code for access token
  async exchangeCodeForToken(code) {
    // Prepare the request options for exchanging code for token
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        // Using the code received from Spotify
        code: code,
        // Redirect URI configured in environment variables
        redirect_uri: envConfig.spotifyRedirect,
        // Grant type for the token exchange
        grant_type: "authorization_code",
      },
      // Headers for the request
      headers: {
        // Content type for the request
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            envConfig.spotifyClientId + ":" + envConfig.spotifyClientSecret
          ).toString("base64"),
      },
    };

    try {
      // Make the POST request to exchange code for token
      // Using axios to send the request with the form data and headers
      const response = await axios.post(
        // URL for the Spotify API token endpoint
        authOptions.url,
        // Stringify the form data
        querystring.stringify(authOptions.form),
        // Include the headers in the request
        { headers: authOptions.headers }
      );

      return {
        // Return success status and data from the response
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Error exchanging code for token:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  // Get Spotify user profile using access token
  async getUserProfile(accessToken) {
    try {
      // Make the GET request to fetch user profile
      const response = await axios.get("https://api.spotify.com/v1/me", {
        // Using the access token for authorization
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return {
        // Return success status and user profile data
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

// Token Refresh Validation Check for user's access token
refreshToken(user) {
  // If no user token expiration is set, assume it needs refresh
  if(!user.tokenExpires) {
    return true;
  }
  // Compare current time with token expiration time
  // If current time is greater than token expiration time, it needs to be refreshed
  if (new Date() > user.tokenExpires) {
    return true; 
  }
  // Otherwise the token is still valid and does not need to be refreshed 
  return false; 
}







}

module.exports = new SpotifyService();
