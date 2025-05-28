import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from 'react-router-dom';

export default function UserViewEdit() {

  const authContext = useContext(AuthContext);
  const { id, mode } = useParams<{ id: string; mode: string }>();

    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }

    const {  currentUser  } = authContext

    console.log(currentUser,"=====>currentuser")
   

// const [userInfo, setUserInfo] = useState(null)
// { currentUser }: { currentUser: CurrentUser }

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="View-User" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          View-User
        </h3> */}
        <div className="space-y-6">
          <UserMetaCard currentUser={currentUser} />
          <UserInfoCard currentUser={currentUser} mode={mode} />
          <UserAddressCard currentUser={currentUser} mode={mode} />
        </div>
      </div>
    </>
  );
}
