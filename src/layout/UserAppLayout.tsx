
import { Outlet } from "react-router";
import UserHeader from './UserHeader'


//   <div
//         className={`flex-1 transition-all duration-300 ease-in-out ${
//           isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
//         } ${isMobileOpen ? "ml-0" : ""}`}
//       >
//         <AppHeader />
//         <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
//           <Outlet /> 
//         </div>
//       </div>

const UserAppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
        
        <UserHeader />
        <div className="flex-1 overflow-y-auto  bg-gray-200 p-4">
        <Outlet />
        </div>

        {/* .....footer..... */}
        <div className="bg-gray-50 border-t border-gray-200 text-center py-4 px-4">
      {/* Logo + Title */}
      <div className="flex justify-center items-center mb-2 space-x-2">
        <img
          src="images/snapem_logo.png" // Replace with your actual logo path
          alt="Snap'em Logo"
          className="h-10"
        />
      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-500">
        © 2024–2025  All Rights Reserved. Built with{' '}
        <a href="https://snapem.com" className="text-purple-600 hover:underline">snapem</a> 
        {/* <a href="https://virtualemployee.com" className="text-purple-600 hover:underline">Virtual Employee</a>. */}
      </p>
    </div>
        {/* <div className="h-16 bg-white border-t border-gray-200">Footer</div> */}
    </div>
  )
}

export default UserAppLayout
 