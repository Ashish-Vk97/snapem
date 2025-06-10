import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router'

const UserFooter = () => {
  return (
       <footer className="flex flex-col md:flex-row items-center justify-between px-6 py-6 w-full text-sm bg-gray-100 text-gray-700">
               
                <div className="flex flex-col items-start">
                  <h1 className="text-xl font-bold">
                    snap<span className="text-purple-700">’em</span>
                  </h1>
                  <p className="flex items-center text-xs mt-1">
                    built with <FaHeart className="text-red-500 mx-1" size={10} /> by
                    Snap'em
                  </p>
                </div>
        
               
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                  <Link to="/contact" className="hover:underline">
                    Contact
                  </Link>
                  <Link to="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </div>
              </footer>
  )
}

export default UserFooter
