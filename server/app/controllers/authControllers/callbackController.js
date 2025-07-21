// Import querystring for handling query strings
const querystring = require("querystring");
// Import User model for database operations
const User = require("../../models/User");
// Import Spotify service for token handling
const spotifyService = require("../../services/spotifyService");
// Import redirect utility
const { getRedirectUrls } = require("../../utils/redirectUtils");

// Callback controller to handle Spotify's OAuth response
const callbackController = async (req, res) => {
  // Extract code and state from the query parameters
  // These are provided by Spotify after user authentication
  const code = req.query.code || null;
  const state = req.query.state || null;

  // Get redirect URLs for current environment
  const { home, login } = getRedirectUrls();

  // If state is null, redirect with an error
  if (state === null) {
    return res.redirect(
      // Redirect to login with an error message
      login + "?" + querystring.stringify({ error: "state_mismatch" })
    );
  }

  try {
    // Exchange authorization code for access token using Spotify service
    const tokenResult = await spotifyService.exchangeCodeForToken(code);

    // If token exchange fails:
    if (!tokenResult.success) {
      return res.redirect(
        // Redirect to login with an error message if token exchange fails
        login + "?" + querystring.stringify({ error: "token_exchange_failed" })
      );
    }

    // Extract access token and expiration from the response
    const { access_token, refresh_token, expires_in } = tokenResult.data;

    // Get user profile using Spotify service
    const profileResult = await spotifyService.getUserProfile(access_token);

    // If Profile fetch is not successful:
    if (!profileResult.success) {
      return res.redirect(
        // Redirect to login with an error message if profile fetch fails
        login + "?" + querystring.stringify({ error: "profile_fetch_failed" })
      );
    }

    const spotifyUser = profileResult.data;

    // Calculate token expiration date
    const tokenExpires = new Date(Date.now() + expires_in * 1000);

    // Save or update user in database
    let user = await User.findOne({ spotifyId: spotifyUser.id });

    // If no user found:
    if (!user) {
      // Create new user
      user = new User({
        spotifyId: spotifyUser.id,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpires: tokenExpires,
      });
    } else {
      // Else, Update existing user
      user.accessToken = access_token;
      user.refreshToken = refresh_token;
      user.tokenExpires = tokenExpires;
    }

    // Save the user to the database
    await user.save();
    console.log("User saved/updated successfully:", user);

    // Redirect authenticated user to home page to begin searching for queries.
    res.redirect(home);
  } catch (error) {
    console.error("Error during Spotify callback:", error);
    // if not authenticated - redirect to login page with error
    res.redirect(
      login + "?" + querystring.stringify({ error: "authentication_failed" })
    );
  }
};

module.exports = callbackController;
