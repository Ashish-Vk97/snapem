import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router'

const UserFooter = () => {
  return (
       <footer className="flex flex-col md:flex-row items-center justify-between px-6 py-2 w-full text-sm bg-gray-100 text-gray-700">
               
                <div className="flex flex-col items-start">
                  <h1 className="text-xl font-bold">
                    {/* snap<span className="text-purple-700">’em</span> */}
                     <img src="images/snapemlogo.png" style={{ borderRadius: "10%" }} alt="menu-2" width="70" height="70" />
                  </h1>
                  <p className="flex items-center text-xs mt-1">
                    built with <FaHeart className="text-red-500 mx-1" size={10} /> by
                   snap'em
                  </p>
                </div>
        
               
                <div className="flex space-x-6 mt-4 md:mt-0">
                  {[
                  { to: "/about", label: "About Us" },
                  { to: "/contact", label: "Contact" },
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms of Service" },
                  ].map(({ to, label }) => {
                  const [active, setActive] = React.useState(false);
                  return (
                    <Link
                    key={to}
                    to={to}
                    className={`hover:underline ${active ? "text-purple-700 font-semibold" : ""}`}
                    onClick={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    >
                    {label}
                    </Link>
                  );
                  })}
                </div>
              </footer>
  )
}

export default UserFooter
