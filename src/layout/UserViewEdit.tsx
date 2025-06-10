import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from 'react-router';
import UserSubscription from "../components/UserProfile/UserSubscription";
import { fetchUserDetailsById } from "../service/user.service";
import UserScreenshotsView from "../components/UserProfile/UserScreenshotsView";

export default function UserViewEdit() {

  const authContext = useContext(AuthContext);
  const { id, mode } = useParams<{ id: string; mode: string }>();
  interface User {
     name: string;
  email: string;
  _id: string;
  role: string;
  phone?: string;
  address?: {
    country?: string;
    city?: string;
    pincode?: string;
    state?: string;
  };
    subscription?: any;
    // Add other user properties as needed
  }

  const [selectedUser, setSelectedUser] = useState([]);

    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }

    const {  currentUser  } = authContext;

    const getUserById = async (id: string) => {
      const response = await fetchUserDetailsById(id);
      setSelectedUser(response?.data?.data);
      console.log("Selected User:", response.data.data);
      console.log("User details fetched yes:", response);
      return response;
    };

    useEffect(() => {
      if (id) {
        getUserById(id);
      }
    }, [id]);


  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle={`User ${mode}`} />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          View-User
        </h3> */}
        <div className="space-y-6">
          <UserMetaCard currentUser={selectedUser} />
          <UserInfoCard currentUser={selectedUser} getUserById={getUserById} mode={mode} />
          <UserAddressCard currentUser={selectedUser} getUserById={getUserById} mode={mode} />
          <UserSubscription selectedUser={selectedUser} getUserById={getUserById} mode={mode} />
          < UserScreenshotsView userId ={id} />
        </div>
      </div>
    </>
  );
}
