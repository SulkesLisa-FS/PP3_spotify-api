function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  // Check for both accessToken and spotifyId, use spotifyId for Bearer auth
  if (user && user.accessToken && user.spotifyId) {
    // Use spotifyId for server user lookup
    return { Authorization: `Bearer ${user.spotifyId}` };
  } else {
    return {};
  }
}

export default authHeader;
