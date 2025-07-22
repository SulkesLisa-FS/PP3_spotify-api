import { useState } from "react";
import { Box } from "@chakra-ui/react";
import UserRoutes from "./routes/UserRoutes";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  // TODO: Check for user on mount 

  // TODO: Logout function

  return (
    <Box
      as="div"
      bg="#EAE0D5"
      minHeight="100vh"
      margin="0 auto"
    >

      {/* TODO:  Import Header Component */}

      {/* ROUTES */}
      <UserRoutes
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

         {/* TODO:  Import Footer Component */}
    </Box>
  );
}

export default App;