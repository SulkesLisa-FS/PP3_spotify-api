import axios from "axios";
import authHeader from "../services/authHeader";


// API Variables
// Base URL for the API 
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Spotify Login URL
 //const SPOTIFY_SIGNUP_URL = "https://www.spotify.com/signup";




// Create an API object to hold all the API methods
const API = Object.create(null);

// Get User by Spotify ID
API.getUser = (spotifyId) =>
  axios.get(`${BASE_URL}/users/${spotifyId}`, { headers: authHeader() });

// Search 
API.search = async ({ q, type = "track" , limit = 10 }) => { 
  
  const url = `${BASE_URL}/spotify/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}`;
  return axios.get(url, { headers: authHeader() });
 
};


export default API;