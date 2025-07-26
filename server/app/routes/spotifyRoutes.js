// Import Express
const express = require("express");
const router = express.Router();
// Import User Authentication Middleware
const userAuth = require("../middlewares/userAuth");

// Import Search Controller
const searchController = require("../controllers/spotifyControllers/searchController");

// The search endpoint - query parameters are passed via URL - Authenticated by userAuth middleware
router.get("/search", userAuth, searchController);

module.exports = router;
