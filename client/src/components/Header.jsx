// Import React 
import { Link as RouterLink } from "react-router-dom";
// Import Components 
import apiExports from "../API/index.js";
import spotifyLogo from "../assets/Spotify_Full_Logo_RGB_Black.png";
// Import Libraries
import { Box, Flex, Text, Image, Link } from "@chakra-ui/react";

//Variables for API methods and Spotify Sign Up URL
const { API, SPOTIFY_SIGNUP_URL } = apiExports;

function Header({ currentUser, onLogout }) {
  return (
    // Page Container
    <Box as="header"
      aria-label="Page Header"
      borderColor="gray.900"
      boxShadow="5px 6px 5px #99be9eff"bg="#1ED760" color="#121212" p={4} mb={4} 
      w="100%" position="relative">
      <Flex
        align="center"
        justify="space-between"
        maxW="1300px"
        mx="auto"
        position="relative"
        fontSize="2rem"
      >
        {/* Left Container - Spotify Logo */}
        <Box minW="180px">
          <Image
            src={spotifyLogo}
            alt="Spotify Logo"
            width="160px"
            display="block"
          />
        </Box>

        {/* Center Container - App Title */}
        <Text
          fontWeight="600"
          letterSpacing="wide"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          whiteSpace="nowrap"
        >
          Tune Finder
        </Text>

        {/* Right Container - Sign Up or Logout */}
        <Box minW="100px" textAlign="right">
            {/* If no user - the user is logged out - Show Sign Up link */}
          {!currentUser ? (
            <Link
              href={SPOTIFY_SIGNUP_URL}
              isExternal
              color="#121212"
              textDecoration="none"
              fontWeight="600"
              fontSize="1.5rem"
            >
              Sign Up
            </Link>
          ) : (
            // Else the use is logged in - Show Logout link
            // If the user clicks Logout, call the API logout method and direct to the login page
            <RouterLink 
              to="/login" 
              onClick={() => API.logout()}
            >
              <Text
                color="#121212"
                textDecoration="none"
                fontWeight="600"
                fontSize="1.5rem"
                cursor="pointer"
              >
                Logout
              </Text>
            </RouterLink>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
