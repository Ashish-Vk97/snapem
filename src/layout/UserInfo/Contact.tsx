// import React from 'react'
import { useContext } from 'react';
import { FiMail } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

const Contact = () => {
   const authContext =  useContext(AuthContext);
  
      if (!authContext) {
       throw new Error("AuthContext must be used within an AuthProvider");
     }
    
     const {  isAuthenticated  } = authContext;
  return (
    
     <section className="bg-white px-6 md:px-16 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <p className="text-sm text-purple-700 font-semibold mb-2">Contact Us</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          We’re here to help — anytime
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-sm md:text-base mb-6">
          Have a question, need support, or want to share feedback? Our team is ready to assist you with anything related to 
          snap’em — your safety is our priority.
        </p>

        {/* Email Contact */}
        <div className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-800">
          <span className="font-semibold">Get in Touch</span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-purple-800 text-sm">
          <FiMail className="text-purple-700" size={16} />
          <span>support@snapem.com</span>
        </div>
      </div>

      {/* CTA Banner */}
    { !isAuthenticated && <div className="mt-12 bg-purple-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
        <h3 className="text-purple-900 font-semibold text-lg md:text-xl text-center md:text-left mb-4 md:mb-0">
          Join snap’em and Stay Secure
        </h3>
        <button className="bg-purple-800 hover:bg-purple-900 text-white text-xs px-4 py-2 rounded shadow-sm">
          Sign Up
        </button>
      </div> }
    </section>
  )
}

export default Contact
