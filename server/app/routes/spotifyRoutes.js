// Import Express
const express = require("express");
const router = express.Router();

// Import Search Controller 
const searchController = require("../controllers/spotifyControllers/searchController");

// The search endpoint - query parameters are passed via URL
router.get("/search", searchController);

module.exports = router;
