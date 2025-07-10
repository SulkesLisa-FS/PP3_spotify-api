// Import the mongoose module
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB environment variable based on the current environment
    // If the environment is production, use the production URI; otherwise, use the development URI
    const mongoURI = process.env.NODE_ENV === "production"
      ? process.env.MONGODB_PROD 
      : process.env.MONGODB_DEV;

    // Connect to the MongoDB database using Mongoose
    const conn = await mongoose.connect(mongoURI);

    // Log the successful connection to the console 
    console.log(`Connected to MongoDB successfully (${process.env.NODE_ENV || 'development'})`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

// Export the connectDB function
module.exports = connectDB;
