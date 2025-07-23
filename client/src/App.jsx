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
  // Variables
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();
   const toast = useToast();

  // Spotify OAuth redirect with spotifyId param
useEffect(() => {
  // Get the URL parameters
   const params = new URLSearchParams(location.search);
  // Extract the spotifyId parameter
  const spotifyId = params.get("spotifyId");
  // If spotifyId exists, set it in localStorage and update currentUser state
  // Redirect to home page
  if (spotifyId) {
    // Set the current user in AuthServices
    AuthServices.setCurrentUser(spotifyId);
    // Update the currentUser state
    setCurrentUser({ spotifyId });
    // Navigate to home page
    // Use replace to avoid adding to history stack
    navigate("/", { replace: true });
  }
}, [location, setCurrentUser, navigate]);



 // On mount, check for user in localStorage 
  useEffect(() => {
    // If currentUser is null, check localStorage for user data
    if (currentUser === null) {
      // Get user data from localStorage
      const user = AuthServices.getCurrentUser();
      // If user data exists, set it in state
      if (user) {
        setCurrentUser(user);
      } else {
        // If no user data, set currentUser to false
        setCurrentUser(false);
      }
    }
  }, [currentUser]);





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
    <Box
      as="div"
      bg="#EAE0D5"
      //minHeight="80vh"
      margin="0 auto"
      //pb="70px"
    >

      {/*  Header Component */}
        <Header
        currentUser={currentUser}
        isLoggingOut={isLoggingOut}
        onLogout={handleLogout}
      />
      {/* UserRoutes */}
      <UserRoutes
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      {/* Footer Component */}
      <Footer currentUser={currentUser} showToast={showUnauthorizedToast} />
    </Box>
  );
}

export default App;