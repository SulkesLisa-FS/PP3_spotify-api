import "../App.css";
import { Box, Text } from "@chakra-ui/react";


// TODO:  Add Background Image backgroundVT1000
// TODO:  Add Variable currentUser
// TODO:  Add submit handler - Direct to Spotify OAuth login

// Login Page
function Login() {
  
  return (
    <Box
      as="div"
      minHeight={"100vh"}
      width="95%"
      maxWidth="1300px"
      margin="0 auto"
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

        {/* TODO:  Login Container */}

        {/* TODO:  Container - Spotify Logo */}

        {/* TODO:  Container - h2 Instructions */}

        {/* TODO:  Container - CTA Login Button */}


     
    </Box>
  );
}

export default Login;