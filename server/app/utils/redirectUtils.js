const envConfig = require("../config/envConfig");

// Simple utility to get redirect URLs based on environment
const getRedirectUrls = () => {
  // Base URL for redirects
  // In Dev client on Port 3001, in production use domain
  const baseURL =
    process.env.NODE_ENV === "production"
       ? envConfig.baseURL
      : "http://localhost:3001";

  return {
    // Redirect URLs for home and login based on authentication success or failure
    home: baseURL,              
    login: `${baseURL}/login`
  };
};


module.exports = { getRedirectUrls };

