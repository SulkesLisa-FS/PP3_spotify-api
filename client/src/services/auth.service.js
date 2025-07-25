import axios from "axios";

// Production API Base URL
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Development API Base URL
const BASE_URL = "http://localhost:3000/api/v1";

// Authentication URL to API
const API_URL = "/auth";


// Authentication Login URL
export const SPOTIFY_LOGIN_URL = `${BASE_URL}${API_URL}/login`;

//  CURRENT USER - LOGGED IN USER 
const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // Return user only if it has valid authentication data
    return user && user.accessToken && user.spotifyId ? user : null;
};

// Set Current User Data in local storage - access token and ID
const setCurrentUser = (accessToken, spotifyId) => {
  const user = { accessToken, spotifyId };
  localStorage.setItem("user", JSON.stringify(user));
};


//  LOGOUT WITH SERVER CALL
const logout = () => {
    // Get user data before clearing localStorage
    const user = getCurrentUser();
    // Clear localStorage
    localStorage.removeItem("user");
    // Clear any other storage that might persist
    sessionStorage.clear();
    // Direct navigation with spotifyId and force refresh
    window.location.href = `${BASE_URL}${API_URL}/logout?spotifyId=${user?.spotifyId}`;
   
};

const authServices = {
    getCurrentUser,
    setCurrentUser,
    logout,
}

export default authServices;