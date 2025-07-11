// Authorization Contollers

// Import Spotify Authorization Contorllers
const loginController = require("./loginController");
const callbackController = require("./callbackController");
const logoutController = require("./logoutController");


module.exports = {
    loginController,
    callbackController,
    logoutController,
};