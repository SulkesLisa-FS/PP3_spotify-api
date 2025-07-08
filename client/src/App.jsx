import { useState } from "react";
import { Box } from "@chakra-ui/react";
import UserRoutes from "./routes/UserRoutes";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <Box
      as="div"
      bg="#EAE0D5"
      minHeight="100vh"
      margin="0 auto"
    >
      <UserRoutes
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </Box>
  );
}

export default App;