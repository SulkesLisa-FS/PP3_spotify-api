// Import React
import { Link } from "react-router-dom";
// Import Components
import { Box, Flex, Text, Link as ChakraLink, VStack } from "@chakra-ui/react";

function Footer({ currentUser, showToast }) {
  // Handle Search by current User
  // If user is not logged in, show unauthorized toast
  // Otherwise, allow navigation to Search page
  const handleSearchClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      showToast();
    }
  };

  return (
    <Box bg="#121212" color="#1ED760" py={3} px={4} w="100%">
      <Flex
        align="center"
        justify="space-between"
        maxW="1300px"
        mx="auto"
        position="relative"
        minHeight="40px"
      >
        {/* Left Container - Disclaimer */}
        <Box minW="220px" ml="1rem">
          <Text fontSize=".9rem" letterSpacing="1.8px">
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
        <Box
          as="nav"
          aria-label="Footer Navigation"
          minW="110px"
          textAlign="left"
          mr={10}
        >
          <VStack align="flex-start" spacing={0}>
            {/* Login Page */}
            <ChakraLink
              as={Link}
              aria-label="Login"
              to="/login"
              fontWeight="500"
              textDecoration="none"
            >
              Login
            </ChakraLink>

            {/* Search Page / Home */}
            <ChakraLink
              as={Link}
              aria-label="Search"
              to="/"
              fontWeight="500"
              textDecoration="none"
              onClick={handleSearchClick}
            >
              Search
            </ChakraLink>

            {/* Contact Us  */}
            <ChakraLink
              as={Link}
              aria-label="Contact Us"
              to="/contact"
              fontWeight="500"
              textDecoration="none"
            >
              Contact Us
            </ChakraLink>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;
