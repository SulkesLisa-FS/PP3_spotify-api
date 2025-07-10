// Importing required express modules
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require('path');
const app = express();

// Importing the route handler
//const routeHandler = require("./routes");

// Middleware
// use CORS to allow cross-origin requests
app.use(cors());
// Attaching morgan to the app
app.use(morgan("dev"));
// Parsing incoming requests as JSON
app.use(express.json());

// app uses the route handler for all requests to the "/api/v1" endpoint
//app.use("/api/v1", routeHandler);

// Use express static middleware to the path to the build folder
// This is used to serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../client/dist")));

// This is used to serve the index.html file from the build folder
// get all routes and send the index.html file
// the wildcard changed to { *splat } with express 4.16.0
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));          
});

// Importing the database connection to the root of the application - respond when the root route is accessed
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is Running", success: true });
});

// Exporting the app module
module.exports = app;
