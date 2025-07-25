import axios from "axios";
import authHeader from "../services/authHeader";


// API Variables
// Base URL for the API 
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Global axios interceptor to handle 401 responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if it's a 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      // Clear user data from localStorage
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Create an API object to hold all the API methods
const API = Object.create(null);



// Search object
API.search = async ({ q, type = "track" , limit = 10 }) => { 
  
  // Construct the URL for the search API endpoint
  // Use encodeURIComponent to safely encode the query parameter
  // This ensures that special characters in the query do not break the URL
  const url = `${BASE_URL}/spotify/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}`;
  

  // get url with auth header
   const response = await axios.get(url, { headers: authHeader() });

  // response.data contains { success, data }
  // data contains { artists, albums, tracks }
  // destructure response.data to get success and data
    const { success, data } = response.data; 

     // Filter artists to only include those whose name contains the query
  const filteredArtists = (data.artists || []).filter((artist) =>
    artist.name.toLowerCase().includes(q.toLowerCase())
  );
 
  // Sort each array alphabetically by name
  const sortedData = {
    artists: filteredArtists.sort((a, b) => a.name.localeCompare(b.name)),
    albums: data.albums ? data.albums.sort((a, b) => a.name.localeCompare(b.name)) : [],
    tracks: data.tracks ? data.tracks.sort((a, b) => a.name.localeCompare(b.name)) : []
  };
  // Return the success status and sorted data
  return { success, data: sortedData };
};

export default API;