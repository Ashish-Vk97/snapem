// import React from 'react'

const Terms = () => {
  return (
    <section className="bg-white px-6 md:px-16 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <p className="text-sm text-purple-700 font-semibold mb-2">Privacy Policy</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Protecting Your Data Every Step of the Way
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-sm md:text-base mb-6">
          At snap’em, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your
          information when you use our mobile application and website.
        </p>

        {/* Info We Collect */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Information We Collect</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base mb-6 space-y-1">
          <li><strong>Personal Information:</strong> Name, email address, contact number, and emergency contact details.</li>
          <li><strong>Device Information:</strong> Device ID, Android version, IP address, and usage data.</li>
          <li><strong>Location Data:</strong> Real-time location tracking when the SOS button is activated.</li>
          <li><strong>Media Data:</strong> Audio/video recordings and periodic screenshots when safety features are triggered.</li>
          <li><strong>Subscription Information:</strong> Plan type, transaction details, and expiration.</li>
        </ul>

        {/* How We Use */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How We Use Your Data</h3>
        <p className="text-gray-700 text-sm md:text-base mb-2">Your data is used strictly for the following purposes:</p>
        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base mb-6 space-y-1">
          <li>To provide emergency alert features (SOS, media capture, location sharing)</li>
          <li>To allow account access and secure login</li>
          <li>To store and manage your personal safety data</li>
          <li>Not to impair your selected emergency contacts</li>
          <li>To improve app performance and provide technical support</li>
        </ul>
        <p className="text-gray-700 text-sm md:text-base mb-6">
          We do not sell or share your data with third parties for advertising or marketing purposes.
        </p>

        {/* Data Storage */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Storage and Security</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
          <li>All user data is encrypted during transmission and storage</li>
          <li>Audio/video and screenshot data are stored securely on our server</li>
          <li>Regular security audits are conducted to ensure protection</li>
          <li>We implement strict access controls for both users and admins</li>
        </ul>
      </div>

      {/* CTA Banner */}
      <div className="mt-12 bg-purple-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
        <h3 className="text-purple-900 font-semibold text-lg md:text-xl text-center md:text-left mb-4 md:mb-0">
          Join snap’em and Stay Secure
        </h3>
        <button className="bg-purple-800 hover:bg-purple-900 text-white text-xs px-4 py-2 rounded shadow-sm">
          Sign Up
        </button>
      </div>
    </section>
  )
}

export default Terms
