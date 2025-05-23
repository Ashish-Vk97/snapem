import React from 'react'

const UserFooter = () => {
  return (
    <div className="text-center">
    <a href="#" style={{color:"#7E57C2"}} className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
        <img src="snap.png" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
        Snap'em    
    </a>
    <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
      © 2024-2025 Landwind™. All Rights Reserved. Built with <a href="https://flowbite.com" className="text-purple-600 hover:underline dark:text-purple-500">snapem</a> and 
      <a href="https://tailwindcss.com" className="text-purple-600 hover:underline dark:text-purple-500">Virtual Employee</a>.
    </span>
    </div>
  )
}

export default UserFooter
