import "../App.css";
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

function LogIn() {

  return (
    <Box
      as="div"
      minHeight="100vh"
      width="95%"
      maxWidth="400px"
      margin="0 auto"
      textAlign="center"
      py={8}
    >
      <Text as="h2" color="#112236" fontWeight="600" fontSize="2rem" mb={4}>
        Log In 
      </Text>

     </Box>
  );
}

export default LogIn;
