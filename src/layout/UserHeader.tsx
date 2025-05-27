// import React from 'react'
import {  useContext } from "react";

import {  useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";


const UserHeader = () => {
  
   
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
            
            <div style={{backgroundColor:"#7E57C2"}} className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
              <div style={{fontWeight:"bold"}}> Snap'em </div>
              <ul className="flex space-x-4">
              <li className="hover:bg-purple-700 hover:rounded-lg p-2"><Link to={ !isAuthenticated? "/home":"/user-home"}> Home </Link></li>
              { !isAuthenticated ? (
                <>
                 <li className="hover:bg-purple-700 hover:rounded-lg p-2"> <Link to={"/signup"}> Register </Link></li>
                 <li className="hover:bg-purple-700 hover:rounded-lg p-2"> <Link to={"/signin"}> Login </Link></li>
                 </>
              ):(
                <>
                 <li className="hover:bg-purple-700 hover:rounded-lg p-2"><Link to={"/subscription"}> Subscription</Link></li>
                  <li className="hover:bg-purple-700 hover:rounded-lg p-2"><Link to={"/account"}> Account</Link></li>
                <li className=" p-2">
                <button onClick={handleLogout} className="bg-purple-500 text-white px-2 py-1.5 rounded hover:bg-purple-700">
                  Logout
                </button>
                </li>
                </>
              ) }
         
               
              {/* <li className="hover:bg-gray-700 hover:rounded-lg p-2"> <Link to={"/subscription"}> Settings </Link></li> */}
             
            </ul>
            </div>
        </div>
    
  )
}

export default UserHeader
