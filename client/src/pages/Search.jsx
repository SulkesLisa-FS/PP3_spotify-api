// Import React
import "../App.css";
import { useState, useEffect, useRef  } from "react";

// Import Libaries
import { 
  Box, 
  Text,  
  Flex,
  Input, 
  Spinner, 
  InputGroup, 
  IconButton,
  InputLeftElement, 
  InputRightElement } from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";

// Import Components
import API from "../API/index"; 
import ResultCard from "../components/cards/ResultCard";
import Background from "../assets/backgroundVT1500.png"


// Spotify Search Page _ After User Authentication
function Search() {

  // State Variables
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState({ artists: [], albums: [], tracks: [] });
  
  // Results Slider location Reference
  // set default values - starts at the beginning of the search results
  const tracksRef = useRef(null);
  const albumsRef = useRef(null);
  const artistsRef = useRef(null);
  
  const sliderRefs = [tracksRef, albumsRef, artistsRef];
  


//Search Query 
useEffect(() => {
  if (!query.trim()) {
    setResults({ artists: [], albums: [], tracks: [] });
    return;
  }
// Test Query
//console.log("query changed:", query)

// Set loading state and reset error to empty to avoid showing stale errors
  setLoading(true);
  setError("");


// Call the API search method with the current query
// Pass the query, type, and limit parameters
API.search({ q: query, type: "artist,album,track", limit: 10 })
// Handle the response 
  .then(({ data }) => {
    // Check data in the console
      console.log("Search results:", data);
      // Update results state with the new data
      setResults(data);
  })
  .catch(() => {
      setError("An unexpected error occurred. Please try again.");
  })
  .finally(() => {
    // Reset loading state
      setLoading(false);
  });
// Run when query changes
// This effect runs whenever the query state changes
}, [query]);

// Reset scroll positions when query changes
useEffect(() => {
  // For each slider reference, scroll to the start position
  // This ensures that when a new search is performed, the results start from the beginning
  sliderRefs.forEach((ref) => {
    if (ref.current) {
      // Scroll to the start position
      ref.current.scrollTo({ left: 0, behavior: "auto" });
    }
  });
  // Run when results change
}, [results]);  

  // Reusable slider styles
  const sliderStyles = {
    // Horizontal scrolling
    scrollSnapType: "x mandatory",
    "& > *": { scrollSnapAlign: "start" },
    // Hide scrollbar by default
    "&::-webkit-scrollbar": {
      height: "12px",
      display: "none"
    },
    // Show scrollbar on hover
    "&:hover::-webkit-scrollbar": {
      display: "block"
    },
    // Custom scrollbar background
    "&::-webkit-scrollbar-track": {
      bg: "rgba(255,255,255,0.1)",
      borderRadius: "6px"
    },
    // Custom scrollbar thumb background and hover effect
    "&::-webkit-scrollbar-thumb": {
      bg: "rgba(255,255,255,0.4)",
      borderRadius: "6px",
      _hover: {
        bg: "rgba(255,255,255,0.6)"
      }
    }
  };  

  return (
    <Box
      as="div"
      minHeight="100vh"
      width="95%"
      maxWidth="1300px"
      margin="0 auto"
      textAlign="center"
      py={8}
      // Image Background Styling
      backgroundImage={`url(${Background})`}
      backgroundSize="200% auto"  
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      boxShadow="
        inset 150px 0 150px -50px rgba(0,0,0,0.8), 
        inset -250px 0 150px -50px rgba(0,0,0,0.8), 
        inset 0 -50px 80px -30px rgba(0,0,0,0.8),
        inset 0 100px 580px -30px rgba(0,0,0,0.8)"
    >


    {/* Search Component */}
    <InputGroup maxW="600px" mx="auto" mb={8}> 
      {/* Left search icon */}
      <InputLeftElement pointerEvents="none">
        <FaSearch color="gray.400" />
      </InputLeftElement>
      
      {/* Search Input */}
      <Input
        placeholder="Search artist, albums, songs"
        value={query}
        onChange={e => setQuery(e.target.value)}
        bg="white"
        borderRadius="full"
        pr="3rem"    
     />

      {/* Clear Query - Right Side Icon */}
      {query && (
        <InputRightElement width="2.5rem">
          <IconButton
            aria-label="Clear search"
            icon={<FaTimes />}
            size="sm"
            variant="ghost"
            onClick={() => {
              setQuery("");
              setResults({ artists: [], albums: [], tracks: [] });
            }}
          />
        </InputRightElement>
      )}
     </InputGroup>



      {/* Display a spinner while loading a search query, and if no query is present, it renders the text instead." */}
     {loading && <Spinner size="xl" color="white" />}  
             {!query && !loading && (
       <>
       {/* H2 Page Title */}
         <Text as="h2" color="#ffffff" fontWeight="600" fontSize="3.6rem" mb={4}>
           No Results
         </Text>
         {/* CTA */}
         <Text color="#ffffff" fontSize="1.8rem" mb={4}>
           Search to get started
         </Text>
       </>
     )}



   



{/* ARTIST */}
  {results.artists.length > 0 && (
    <Box mt={8}>
      <Text fontSize="3rem" textAlign="left" mb={4} color="white">
        Artists
      </Text>
      <Flex
      // Reference to the artists slider
        ref={artistsRef}
        overflowX="auto"
        gap={6}
        px={2}
        // Reusable slider styles
        sx={sliderStyles}
      >
        {/* Artist Cards */}
        {/* Map over artists */}
        {results.artists.map((artist) => (
          // use artist.id as key for each card
          <Box key={artist.id} flexShrink={0} minW="200px" maxW="200px" color="#ffffff">
            {/* Show artist results: title, image and link */}
            <ResultCard
              title={artist.name}
              // no subtitle for artists
              subtitle={artist.type === "artist" ? null : artist.type}
              image={artist.image}
              url={artist.spotifyUrl}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )}


{/* ALBUMS */}
  {results.albums.length > 0 && (
    <Box mt={8}>
      <Text fontSize="3rem" textAlign="left" mb={4} color="white">
        Albums
      </Text>
      <Flex
        // Reference to the albums slider
        ref={albumsRef}
        overflowX="auto"
        gap={6}
        px={2}
        // Reusable slider styles
        sx={sliderStyles}
      >
        {/* Album Cards */}
        {/* Map over albums */}
        {results.albums.map((album) => (
          // use album.id as key for each card
          <Box key={album.id} flexShrink={0} minW="150px" maxW="150px" color="#ffffff">
            {/* Show album results: title, subtitle image and link */}
            <ResultCard
              title={album.name}
              subtitle={album.artist}
              image={album.image}
              url={album.spotifyUrl}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )}



{/* TRACKS */}

  {results.tracks.length > 0 && (
    <Box mt={8}>
      <Text fontSize="3rem" textAlign="left" mb={4} color="white">
        Songs
      </Text>
      <Flex
        // Reference to the tracks slider
        ref={tracksRef}
        overflowX="auto"
        gap={6}
        px={2}
        // Reusable slider styles
        sx={sliderStyles}
      >
        {/* Track Cards */}
        {/* Map over tracks */}
        {results.tracks.map((track) => (
          // use track.id as key for each card
          <Box key={track.id} flexShrink={0} minW="150px" maxW="150px" color="#ffffff">
            {/* Show track results: title, subtitle image and link */}
            <ResultCard
              title={track.name}
              subtitle={track.artist}
              image={track.image}
              url={track.spotifyUrl}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )}


















    </Box>
  );
}

export default Search;