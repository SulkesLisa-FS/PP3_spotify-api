const app = express();
const { spotifyClientId, spotifyRedirect } = require("../config/envConfig");
const querystring = require("querystring");
const crypto = require("crypto");

const loginController = (req, res) => {
// Extracting client_id and redirect_uri from environment configuration
const client_id = spotifyClientId;
const redirect_uri = spotifyRedirect;
// Generate a random state and scope for the OAuth flow
const state = generateRandomString(16);
// scope is a space-separated list of permissions requested from the user
const scope = "user-read-private user-read-email";



app.get("/login", function(req, res) {
// Redirect the user to Spotify's authorization page
res.redirect('https://accounts.spotify.com/authorize?' +
    // Using querystring to build the authorization URL
     querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));

});


// Generate a random string of specified length
const generateRandomString = (length) => {
    // Using a set of characters to generate the random string
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   Using crypto to generate secure random values
  const values = crypto.getRandomValues(new Uint8Array(length));
    // Reducing values to a string based on possible characters
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);




}




// Export the controller!
module.exports = loginController;








