

import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { fetchVideoListById } from '../../service/screenshotvideo.service';


const folderVideos =   {
  _id: "6838074d48013cdd36471725",
  user: "67f3c6cf0eea1a432ae5e1a1",
  date: "2025-05-29 12:36:29",
  videos: [
    {
      videoName: "controller.mp4",
      videoLink: "https://snapem.s3.us-east-1.amazonaws.com/videos/1748502349125_videos_snapem.mp4",
      mimetype: "video/mp4",
      size: 3404641,
      
    },
    {
      videoName: "Snap'em domain discussion _ Microsoft Teams 2025-04-16 10-38-11.mp4",
      videoLink: "https://snapem.s3.us-east-1.amazonaws.com/videos/1748502376701_videos_snapem.mp4",
      mimetype: "video/mp4",
      size: 2112905,
    
    }
  ],
  createdAt: "2025-05-29 12:36:29",
  updatedAt: "2025-05-29 12:36:29"
}
interface Folderlist {
 _id: string;
 s3key:string;
  videoName: string;
  videoLink: string;
  mimetype: string;
  size: number;
 
}
const formatFileSize = (bytes:number) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const UserVideosList = ({ isFromAdmin = true }) => {
    const [videos, setVideos] = useState<Folderlist[]>([]);
     const [Loading, setLoading] = useState(true);
   const { id } = useParams<{ id: string; }>();
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

 
   console.log(id, "id from params");
    
     const Navigate = useNavigate();

  const notify = (str: string) => toast(str);

   const toggleSelectVideo = (id) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const getVideoListById = async (id: string) => {

    try {
      setLoading(true);
      const response = await fetchVideoListById(id);
        if (response.data.status) {
          console.log("User details fetched:", response.data.data);
            setVideos(response.data?.data?.videos ?? []);
            setLoading(false);
        } else {
          console.error("Failed to fetch user screenshot :", response.data.message);
        }
      
    } catch (error) {
      console.error("Error fetching screenshot list details details:", error);
       const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

     
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
        setLoading(false);
      } else {
        notify(response?.data?.data || "Unable to fetch videos!");
        setLoading(false);
      }
    }
       
      
     
     };
 
     useEffect(() => {
       if (id) {
         getVideoListById(id);
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
        <h2 className="text-2xl font-semibold text-gray-800">Videos</h2>
        <button
          onClick={() => Navigate(-1)}
          className="bg-purple-400 hover:bg-purple-500 text-gray-800 text-sm px-4 py-2 rounded"
        >
          ← Back to Folders
        </button>
      </div>

      {/* Empty state */}
      {videos.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No videos available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white"
            >
              <video
                controls
                preload="none"
                className="w-full h-48 object-cover bg-black"
              >
                <source src={video.videoLink} type={video.mimetype} />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-800 truncate">{video.videoName}</p>
                <p className="text-xs text-gray-500 mt-1">{formatFileSize(video.size)}</p> 
                  {isFromAdmin && (
                <input
                  type="checkbox"
                  checked={selectedVideos.includes(video._id)}
                  onChange={() => toggleSelectVideo(video._id)}
                  className="absolute top-2 right-2 z-10 w-4 h-4 accent-purple-600"
                />
              )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserVideosList
