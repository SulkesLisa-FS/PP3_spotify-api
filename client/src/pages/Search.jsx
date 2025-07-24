// Import React
import "../App.css";
import { useState, useEffect,  } from "react";

// Import Libaries
import { 
  Box, 
  Text,  
  Input, 
  InputGroup, 
  InputLeftElement, 
  InputRightElement } from "@chakra-ui/react";
import { FaSearch, FaTimes  } from "react-icons/fa";

// Import Components
import API from "../API/index"; 



// TODO:  Add Background Image backgroundVT1000
// TODO:  Add Variables currentUser, loading, error

// Notes: -  No Results until user searches. 
//        -  Change state from title and CTA to Results 
//           When user begins to type in the search bar





// Spotify Search Page _ After User Authentication

function Search() {

 const [query, setQuery] = useState("");
 const [results, setResults] = useState({ artists: [], albums: [], tracks: [] });

//Search Query useEffet
useEffect(() => {
  if (!query.trim()) {
    setResults({ artists: [], albums: [], tracks: [] });
    return;
  }

console.log("query changed:", query)

API.search({ q: query, type: "artist,album,track", limit: 10 })
.then((res) => {
  console.log("Search Results:", res.data)
  setResults(res.data);
})
.catch((error) => {
  console.log(error.message)
})

}, [query]);


// TODO:  Add API function

// TODO:  3 row grid layout

  return (
    <Box
      as="div"
      minHeight="100vh"
      width="95%"
      maxWidth="1300px"
      margin="0 auto"
      textAlign="center"
      py={8}
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
        onChange={e => {
              const q = e.target.value;
              setQuery(q);
              //console.log("query:", q);
          }}
        bg="white"
        borderRadius="full"
        pr="3rem"    
          
     />
     
     </InputGroup>






      
      <Text as="h2" color="#ffffff" fontWeight="600" fontSize="3rem" mb={4}>
        Search Page
      </Text>
        {/* TODO:  H1 Page Title */}

        {/* TODO:  H2 CTA */}
      <Text color="#ffffff" fontSize="lg">
        Search to get started
      </Text>



      {/* TODO:  Grid row 1. Title - Artist */}
      {/* TODO:  Grid row 1. Cards */}

      {/* TODO:  Grid row 2. Title - Albums */}
      {/* TODO:  Grid row 2. Cards */}

      {/* TODO:  Grid row 3. Title - Songs */}
      {/* TODO:  Grid row 3. Cards */}



{/* ARTIST */}



{/* ALBUMS */}




{/* TRACKS */}


    </Box>
  );
}

export default Search;