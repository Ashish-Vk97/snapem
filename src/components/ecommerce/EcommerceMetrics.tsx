import { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { hitGetUserMetrics } from "../../service/user.service";
import { useNavigate } from "react-router";

export default function EcommerceMetrics() {
  const navigate = useNavigate()

  interface UserMetrics {
    totalUsers: number;
    subscribedUsers: number;
  }

  const [UserMetricsData, setUserMetrics] = useState<UserMetrics>({
    totalUsers: 0,
    subscribedUsers: 0,
  });
  const [Loading,setLoading] = useState(false)

   const fetchUserMetrics = async () => {
      
       setLoading(true);
       try {
         const response = await hitGetUserMetrics();
         if (response.data.status) {
           console.log("users response data=====>", response);
   
        setUserMetrics((prev)=>(prev =response.data.data))
          
   
           setLoading(false);
         } else {
           navigate(`/notfound`); 
         }
       } catch (error) {
        console.error("Error user metrics:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        alert(response?.data?.message);
      } else {
        alert(response?.data?.data || "Unable to update profile!");
      }
       } finally {
         setLoading(false);
       }
     };

 useEffect(() => {
    fetchUserMetrics()
  
 },[]);

  if (Loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div onClick={()=>navigate("/users")} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Users
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {  UserMetricsData?.totalUsers}
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div onClick={()=>navigate("/users")} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Subscribers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {UserMetricsData?.subscribedUsers}
            </h4>
          </div>
{/* 
          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
