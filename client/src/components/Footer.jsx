// Import React
import { Link } from "react-router-dom";
// Import Components
import { Box, Flex, Text, Link as ChakraLink, VStack } from "@chakra-ui/react";


function Footer({ currentUser, showToast }) {

    // Handle Search Click
    // If user is not logged in, show unauthorized toast
    // Otherwise, allow navigation to Search page
  const handleSearchClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      showToast();
    }
  };

  return (
    <Box
      bg="#121212"
      color="#1ED760"
      py={3}
      px={4}
      w="100%"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={100}
      borderTop="1px solid #ccc"
      minHeight="64px"
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="1300px"
        mx="auto"
        position="relative"
        minHeight="40px"
      >
        {/* Left Container - Disclaimer */}
        <Box minW="220px">
          <Text fontSize=".7rem" >
             Not affiliated but powered by Spotify API.
          </Text>
        </Box>

        {/* Center Container - App Title */}
        <Text
          fontWeight="bold"
          fontSize="1.8rem"
          letterSpacing="wide"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          whiteSpace="nowrap"
          zIndex={1}
        >
          Tune Finder
        </Text>

        {/* Right Container - Nav Links */}
        <Box minW="110px" textAlign="right" mr={4}>
            
          <VStack align="flex-end" spacing={0}>
            {/* Login Page */}
            <ChakraLink as={Link} to="/login" fontWeight="600" textDecoration="none">
              Login
            </ChakraLink>
            {/* Search Page / Home */}
            <ChakraLink
              as={Link}
              to="/"
              fontWeight="600"
              textDecoration="none"
              onClick={handleSearchClick}
            >
              Search
            </ChakraLink>
            {/* Contact Us Page */}
            <ChakraLink as={Link} to="/contact" fontWeight="600" textDecoration="none">
              Contact Us
            </ChakraLink>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;
