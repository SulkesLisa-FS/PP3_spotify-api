module.exports = {
    // Development configuration settings
    prodURL: process.env.ENV_DEV || 'http://localhost:3000',
    mongoURI: process.env.MONGODB_DEV || 'mongodb://localhost:27017/app-dev',
    spotifyClientId: process.env.CLIENT_ID,
    spotifyClientSecret: process.env.CLIENT_SECRET,
    spotifyRedirect: process.env.REDIRECT_DEV,
};
