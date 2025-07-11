const express = require("express");
const router = express.Router();

// Import Auth Route Controllers
const loginController = require("../controllers/authControllers");
const callbackController = require("../controllers/authControllers");
const logoutController = require("../controllers/authControllers");

// Route handler for Authentication
router.get("/login", loginController);
router.get("/callback", callbackController);
router.get("/logout", logoutController);

module.exports = router;