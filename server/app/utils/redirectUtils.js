const envConfig = require("../config/envConfig");

// Simple utility to get redirect URLs based on environment
const getRedirectUrls = () => {
  // Base URL for redirects
  // In Dev: use dynamic client port or default to 3001, in production use domain
  const baseURL =
    process.env.NODE_ENV === "production"
       ? "https://pp3-demo-app-215665657891.herokuapp.com"  // Hardcoded for testing
       : `http://localhost:${process.env.CLIENT_PORT || 3001}`;

  return {
    // Redirect URLs for home and login based on authentication success or failure
    home: baseURL,              
    login: `${baseURL}/login`
  };
};


module.exports = { getRedirectUrls };

