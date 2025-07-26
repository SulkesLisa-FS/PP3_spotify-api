// Importing required express modules
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

// Importing the route handler
const routeHandler = require("./routes");

// Middleware
// use CORS to allow cross-origin requests
app.use(cors());
// Attaching morgan to the app
app.use(morgan("dev"));
// Parsing incoming requests as JSON
app.use(express.json());

// app uses the route handler for all requests to the "/api/v1" endpoint
app.use("/api/v1", routeHandler);

// if in production, serve static files from the React dist directory
if (process.env.NODE_ENV === "production") {
  // Serve static files from React dist directory
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  // Serve React app for all non-API routes (must be last)
  // the wildcard changed to { *splat } with express 4.16.0
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
  });
}

// Exporting the app module
module.exports = app;
