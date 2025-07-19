const axios = require("axios");


// Class to handle search request and formats the results for the client UI
class SpotifySearch { 
    // Search: artist, albms and tracks using Spotify Web API

   

// Build The Search from the search controller prams
async seachItems(searchPrams ) {

    // Spotify Base Search Endpoint
    const baseUrl = "https://api.spotify.com/v1/search";
    // Create search object with appending search parameters
    const searchUrl = new URL(baseUrl);

    // Search controller search parameters
    // Query trimmed to avoid leading and trailing spaces
    searchUrl.searchParams.append("q", searchParams.query.trim());
    // Default type to artist, albums, and tracks
      searchUrl.searchParams.append("type", searchParams.type || "artist,album,track");
    //   limit range
      searchUrl.searchParams.append("limit", searchParams.limit.toString());
    //   offset for pagination
      searchUrl.searchParams.append("offset", searchParams.offset.toString());

      // Check if there is external audio content
      if (searchPrams.include_external) {
        searchUrl.searchParams.append("include_external", 
        searchPrams.include_external);
        
      }


    // GET - request to get Spotify API data
    const response = await axios.get(searchUrl.toString(), {
        // Pass the user token to tell spotify who is makeing the request
        headers: { Authorization: `Bearer ${accessToken}`},
    });

}




// Define and Format Search For Easier UI



































}

module.exports = new SpotifySearch();