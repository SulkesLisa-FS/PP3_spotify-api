// Import express and router
const express = require("express");
const router = express.Router();


// Spotify Authentication Routes
const authRoutes = require("./authRoutes");


// Define and use routes
router.use("/auth", authRoutes);
// Root Route Handler
router.get("/", (req, res) => {
    res.status(200).json({
        sucess: true,
        message: `${req.method} - Request made`
    });
});

// export the router
module.exports = router;
