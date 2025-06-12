import { Link, Outlet } from "react-router";
import UserHeader from "./UserHeader";
import { FaHeart } from "react-icons/fa";
import UserFooter from "./UserFooter";

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
      <div className="flex-1 overflow-y-auto  bg-white p-4">
        <Outlet />
      </div>

      {/* .....footer..... */}
     
      <UserFooter />
      {/* <div className="bg-gray-50 border-t border-gray-200 text-center py-4 px-4">
        
        <p className="text-sm text-gray-500">
          © 2024–2025 All Rights Reserved. Built with{" "}
          <a
            href="https://snapem.com"
            className="text-purple-600 hover:underline"
          >
            snapem
          </a>
          <a href="https://virtualemployee.com" className="text-purple-600 hover:underline">Virtual Employee</a>.
        </p>
      </div> */}

      {/* <div className="h-16 bg-white border-t border-gray-200">Footer</div> */}
    </div>
  );
};

export default UserAppLayout;
