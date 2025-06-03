import {useState} from 'react'
import { FaFolder } from 'react-icons/fa';
import classNames from 'classnames';
// import UserScreenshotsList from './UserScreenshotsFolders';
import UserVideosFolders from './UserVideosFolders';
import UserScreenshotsFolders from './UserScreenshotsFolders';
import UserVideosList from './UserVideosList';
import UserScreenshotsList from './UserScreenshotsList';

const dates = [
  '2025-05-01',
  '2025-05-10',
  '2025-05-15',
  '2025-05-20'
];

const formatDate = (dateString:string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

type TabButtonProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

const TabButton = ({ children, isActive, onClick }: TabButtonProps) => (
  <button
    className={classNames(
      'py-2 px-4 -mb-px font-medium border-b-2 transition duration-200',
      {
        'border-blue-600 text-blue-600': isActive,
        'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-400': !isActive,
      }
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
const UserScreenshotsView = () => {
      const [activeTab, setActiveTab] = useState('image');
  return (
    <> 
    
    <div className="p-6 bg-gray-50 min-h-screen">
         <div className="flex border-b border-gray-300 mb-6">
        <TabButton isActive={activeTab === 'image'} onClick={() => setActiveTab('image')}>
          📷 screenshots
        </TabButton>
        <TabButton isActive={activeTab === 'video'} onClick={() => setActiveTab('video')}>
          🎥 Videos
        </TabButton>
      </div>
       <div key={activeTab} className="transition-all duration-500 ease-in-out animate-fadeInSlideUp">
        {activeTab === 'image' && <UserScreenshotsFolders  />}
         {activeTab === 'video' && <UserVideosFolders  />}
          {/* {activeTab === 'video' && <UserVideosList  />} */}
         
         </div>
        {/* {activeTab === 'video' && <FolderList title="Video Folders" dates={dates} />}  */}
      {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">Date Folders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dates.map((date, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-300 cursor-pointer p-4 flex items-center space-x-4 hover:bg-blue-50"
          >
            <div className="bg-yellow-400 text-white p-3 rounded-md group-hover:bg-yellow-500 transition">
              <FaFolder size={24} />
            </div>
            <div>
              <p className="text-gray-800 font-medium">{formatDate(date)}</p>
              <p className="text-gray-500 text-sm">Folder {index + 1}</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
    </>
  )
}

export default UserScreenshotsView
