// Importing the express module
const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Importing the environment variable configuration
require("dotenv").config();

// Import the database
const connectDB = require("./db/config");

// Run the database (MongoDB) asynchronous function
connectDB();

// Middleware
// use CORS to allow cross-origin requests
app.use(cors());
// Attaching morgan to the app
app.use(morgan("dev"));
// Parsing incoming requests as JSON
app.use(express.json());



//  Port Variable from .env file
const PORT = process.env.PORT || 3000;


// Importing the database connection to the root of the application - respond when the root route is accessed
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is Running", success: true });
});





// Starting the server and listening on the specified port
// listening for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});