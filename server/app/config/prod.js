module.exports = {
    // Production configuration settings
    prodURL: process.env.BASE_URL,
    mongoURI: process.env.MONGODB_URI,
    spotifyClientId: process.env.CLIENT_ID,
    spotifyClientSecret: process.env.CLIENT_SECRET,
    spotifyRedirect: process.env.REDIRECT_URI,
};