// Import Components
import spotifyLogo from "../assets/Spotify_Full_Logo_RGB_Black.png";
// Import Libraries
import { Box, Flex, Text, Image, Link } from "@chakra-ui/react";

//Spotify Sign Up URL
const SPOTIFY_SIGNUP_URL = "https://www.spotify.com/signup";

function Header({ currentUser, isLoggingOut, onLogout }) {
  return (
    // Page Container
    <Box
      as="header"
      role="banner"
      aria-label="Page Header"
      borderBottom="8px solid #378d41a9"
      bg="#1ED760"
      color="#121212"
      p={4}
      mb={4}
      w="100%"
      position="relative"
    >
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
          as="h1"
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

        {/* Right Container - Current User Check For Sign Up or Logout */}
        <Box
          as="nav"
          aria-label="User account navigation"
          minW="100px"
          textAlign="right"
        >
          {/* If no user AND not logging out - Show Sign Up link */}
          {!currentUser && !isLoggingOut ? (
            <Link
              aria-label="Sign up for Spotify account"
              href={SPOTIFY_SIGNUP_URL}
              isExternal
              color="#121212"
              textDecoration="none"
              fontWeight="600"
              fontSize="2rem"
            >
              Sign Up
            </Link>
          ) : (
            // Else - show logout link
            // If the user clicks Logout, call the logout method
            <Link
              role="button"
              onClick={onLogout}
              color="#121212"
              textDecoration="none"
              fontWeight="600"
              fontSize="2rem"
              cursor="pointer"
            >
              {/* Check if user is LoggingOut */}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
