import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import {
  fetchVideoListById,
  videoListDelete,
} from "../../service/screenshotvideo.service";

const folderVideos = {
  _id: "6838074d48013cdd36471725",
  user: "67f3c6cf0eea1a432ae5e1a1",
  date: "2025-05-29 12:36:29",
  videos: [
    {
      videoName: "controller.mp4",
      videoLink:
        "https://snapem.s3.us-east-1.amazonaws.com/videos/1748502349125_videos_snapem.mp4",
      mimetype: "video/mp4",
      size: 3404641,
    },
    {
      videoName:
        "Snap'em domain discussion _ Microsoft Teams 2025-04-16 10-38-11.mp4",
      videoLink:
        "https://snapem.s3.us-east-1.amazonaws.com/videos/1748502376701_videos_snapem.mp4",
      mimetype: "video/mp4",
      size: 2112905,
    },
  ],
  createdAt: "2025-05-29 12:36:29",
  updatedAt: "2025-05-29 12:36:29",
};
interface Folderlist {
  _id: string;
  s3key: string;
  videoName: string;
  videoLink: string;
  mimetype: string;
  size: number;
}
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const UserVideosList = () => {
  const [videos, setVideos] = useState<Folderlist[]>([]);
  const [Loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const isFromAdmin = searchParams.get("isFromAdmin") === "true";

  // const [selectAll, setSelectAll] = useState(false);

  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  console.log(id, "id from params");

  const Navigate = useNavigate();

  const notify = (str: string) => toast(str);

  const toggleSelectVideo = (id: string) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };
  const isAllSelected =
    videos.length > 0 && selectedVideos.length === videos.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videos.map((s) => s?._id));
    }
  };

  console.log(selectedVideos, "]]]");

  const getVideoListById = async (id: string ,page: number = 1,limit:number = 10) => {
    try {
      setLoading(true);
      const response = await fetchVideoListById(id,page,limit);
      if (response.data.status) {
        console.log("User details fetched:", response.data.data);
        setVideos(response.data?.data?.videos ?? []);
        setCurrentPage(response.data?.data?.currentPage);
        setTotalPages(response.data?.data?.totalPages);
        setLoading(false);
      } else {
        console.error(
          "Failed to fetch user screenshot :",
          response.data.message
        );
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
  const handleDelete = async () => {
    console.log("handle delete called");
    let body: {
      videoEntryId?: string;
      deleteAll?: boolean;
      videoIds?: string[];
    } = {};
    console.log("object");
    try {
      if (id && userId) {
        const isAllSelected =
          videos.length > 0 && selectedVideos.length === videos.length;

        body = {
          videoEntryId: id,
          ...(isAllSelected
            ? { deleteAll: true }
            : { videoIds: selectedVideos }),
        };

        console.log(body, "===>");
        setLoading(true);

        const { data } = await videoListDelete(body, userId);
        if (data?.status) {
          setLoading(false);
          getVideoListById(id);
          setSelectedVideos([]);
          notify(data?.message || "Videos deleted successfully!");
        }
      }
    } catch (error) {
      console.error("Error deleting screenshot folders:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
        setLoading(false);
      } else {
        notify(response?.data?.data || "Unable to delete video!");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getVideoListById(id,currentPage,limit);
    }
  }, [id,currentPage,limit]);
  if (Loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  console.log(isFromAdmin, "isFromAdmin");
  return (
    <div>
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Videos</h2>
        <button
          onClick={() => Navigate(-1)}
          className="bg-purple-900 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded"
        >
          ← Back to Folders
        </button>
      </div>
      {isFromAdmin && videos.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleSelectAll}
              className="accent-purple-600"
            />
            <span>Select All</span>
          </label>

          <button
            onClick={() => handleDelete()}
            disabled={selectedVideos.length === 0}
            // className={`px-4 py-2 rounded text-white text-sm ${
            //   selectedVideos.length > 0
            //     ? "bg-red-600 hover:bg-red-700"
            //     : "bg-purple-600 cursor-not-allowed"
            // }`}
            className={`bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm ${
              selectedVideos.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Empty state */}
      {videos.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No videos available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 bg-black"
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white truncate">
                      {video.videoName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(video.size)}
                    </p>
                  </div>
                  {isFromAdmin && (
                    <input
                      type="checkbox"
                      checked={selectedVideos.includes(video._id)}
                      onChange={() => toggleSelectVideo(video._id)}
                      className="w-4 h-4 accent-purple-600 ml-4"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
       {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded text-sm bg-white shadow disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded text-sm shadow ${
                currentPage === index + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 border rounded text-sm bg-white shadow disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      <div className="flex justify-end items-center space-x-2 mt-4">
  <label className="text-sm text-gray-600">Items per page:</label>
  <select
    value={limit}
    onChange={(e) => {
      setCurrentPage(1); // reset to first page on limit change
      setLimit(parseInt(e.target.value));
    }}
    className="border border-gray-300 rounded-md w-20 p-2 text-sm focus:ring-2 focus:ring-purple-500"
  >
    {[5, 10, 20, 50].map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>
    </div>
    
  );
};

export default UserVideosList;
