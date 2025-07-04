// Importing the express module
const express = require(`express`)

// Importing the environment variable configuration
require("dotenv").config();


// Create a new Express instance called "app"
const app = express()





/// Import the database
const connectDB = require("./db/config");
// Run the  database (MongoDB) asynchronous function
connectDB();



//  Port Variable from .env file
const PORT = process.env.PORT || 3000;

// Set Routes

// Login
// Auth



// Starting the server and listening on the specified port
// listening for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});