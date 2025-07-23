import axios from "axios";
import authHeader from "../services/authHeader";


// API Variables
// Base URL for the API 
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Spotify Login URL
 const SPOTIFY_SIGNUP_URL = "https://www.spotify.com/signup";




// Create an API object to hold all the API methods
const API = Object.create(null);



// Search Songs



export default {
  API,
  SPOTIFY_SIGNUP_URL
};