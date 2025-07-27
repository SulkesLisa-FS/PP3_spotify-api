const envConfig = require("../config/envConfig");

// Simple utility to get redirect URLs based on environment
const getRedirectUrls = () => {
  // Base URL for redirects
  // In Dev: use dynamic client port or default to 3001, in production use domain
  const baseURL =
    process.env.NODE_ENV === "production"
       ? "https://pp3-demo-app-215665657891.herokuapp.com"
      : "http://localhost:3001";

  // DEBUG -Check the values
  // console.error("=== REDIRECT UTILS DEBUG ===");
  // console.error("NODE_ENV:", process.env.NODE_ENV);
  // console.error("Final baseURL:", baseURL);
  // console.error("============================");

  return {
    // Redirect URLs for home and login based on authentication success or failure
    home: baseURL,              
    login: `${baseURL}/login`
  };
};


module.exports = { getRedirectUrls };

