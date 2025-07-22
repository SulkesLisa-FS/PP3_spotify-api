// Import React 
import { Routes, Route } from "react-router-dom";


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
        {/* Search page as root/home dashboard - but requires login */}
        <Route path="/" element={<SearchPage />} />
        {/* Login page for authentication */}
        <Route path="/login" element={<LoginPage />} />
        {/* Contact Us page */}
        <Route path="/contactUs" element={<ContactUs />} />
     </Routes>
   </section>

    </div>
  );
}

export default UserRoutes;
