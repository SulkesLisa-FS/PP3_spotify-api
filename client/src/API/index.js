import axios from "axios";


// API Variables
// Base URL for the API 
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
// Spotify Login URL
const SPOTIFY_SIGNUP_URL = "https://www.spotify.com/signup";


//  Handles Api calls with Axios

// Create an API object to hold all the API methods
const API = {


  // Logout method - TEMP for testing
  logout: () => {
    return axios.get(`${BASE_URL}/auth/logout`);
  }
};


// TODO: Add Methods

// Search Songs

// Login


export default {
  API,
  SPOTIFY_SIGNUP_URL
};