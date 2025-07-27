// Import the environment configuration
const { spotifyClientId, spotifyRedirect } = require("../../config/envConfig");
// Import express querystring for building query strings 
// and crypto for generating random strings
const querystring = require("querystring");
const crypto = require("crypto");



const loginController = async (req, res) => {
  try {
    // Extracting client_id and redirect_uri from environment configuration
    const client_id = spotifyClientId;
    const redirect_uri = spotifyRedirect;
    
    // DEBUG - Remove after testing
    console.error("=== LOGIN DEBUG ===");
    console.error("process.env.SPOTIFY_REDIRECT:", process.env.SPOTIFY_REDIRECT);
    console.error("spotifyRedirect from config:", spotifyRedirect);
    console.error("redirect_uri variable:", redirect_uri);
    console.error("==================");
    
    // Generate a random state and scope for the OAuth 
    const state = generateRandomString(16);
    // scope is a space-separated list of permissions requested from the user
    const scope = "user-read-private user-read-email";

    // Redirect the user to Spotify's authorization page
    res.redirect('https://accounts.spotify.com/authorize?' +
      // Using querystring to build the authorization URL that includes the client_id, scope, redirect_uri, and state
       querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));

  } 
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed', 
      message: 'Unable to authenticate with Spotify. Please try again later.' 
    });
  }

  // Generate a random string of specified length
  function generateRandomString(length) {
      // Using a set of characters to generate the random string
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   Using crypto to generate secure random values
    const values = crypto.getRandomValues(new Uint8Array(length));
      // Reducing values to a string based on possible characters
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
};


// Export the controller!
module.exports = loginController;








