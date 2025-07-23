// Import Libraries
import { Button, Text, VStack, Image } from "@chakra-ui/react";

// Import Components
import spotifyLogo from "../../assets/Spotify_Full_Logo_RGB_Green.png";
import { SPOTIFY_LOGIN_URL } from "../../services/auth.service";

const CardLoggin = () => {
  return (
    <VStack
      spacing={8}
      p={10}
      borderRadius="xl"
      boxShadow="lg"
      bg="#121212"
      maxW="400px"
      w="100%"
    >
      <Image
        src={spotifyLogo}
        alt="Spotify Logo"
        width="160px"
        display="block"
      />
      
      {/* CTA - H3 */}
      <Text
        color="#FFFFFF"
        fontSize="md"
        textAlign="center"
      >
        Please login to continue!
      </Text>

      {/* CTA - Login Button */}
      <Button
        as="a"
        href={SPOTIFY_LOGIN_URL}
        size="lg"
        bg="#1DB954"
        color="#121212"
        _hover={{ bg: "#1ed760" }}
        fontWeight="bold"
        fontSize="lg"
        width="100%"
        boxShadow="md"
      >
        Login
      </Button>
    </VStack>
  );
};

export default CardLoggin;