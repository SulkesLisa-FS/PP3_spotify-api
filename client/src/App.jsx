// Import React
import { useState } from "react";
import UserRoutes from "./routes/UserRoutes";

// Import Libraries
import { Box, useToast } from "@chakra-ui/react";

// Import App Components
import Header from "./components/Header";
import Footer from "./components/Footer";



function App() {
  // Variables
  const [currentUser, setCurrentUser] = useState(false);
  // Toast for Unauthorized Access
  const toast = useToast();
  // Logout function
   const handleLogout = () => setCurrentUser(false);


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
      minHeight="100vh"
      margin="0 auto"
      pb="70px"
    >

      {/*  Header Component */}
        <Header
        currentUser={currentUser}
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