import { useState } from "react";
import classNames from "classnames";
// import UserScreenshotsList from './UserScreenshotsFolders';
import UserVideosFolders from "./UserVideosFolders";
import UserScreenshotsFolders from "./UserScreenshotsFolders";
import UserSnapshotsFolders from "./UserSnapshotsFolders";

type TabButtonProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

const TabButton = ({ children, isActive, onClick }: TabButtonProps) => (
  <button
    className={classNames(
      "py-2 px-4 -mb-px font-medium border-b-2 transition duration-200",
      {
        "border-purple-600 text-purple-600": isActive,
        "border-transparent text-gray-600 hover:text-purple-600 hover:border-purple-400":
          !isActive,
      }
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
const UserScreenshotsView = ({
  userId,
  isFromAdmin = false,
}: {
  userId?: string;
  isFromAdmin?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState("image");
  console.log("userId===>", userId, "isFromAdmin view ui===>", isFromAdmin);
  return (
    <>
      <div className='p-6 bg-gray-50 min-h-screen'>
        <div className='flex border-b border-gray-300 mb-6'>
          <TabButton
            isActive={activeTab === "image"}
            onClick={() => setActiveTab("image")}
          >
            📷 Screenshots
          </TabButton>
          <TabButton
            isActive={activeTab === "video"}
            onClick={() => setActiveTab("video")}
          >
            🎥 Videos
          </TabButton>
          <TabButton
            isActive={activeTab === "snap"}
            onClick={() => setActiveTab("snap")}
          >
            📷 Snapshots
          </TabButton>
        </div>
        <div
          key={activeTab}
          className='transition-all duration-500 ease-in-out animate-fadeInSlideUp'
        >
          {activeTab === "image" && (
            <UserScreenshotsFolders
              userId={userId ?? ""}
              isFromAdmin={isFromAdmin}
            />
          )}
          {activeTab === "video" && (
            <UserVideosFolders userId={userId} isFromAdmin={isFromAdmin} />
          )}
          {activeTab === "snap" && (
            <UserSnapshotsFolders
              userId={userId ?? ""}
              isFromAdmin={isFromAdmin}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserScreenshotsView;
