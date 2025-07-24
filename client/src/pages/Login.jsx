// Import React
import "../App.css";
// Import Libraries
import { Box, Text } from "@chakra-ui/react";
// Import Components
import CardLoggin from "../components/cards/CardLoggin.jsx";
import Background from "../assets/backgroundHZ800.png"



// TODO:  Add Background Image backgroundVT1000

// Login Page
function Login() {


  
  return (
    <Box
      as="div"
      minHeight={"95vh"}
      width="95%"
      maxWidth="1800px"
      m="0 auto"
      textAlign="center"
      //py={8}
      // Image Background Styling
      backgroundImage={`url(${Background})`}
      backgroundSize="70% auto"  
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      boxShadow="
      inset 150px 0 150px -50px rgba(0,0,0,0.8), 
      inset -250px 0 150px -50px rgba(0,0,0,0.8), 
      inset 0 -50px 80px -30px rgba(0,0,0,0.8)"
    >
      {/* H1 Page Title */}
      <Text as="h2" color="#ffffff" fontWeight="600" fontSize="3rem" m="0 auto">
       Explore Your Music Here!
      </Text>

       {/* TODO:  P tag Application Info */}
       <Text as="p" color="#ffffff" fontWeight="300" fontSize="1.5rem" width="35rem" textAlign={"left"} m="0 auto" p="3rem 0 5rem 1rem">
       This secure portal allows authorized users to search atrist, albums, and songs by logging into their Spotify account. A spotify account is required.
      </Text>

      {/* Card Login Container */}
      <Box 
      display="flex"
      justifySelf="center"
      justifyContent="center"
       spacing={5}
        p={10}
        borderRadius="xl"
         //boxShadow="2px 2px 10px #939493ff"
         minW="35rem"
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