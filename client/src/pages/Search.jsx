import "../App.css";
import { Box, Text } from "@chakra-ui/react";

// TODO:  Add Background Image backgroundVT1000
// TODO:  Add Variables currentUser, loading, error

// Notes: -  No Results until user searches. 
//        -  Change state from title and CTA to Results 
//           When user begins to type in the search bar

// Spotify Search Page _ After User Authentication
function Search() {


// TODO:  Hook useEffet

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
      {/* TODO:  Import Search Component */}
      
      <Text as="h2" color="#112236" fontWeight="600" fontSize="3rem" mb={4}>
        Search Page
      </Text>
        {/* TODO:  H1 Page Title */}

        {/* TODO:  H2 CTA */}
      <Text color="#666" fontSize="lg">
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