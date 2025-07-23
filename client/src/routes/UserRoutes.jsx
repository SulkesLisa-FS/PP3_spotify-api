// Import React 
import { Routes, Route, Navigate } from "react-router-dom";


// IMPORT PAGES
import LoginPage from "../pages/Login";
import SearchPage from "../pages/Search";
import ContactUs from "../pages/ContactUs";


function UserRoutes({ currentUser }) {

    return (
 <div>

     {/* User Status - for testing */}
     {/* Checks if user is logged In or Out */}
    <div>
      {currentUser 
        ? <h2>User Logged In</h2>
        : <h2>User Logged Out</h2>
      }
    </div>
   
   <section>
     <Routes>
     {/* Conditional root route - Search if logged in, redirect to login if not */}
       <Route 
         path="/" 
         element={currentUser ? <SearchPage /> : <Navigate to="/login" replace />} 
       />
       {/* Login page - always accessible */}
       <Route path="/login" element={<LoginPage />} />
       {/* Contact page - always accessible */}
       <Route path="/contact" element={<ContactUs />} />
     
     </Routes>
   </section>

    </div>
  );
}

export default UserRoutes;
