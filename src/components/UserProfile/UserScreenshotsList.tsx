import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router';
import { fetchScreenshotListById } from '../../service/screenshotvideo.service';
import { toast } from 'react-toastify';


const folderScreenshots =   {
  _id: "6837056bdf1d180137a62cf0",
  date: "2025-05-28 18:15:34",
  screenshots: [
    {
      imageName: "node.png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436331373_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
     
    },
    {
      imageName: "screenshotm.png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436333621_screenshot_snapem.png",
      mimetype: "image/png",
      size: 170021,
     
    },
    {
      imageName: "node.png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436334382_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
     
    },
    {
      imageName: "node.png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436429212_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
    
    },
    {
      imageName: "Screenshot (6).png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436431247_screenshot_snapem.png",
      mimetype: "image/png",
      size: 129058,
     
    },
    {
      imageName: "Screenshot (11).png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436431800_screenshot_snapem.png",
      mimetype: "image/png",
      size: 392555,
     
    },
    {
      imageName: "node.png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436779863_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
    
    },
    {
      imageName: "Screenshot (6).png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436782519_screenshot_snapem.png",
      mimetype: "image/png",
      size: 129058,
   
    },
    {
      imageName: "Screenshot (11).png",
      imageLink: "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436784038_screenshot_snapem.png",
      mimetype: "image/png",
      size: 392555,
    
    }
  ],
  createdAt: "2025-05-28 18:15:34",
  updatedAt: "2025-05-28 18:23:08"
};
interface Screenshot {
  imageName: string;
  imageLink: string;
  mimetype: string;
  size: number;
}

interface Folderlist {
 
  imageName: string;
  imageLink: string;
  mimetype: string;
  size: number;
 
}
const UserScreenshotsList = () => {

  const [Loading, setLoading] = useState(true);
   const { id } = useParams<{ id: string; }>();
   console.log(id, "id from params");
    const [screenshotList, setScreenshotList] = useState<Folderlist[]>( []);
     const Navigate = useNavigate();

  const notify = (str: string) => toast(str);

  const getScreenshotListById = async (id: string) => {

    try {
      setLoading(true);
      const response = await fetchScreenshotListById(id);
        if (response.data.status) {
          console.log("User details fetched:", response.data.data);
            setScreenshotList(response.data?.data?.screenshots ?? []);
            setLoading(false);
        } else {
          console.error("Failed to fetch user screenshot :", response.data.message);
        }
      
    } catch (error) {
      console.error("Error fetching screenshot list details details:", error);
       const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
        setLoading(false);
      } else {
        notify(response?.data?.data || "Unable to fetch screenshots!");
        setLoading(false);
      }
    }
       
      
     
     };
 
     useEffect(() => {
       if (id) {
         getScreenshotListById(id);
       }
     }, [id]);
  if (Loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
      <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Screenshots</h2>
        <button
          onClick={() => Navigate(-1)}
          className="bg-purple-400 hover:bg-purple-500 text-white-800 text-sm px-4 py-2 rounded"
        >
          ← Back to Folders
        </button>
      </div>

      {/* Empty state */}
      {screenshotList && screenshotList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {screenshotList.map((screenshot, index) => (
            <div 
              key={index}
              className="group relative rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={screenshot.imageLink}
                alt={screenshot.imageName || `Screenshot ${index + 1}`}
                loading="lazy"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 text-center truncate">
                {screenshot.imageName}
              </div>
            </div>
          ))}
        </div>
      ): (
        <div className="text-center text-gray-500 mt-20">No screenshots available.</div>
      ) }
    </div>
  );
}

export default UserScreenshotsList
