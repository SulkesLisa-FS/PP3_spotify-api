// Import React
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserRoutes from "./routes/UserRoutes";

// Import Libraries
import { Box, useToast } from "@chakra-ui/react";

// Import App Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthServices from "./services/auth.service";

function App() {
  // State Variables
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  // Spotify OAuth redirect with spotifyId param
  useEffect(() => {
    // Get the URL parameters
    const params = new URLSearchParams(location.search);
    // Extract both accessToken and spotifyId parameters
    const accessToken = params.get("accessToken");
    const spotifyId = params.get("spotifyId");
    // If both accessToken and spotifyId exist, set them in localStorage and update currentUser state
    // Redirect to home page
    if (accessToken && spotifyId) {
      // Set the current user in AuthServices with both parameters
      AuthServices.setCurrentUser(accessToken, spotifyId);
      // Update the currentUser state with both values
      setCurrentUser({ accessToken, spotifyId });
      // Navigate to home page
      // Use replace to avoid adding to history stack
      navigate("/", { replace: true });
    }
    // Run when location.search changes (OAuth redirect from Spotify)
    // This sets the user as logged in when returning from Spotify
  }, [location.search, navigate]);

  // On mount, check for user in local Storage
  useEffect(() => {
    // Get user data from local Storage (already validated by getCurrentUser)
    const user = AuthServices.getCurrentUser();
    // If user data exists, set it in state
    if (user) {
      setCurrentUser(user);
    } else {
      // If no user data, set currentUser to false
      setCurrentUser(false);
    }
    // Empty dependency array - only run once on mount
  }, []);

  // Logout function
  const handleLogout = async () => {
    // Set logging out state to prevent header from switching to signup
    setIsLoggingOut(true);
    // Call logout service to clear user session
    await AuthServices.logout(navigate);
    // Set currentUser state to false after logout
    setCurrentUser(false);
  };

  // Show Unauthorized Toast Function
  // Footer Search Link - User Alert - if User is Not Logged In
  const showUnauthorizedToast = () => {
    toast({
      title: "Unauthorized",
      description: "You must be logged in to access Search.",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box as="div" bg="black" minHeight="100vh" margin="0 auto">
      {/*  Header Component */}
      <Header
        currentUser={currentUser}
        isLoggingOut={isLoggingOut}
        onLogout={handleLogout}
      />
      {/* UserRoutes */}
      <UserRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {/* Footer Component */}
      <Footer currentUser={currentUser} showToast={showUnauthorizedToast} />
    </Box>
  );
}

export default App;
