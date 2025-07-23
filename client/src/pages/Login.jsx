// Import React
import "../App.css";
import { useEffect } from "react";
// Import Libraries
import { Box, Text } from "@chakra-ui/react";
// Import Components
import CardLoggin from "../components/cards/CardLoggin.jsx";



// TODO:  Add Background Image backgroundVT1000

// Login Page
function Login() {


  
  return (
    <Box
      as="div"
      minHeight={"100vh"}
      width="95%"
      maxWidth="1300px"
      m="0 auto"
      textAlign="center"
      py={8}
    >
      {/* H1 Page Title */}
      <Text as="h2" color="#112236" fontWeight="600" fontSize="3rem" m="0 auto">
       Explore Your Music Here!
      </Text>

       {/* TODO:  P tag Application Info */}
       <Text as="p" color="#112236" fontWeight="300" fontSize="1.5rem" width="35rem" textAlign={"left"} m="0 auto" pl="15px">
       This secure portal allows authorized users to search atrist, albums, and songs by logging into their Spotify account. A spotify account is required.
      </Text>

      {/* Card Login Container */}
      <Box 
      display="flex"
      justifySelf="center"
      justifyContent="center"
       spacing={8}
        p={10}
        borderRadius="xl"
         boxShadow="5px 6px 5px #939493ff"
         minW="30rem"
        bg="#121212"
        maxW="400px"
        w="100%"
      >
        {/* Card Login */}
        <CardLoggin />
      </Box>

    </Box>
  );
}

export default Login;