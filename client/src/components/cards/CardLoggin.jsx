// Import Libraries
import { Button, Text, VStack, Image } from "@chakra-ui/react";

// Import Components
import spotifyLogo from "../../assets/Spotify_Full_Logo_RGB_Green.png";
import { SPOTIFY_LOGIN_URL } from "../../services/auth.service";

const CardLoggin = () => {
  return (
    <VStack
      spacing={10}
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
        width="230px"
        display="block"
      />
      
      {/* CTA - H3 */}
      <Text
        color="#FFFFFF"
        fontSize="1.3rem"
        textAlign="center"
      >
        Please login to continue!
      </Text>

      {/* CTA - Login Button */}
      <Button
        as="a"
        href={SPOTIFY_LOGIN_URL}
        size="md"
        bg="#1DB954"
        color="#121212"
        borderRadius="50px"
        _hover={{ bg: "#1ed760" }}
        fontWeight="md"
        fontSize="2rem"
        width="70%"
        boxShadow="md"
      >
        Login
      </Button>
    </VStack>
  );
};

export default CardLoggin;