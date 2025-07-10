module.exports = {
    // Production configuration settings
    prodURL: process.env.ENV_PROD,
    mongoURI: process.env.MONGODB_PROD,
    spotifyClientId: process.env.CLIENT_ID,
    spotifyClientSecret: process.env.CLIENT_SECRET,
    spotifyRedirect: process.env.REDIRECT_PROD,
};