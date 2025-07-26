const envConfig = require("../config/envConfig");

// Simple utility to get redirect URLs based on environment
const getRedirectUrls = () => {
  // Base URL for redirects
  // In Dev: use dynamic client port or default to 3001, in production use domain
  const baseURL =
    process.env.NODE_ENV === "production"
       ? envConfig.baseURL
      : `http://localhost:${process.env.CLIENT_PORT || 3001}`;

  // Temporary debugging - remove after testing
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("envConfig.baseURL:", envConfig.baseURL);
  console.log("Final baseURL:", baseURL);

  return {
    // Redirect URLs for home and login based on authentication success or failure
    home: baseURL,              
    login: `${baseURL}/login`
  };
};


module.exports = { getRedirectUrls };

