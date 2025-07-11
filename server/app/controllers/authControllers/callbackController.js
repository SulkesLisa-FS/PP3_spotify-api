// import Axios and querystring for making HTTP requests and handling query strings
const axios = require("axios");
const querystring = require("querystring");
// Import environment configuration and User model
const envConfig = require("../../config/envConfig");
// Import User model for database operations
const User = require("../../models/User");


// Callback controller to handle Spotify's OAuth response
const callbackController = async (req, res) => {
  // Extract code and state from the query parameters
  // These are provided by Spotify after user authentication
  const code = req.query.code || null;
  const state = req.query.state || null;

  // If state is null, redirect with an error
  if (state === null) {
    return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
  }

  // Authentication options for exchanging the code for an access token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: envConfig.spotifyRedirect,
      grant_type: 'authorization_code'
    },
    // Headers for the request, including Basic Auth with client ID and secret
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' +
        Buffer.from(envConfig.spotifyClientId + ':' + envConfig.spotifyClientSecret).toString('base64')
    }
  };
// Main logic for handling the callback
  try {
  //  Response from Spotify after exchanging the code for an access token
    const response = await axios.post(
      // Using the authOptions to make the POST request
      authOptions.url,
      // Using querystring to format the form data
      querystring.stringify(authOptions.form),
      // Including the headers from authOptions
      { headers: authOptions.headers }
    );
    // Destructuring access_token and expires_in from the response
    const { access_token, expires_in } = response.data;

    // Get Spotify user profile
    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      // Using the access token to authenticate the request
      headers: { Authorization: `Bearer ${access_token}` }
    });
    // Extracting user data from the response
    const spotifyUser = userResponse.data;

    // Calculate token expiration date
    const tokenExpires = new Date(Date.now() + expires_in * 1000);

    // Save or update user in DB
    let user = await User.findOne({ spotifyId: spotifyUser.id });

    // If the user does not exist, create a new user
    if (!user) {
      // New user
      user = new User({
        spotifyId: spotifyUser.id,
        accessToken: access_token,
        tokenExpires: tokenExpires,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      // If user exists, update tokens and updatedAt
      user.accessToken = access_token;
      user.tokenExpires = tokenExpires;
      user.updatedAt = new Date();
    }
    // Save the user to the database
    await user.save();
    console.log("User saved/updated successfully:", user);

    // Respond (for dev/testing user info)
    res.json({
      message: "User saved/updated successfully!",
      spotifyId: user.spotifyId,
      tokenExpires: user.tokenExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });

  } catch (error) {
    console.error("Error during Spotify callback:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to authenticate and save user" });
  }
};

module.exports = callbackController;
