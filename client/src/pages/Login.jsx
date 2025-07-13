import "../App.css";
import { Box, Text } from "@chakra-ui/react";

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
      <Text as="h2" color="#112236" fontWeight="600" fontSize="3rem" mb={4}>
       Login Page
      </Text>


     
    </Box>
  );
}

export default Login;