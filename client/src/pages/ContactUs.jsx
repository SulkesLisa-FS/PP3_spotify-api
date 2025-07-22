import "../App.css";
import { Box, Text } from "@chakra-ui/react";

function ContactUs() {
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
      <Text as="h2" color="#112236" fontWeight="600" fontSize="3rem" mb={4}>
        Search Page
      </Text>
      
      <Text color="#666" fontSize="lg">
        Search to get started
      </Text>
    </Box>
  );
}

export default ContactUs;