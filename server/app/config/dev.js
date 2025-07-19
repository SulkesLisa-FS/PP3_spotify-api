module.exports = {
  // Development configuration settings
  prodURL: process.env.BASE_URL || "http://localhost:3000/api/v1/",
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/spotify-app",
  spotifyClientId: process.env.CLIENT_ID,
  spotifyClientSecret: process.env.CLIENT_SECRET,
  spotifyRedirect: process.env.REDIRECT_URI,
};
