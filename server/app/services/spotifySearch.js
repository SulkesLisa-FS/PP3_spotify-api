const axios = require("axios");


// Class to handle search request and formats the results for the client UI
class SpotifySearch { 
    // Search: artist, albms and tracks using Spotify Web API

   

// Build The Search from the search controller prams
async searchItems(searchParams ,accessToken ) {
try {
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
      if (searchParams.include_external) {
        searchUrl.searchParams.append("include_external", 
        searchParams.include_external);
        
      }


    // GET - request to get Spotify API data
    const response = await axios.get(searchUrl.toString(), {
        // Pass the user token to tell spotify who is makeing the request
        headers: { Authorization: `Bearer ${accessToken}`},
    });

    // Format response data
    const formattedData = this.formatSearchResults(response.data);    

    // Return the formatted data
    return {
        success: true,
        data: formattedData
    };
  } 
  catch (error) {
      console.error(
        "Error searching Spotify:",
        // if error response exists, use it; otherwise use message
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
} // ← This closes the searchItems method


// Define and Format Search For Easier UI
// Format Search Results
formatSearchResults (spotifyData) {

    return { 

        // ARTIST:
        artists: spotifyData.artists?.items?.map(artist => ({
        id: artist.id,
        name: artist.name,
        image: this.getImageUrl(artist.images, 300),
        spotifyUrl: artist.external_urls.spotify,
        type: "artist"
        // returns an empty array if no artist are found
        })) || [],

        //  ALBUMS:
         albums: spotifyData.albums?.items?.map(album => ({
        id: album.id,
        name: album.name,
        image: this.getImageUrl(album.images, 300),
        artist: album.artists[0]?.name,
        spotifyUrl: album.external_urls.spotify,
        albumType: album.album_type,
        type: "album"
        // Returns an empty array if no albums are found
      })) || [],

       tracks: spotifyData.tracks?.items?.map(track => ({
        id: track.id,
        name: track.name,
        image: this.getImageUrl(track.album?.images, 300),
        artist: track.artists[0]?.name,
        spotifyUrl: track.external_urls.spotify,
        type: "track"
      })) || []



    }
}


// Set Image Size (300x300)
getImageUrl(images, targetSize = 300) {
    // Check if No image or Image length = 0 - Return null
    if (!images || images.length === 0) return null;

    // Sort images from smallest to largest based on width and return the image that is the closest to the target size
    const sortedImages = [...images].sort((a,b) =>
        Math.abs(a.width - targetSize) - Math.abs(b.width - targetSize)
    );
    // Return the first image in the sorted array, which is the closest to the target size
    return sortedImages[0].url;
}
































}

module.exports = new SpotifySearch();