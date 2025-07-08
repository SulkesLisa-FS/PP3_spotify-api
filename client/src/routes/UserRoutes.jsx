import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

// IMPORT PAGES
import HomePage from "../pages/Home";
import SearchPage from "../pages/Search";


function UserRoutes({ currentUser }) {

    return (
 <div>

  

     {/* Simple Navigation Header for Testing */}
     <Box bg="#112236" color="white" p={4} mb={4}>
       <Flex justify="space-between" align="center">
         <Text fontSize="lg" fontWeight="bold">Tune Finder</Text>
         <Flex gap={4}>
           <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>
             Search
           </Link>
           <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>
             Login
           </Link>
         </Flex>
       </Flex>
     </Box>

     {/* User Status - for testing */}
     <div>
      {currentUser 
        ? <h2>User Logged In</h2>
        : <h2>User Logged Out</h2>
      }
    </div>
   
   <section>
     <Routes>
       {/* Search page as main landing */}
       <Route path="/" element={<SearchPage />} />
       {/* Login page */}
       <Route path="/login" element={<HomePage />} />
       {/* Spotify OAuth callback route - will add when ready */}
       {/* <Route path="/auth/callback" element={<CallbackPage />} /> */}
     </Routes>
   </section>






    </div>
  );
}

export default UserRoutes;
