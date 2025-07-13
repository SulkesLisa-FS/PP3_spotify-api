// Import express and router
const express = require("express");
const router = express.Router();

// Import Auth Route Controllers
const { 
    loginController, 
    callbackController, 
    logoutController } = require("../controllers/authControllers");

// Route Endpoints and Controllers for Authentication
router.get("/login", loginController);
router.get("/callback", callbackController);
router.get("/logout", logoutController);

module.exports = router;