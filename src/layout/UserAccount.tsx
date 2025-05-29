import  { useContext, useState } from 'react'
import UserInfoCard from '../components/UserProfile/UserInfoCard'
import UserAddressCard from '../components/UserProfile/UserAddressCard'
import { AuthContext } from '../context/AuthContext';
import UserSubscription from '../components/UserProfile/UserSubscription';

const UserAccount = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const {  currentUser  } = authContext

  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <UserInfoCard isUserAccount={true} currentUser={currentUser} />
            <UserAddressCard currentUser={currentUser} />
          </div>
        );
      case "app":
        return <p>app download Tab</p>;
      case "subscription":
        return <UserSubscription />;
      case "emergency":
        return <p>emergency Tab</p>;
      case "media":
        return <p>Screenshot Tab</p>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="mb-5 flex flex-wrap gap-4 border-b pb-3 text-sm font-medium text-gray-600 dark:text-white/70">
        <button
          className={`${activeTab === "profile" ? "text-purple-600 border-b-2 border-purple-600" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`${activeTab === "app" ? "text-purple-600 border-b-2 border-purple-600" : ""}`}
          onClick={() => setActiveTab("app")}
        >
          App Download
        </button>
        <button
          className={`${activeTab === "subscription" ? "text-purple-600 border-b-2 border-purple-600" : ""}`}
          onClick={() => setActiveTab("subscription")}
        >
          Subscription
        </button>
        <button
          className={`${activeTab === "emergency" ? "text-purple-600 border-b-2 border-purple-600" : ""}`}
          onClick={() => setActiveTab("emergency")}
        >
          Emergency Contact
        </button>
        <button
          className={`${activeTab === "media" ? "text-purple-600 border-b-2 border-purple-600" : ""}`}
          onClick={() => setActiveTab("media")}
        >
          Screenshot & Video
        </button>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default UserAccount
