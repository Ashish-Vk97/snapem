// import React from 'react'
import { useState, useContext  } from "react";

import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";


const UserHeader = () => {
   const location = useLocation();
  const currentPath = location.pathname;
  
    const linkClass = (path:string) =>
    `p-2 font-medium ${
      currentPath === path
        ? "text-purple-700 font-semibold"
        : "text-black hover:text-purple-700"
    }`;
  const [showMenu, setShowMenu] = useState(false);

  const authContext =  useContext(AuthContext);
  if (!authContext) {
   throw new Error("AuthContext must be used within an AuthProvider");
 }

 const { setIsAuthenticated, isAuthenticated, setCurrentUser  } = authContext;

 const navigate =useNavigate();


  const handleLogout = () => {
    window.localStorage.removeItem("AUTH_TOKEN");
    window.localStorage.removeItem("USER");
   
    setIsAuthenticated(false);
      setCurrentUser({
              name: "",
              email: "",
              _id: "",
              role: "",
              isFreeAccess: false,
               isSubscribed: false,
               stripeCustomerId: "",
              subscription: {
                id: "",
                status: "",
                start_date: "",
                plan: {
                  id: "",
                  currency: "",
                  interval: "",
                  interval_count: "",
                  amount: "",
                },
              },
            });
    navigate(`/signin`, { replace: true });
};
  return (
    
        <div className="sticky top-0 z-50 bg-transparent text-white">
            {/* <div style={{color:"#7E57C2"}}  className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <div >Snap'em</div>
            <div>Menu</div>
            </div> */}
            
            <div style={{ backgroundColor: "white", border: "1px solid #E5E5E5" }} className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <img src="images/snapemlogo.png" onClick={()=>navigate("/home")} style={{ borderRadius: "10%" }} alt="menu-2" width="100" height="100" />
              {/* Hamburger Icon */}
              <button
                className="md:hidden flex items-center px-3 py-2 border rounded text-black border-gray-400"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label="Toggle navigation"
              >
                <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
              {/* Nav List */}
              <ul
                className={`
                  ${showMenu ? "block" : "hidden"}
                  absolute top-16 left-0 w-full bg-white border-t border-gray-200 md:static md:flex md:space-x-4 md:w-auto md:bg-transparent md:border-0
                `}
                style={{ zIndex: 100 }}
              >
                <li className="text-black font-medium hover:text-purple-700 p-2">
                  <Link to={!isAuthenticated ? "/home" : "/user-home"}> Home </Link>
                </li>
                {!isAuthenticated ? (
                  <>
                    <li 
                    // className="text-black font-medium hover:text-purple-700 p-2"
                    className={linkClass("/signup")}
                    >
                      <Link to={"/signup"}> Register </Link>
                    </li>
                    <li 
                    // className="text-black font-medium hover:text-purple-700  p-2"
                    // className={linkClass(!isAuthenticated ? "/home" : "/user-home")
                       className={linkClass("/signin")}
                    
                    >
                      <Link to={"/signin"}> Login </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li 
                    // className="text-black font-medium hover:text-purple-700  p-2"
                     className={linkClass("/subscription")}>
                      <Link to={"/subscription"}> Subscription</Link>
                    </li>
                    <li
                    //  className="text-black font-medium hover:text-purple-700  p-2"
                     className={linkClass("/account")}
                     >
                      <Link to={"/account"}> Account</Link>
                    </li>
                    <li className="p-1">
                      <button onClick={handleLogout} className="bg-purple-700 text-white px-2 py-1.5 rounded-lg hover:bg-purple-800">
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
        </div>
    
  )
}

export default UserHeader
