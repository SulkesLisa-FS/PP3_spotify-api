
// User authentication controller for handling logout requests
const User = require("../../models/User");
const { getRedirectUrls } = require("../../utils/redirectUtils");

const logoutController = async (req, res) => {
  try {
    // Get redirect URL for login page
    const { login } = getRedirectUrls();
    
    // Get spotifyId from query parameter
    const spotifyId = req.query.spotifyId;
    
    // If spotifyId exists, delete user from database
    if (spotifyId) {
      const deletedUser = await User.findOneAndDelete({ spotifyId });
      // if user was deleted with spotifyId, log a message
      if (deletedUser) {
        console.log(`User ${spotifyId} logged out and tokens cleared`);
      }
    } else {
      console.log("Logout attempt without spotifyId");
    }
    
    // Always redirect to login page regardless of outcome
    res.redirect(login);


  } 
  catch (error) {
    console.error("Logout error:", error);
    // Even on error, redirect to login page
    const { login } = getRedirectUrls();
    res.redirect(login);
  }
}

module.exports = logoutController;
