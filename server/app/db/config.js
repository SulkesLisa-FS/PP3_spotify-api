// Import the mongoose module
const mongoose = require("mongoose");


// JSDoc
/**
 * Establishes connection to MongoDB database
 - MongoDB connection string from environment config file
 * @param {string} mongoURI 
 - Resolves when connection is established
 * @returns {Promise} 
 */

const connectDB = async (mongoURI) => {
  try {
    // use the mongoURI passed as an argument from server.js callback 

    // Connect to the MongoDB database using Mongoose
    const conn = await mongoose.connect(mongoURI);

    // Log the successful connection to the console
    console.log(`Connected to MongoDB successfully`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

// Export the connectDB function
module.exports = connectDB;
