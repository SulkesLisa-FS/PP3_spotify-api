// OAuth Controllers

// Import Spotify OAuth Controllers
const loginController = require("./loginController");
const callbackController = require("./callbackController");
const logoutController = require("./logoutController");


module.exports = {
    loginController,
    callbackController,
    logoutController,
};