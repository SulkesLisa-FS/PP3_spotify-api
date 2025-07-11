// Importing the environment variable configuration FIRST
require("dotenv").config();

// Importing the express module
const app = require("./app");

// Import the environment configuration
const envConfig = require("./app/config/envConfig");

// Import the database
const connectDB = require("./app/db/config");

// Run the database (MongoDB) asynchronous function
connectDB(envConfig.mongoURI);

//  Port Variable from .env file
const PORT = process.env.PORT || 3000;

// Starting the server and listening on the specified port
// listening for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
