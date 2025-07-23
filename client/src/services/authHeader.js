function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  // Change from user.token to user.spotifyId
  if (user && user.spotifyId) {  
    // Use spotifyId
    return { Authorization: `Bearer ${user.spotifyId}` };  
  } 
  else {
    return {};
  }
}

export default authHeader;