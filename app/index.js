// Importing required express modules
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
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

// Importing the database connection to the root of the application - respond when the root route is accessed
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is Running", success: true });
});

// Exporting the app module
module.exports = app;
