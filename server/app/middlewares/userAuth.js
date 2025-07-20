// Import axios and querysting
const axios = require("axios");
const querystring = require("querystring");


// Import user model and service file
const User = require("../models/User");
const envConfig = require("../config/envConfig");
const spotifyService = require("../services/spotifyService");



// Get the Spotify user ID from the auth header 


// Find user in the database



//  Call service file to check if token is expired true or flase


// Refresh token if true


// Update user for valid access







  const userAuth = async () => {

//  SPOTIFY'S EXAMPLE: 


   // Spotify Example
   const refreshToken = localStorage.getItem('refresh_token');
   const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
    if (response.refresh_token) {
      localStorage.setItem('refresh_token', response.refresh_token);
    }
  }

  //   module.exports = userAuth;