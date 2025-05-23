
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
        {/* <div className="h-16 bg-white border-t border-gray-200">Footer</div> */}
    </div>
  )
}

export default UserAppLayout
 