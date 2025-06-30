import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserProfiles() {

  const authContext = useContext(AuthContext);

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
        title="Snap'em Profile Dashboard | Snap'em "
        description="This is snapem Profile  page for snap'em "
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard currentUser={currentUser} />
          <UserInfoCard isAdmin={true} currentUser={currentUser} />
          <UserAddressCard isAdmin={true} currentUser={currentUser} />
        </div>
      </div> 
    </>
  );
}
