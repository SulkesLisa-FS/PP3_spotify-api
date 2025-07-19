const spotifySearch = require("../../services/spotifySearch");

const searchController = async (req, res) => {
  
  // Search - default is artist, album, track

  try {
    // Extracting Query Parameters
    const {
      // Search Query
      q: query,
      // Type of items to search for
      type = "artist,album,track",
      // Limit of results (0-10)
      limit = 10,
      // Offset for pagination
      offset = 0,
      // Include external - redirects to external URLs such as Spotify's web player
      include_external,
    } = req.query;

// Query Parameter Checks - before calling Spotify API
// If there is No Query
 if (!query) {
  // return the status code 400 bad request
      return res.status(400).json({
        success: false,
        error: "Search query missing."
      });
    }




    //  Limit range (Spotify's constraint: 0-50)
    // Parse limit to an integer
    const limitNum = parseInt(limit);
    // Check if limit is within the valid range, if not
    if (limitNum < 0 || limitNum > 50) {
      // return status 400 bad request
      return res.status(400).json({
        success: false,
        error: "Limit must be between 0 and 50"
      });
    }

    // Offset range (Spotify's constraint: 0-1000)
    // Parse offset to an integer
    const offsetNum = parseInt(offset);
    // Check if offset is within the valid range, if not
    if (offsetNum < 0 || offsetNum > 1000) {
      // return status 400 bad request
      return res.status(400).json({
        success: false,
        error: "Offset must be between 0 and 1000"
      });
    }

     // Combined limit + offset constraint (Spotify's rule)
    if (limitNum + offsetNum > 1000) {
      return res.status(400).json({
        success: false,
        error: "Limit + Offset cannot exceed 1000"
      });
    }



  // Spotify API Search Parameters
     const searchParams = {
      query,
      type,
      limit: limitNum,
      offset: offsetNum,
      include_external
    };

  // Call Spotify Search API
  const searchResult = await spotifySearch.searchItems(
    searchParams,
    req.user.accessToken
  );


  // Handle Spotify API response
  // Check if serach was Not successful
  if (!searchResult.success) {
    return res.status(400).json({
      success: false,
      error: searchResult.error
    });
  }

// Else search was successful and return search results
  return res.status(200).json({
    success: true,
    data: searchResult.data,
  });

  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while processing search request",
    });
  }
};




module.exports = searchController;