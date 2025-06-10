// import React from 'react'

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const About = () => {
    const authContext =  useContext(AuthContext);
    if (!authContext) {
     throw new Error("AuthContext must be used within an AuthProvider");
   }
  
   const {  isAuthenticated  } = authContext;
  return (
   <section className="bg-white px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-col items-start gap-12">
        {/* Left Text Content */}
        <div className="lg:w-2/2">
          <p className="text-sm text-purple-700 font-semibold mb-2">About Snap'em</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Stay Connected When It Matters Most
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Snap’em was built with one mission: to keep people safe, informed, and connected when it matters most.
            In today’s world, emergencies can happen anytime — and we believe everyone should have a simple,
            powerful tool in their pocket to call for help instantly.
            <br /><br />
            Our Android-based app combines real-time location tracking, emergency audio/video capture, and
            automated monitoring to give users peace of mind and faster response during crises. Whether you’re commuting,
            traveling, or caring for loved ones, Snap’em ensures your safety is always one tap away.
            <br /><br />
            We’re a passionate team of developers, designers, and safety advocates committed to using technology
            to protect lives. With secure data handling, smart alerts, and a user-friendly interface, Snap’em
            empowers people of all ages — from students to seniors — to stay safe and connected.
          </p>
        </div>

        {/* Right: Single Screenshot Image */}
        <div className="lg:w-2/2">
          <img
            src="/images/frame.png" // Replace with your actual image path
            alt="Snapem app preview"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* CTA Banner */}
    { !isAuthenticated && <div className="mt-12 bg-purple-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
        <h3 className="text-purple-900 font-semibold text-lg md:text-xl text-center md:text-left mb-4 md:mb-0">
          Join Snap’em and Stay Secure
        </h3>
        <button className="bg-purple-800 hover:bg-purple-900 text-white text-xs px-4 py-2 rounded shadow-sm">
          Sign Up
        </button>
      </div>}
    </section>
  )
}

export default About
