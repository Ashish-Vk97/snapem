// import React from 'react'

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Privacy = () => {
   const authContext =  useContext(AuthContext);
    
        if (!authContext) {
         throw new Error("AuthContext must be used within an AuthProvider");
       }
      
       const {  isAuthenticated  } = authContext;
  return (
    <section className="bg-white px-6 md:px-16 py-12 text-gray-800">
      <div className="max-w-4xl mx-auto">

        {/* Section Title */}
        <p className="text-sm text-purple-700 font-semibold mb-1">Privacy Policy</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Protecting Your Data Every Step of the Way
        </h2>

        {/* Intro Paragraph */}
        <p className="mb-6 text-sm md:text-base">
          At snap’em, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your
          information when you use our mobile application and website.
        </p>

        {/* Info We Collect */}
        <h3 className="font-semibold mb-2">Information We Collect</h3>
        <ul className="list-disc pl-5 text-sm mb-6 space-y-1">
          <li>Personal Information: Name, email address, contact number, and emergency contact details.</li>
          <li>Device Information: Device ID, Android version, IP address, and usage data.</li>
          <li>Location Data: Real-time location tracking when the SOS button is activated.</li>
          <li>Media Data: Audio/video recordings and periodic screenshots when safety features are triggered.</li>
          <li>Subscription Information: Plan type, transaction details, and expiration.</li>
        </ul>

        {/* How We Use Data */}
        <h3 className="font-semibold mb-2">How We Use Your Data</h3>
        <p className="text-sm mb-2">Your data is used strictly for the following purposes:</p>
        <ul className="list-disc pl-5 text-sm mb-6 space-y-1">
          <li>To provide emergency alert features (SOS, media capture, location sharing)</li>
          <li>To allow account access and secure login</li>
          <li>To store and manage your personal safety data</li>
          <li>To notify your selected emergency contacts</li>
          <li>To improve app performance and provide technical support</li>
        </ul>
        <p className="text-sm mb-6">
          We do not sell or share your data with third parties for advertising or marketing purposes.
        </p>

        {/* Data Storage */}
        <h3 className="font-semibold mb-2">Data Storage and Security</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>All user data is encrypted during transmission and storage</li>
          <li>Audio/video and screenshot data are stored securely on our server</li>
          <li>Regular security audits are conducted to ensure protection</li>
          <li>We implement strict access controls for both users and admins</li>
        </ul>
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

export default Privacy
