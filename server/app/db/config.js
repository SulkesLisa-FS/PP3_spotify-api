// Import the mongoose module
const mongoose = require("mongoose");

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
