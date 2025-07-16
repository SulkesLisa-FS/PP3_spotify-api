const searchController = async (req, res) => {
  try {
    // Extracting Query Parameters
    const {
      // Search Query
      q: query,
      // market for country code
      market,
      // Type of items to search for
      type = "artist, album, track",
      // Limit of results (0-10)
      limit = 10,
      // Offset for pagination
      offset = 0,
      // Include external - redirects to external URLs such as Spotify's web player
      include_external,
    } = req.query;


// API Call and response


// Validate conditional

// Query Parameter


//  limit 


//  offset


//  User



// Search Parameters





  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while processing search request",
    });
  }
};


module.exports = searchController;