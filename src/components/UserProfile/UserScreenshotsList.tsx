import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  fetchScreenshotListById,
  screenshotListDelete,
} from "../../service/screenshotvideo.service";
import { toast } from "react-toastify";

const folderScreenshots = {
  _id: "6837056bdf1d180137a62cf0",
  date: "2025-05-28 18:15:34",
  screenshots: [
    {
      imageName: "node.png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436331373_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
    },
    {
      imageName: "screenshotm.png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436333621_screenshot_snapem.png",
      mimetype: "image/png",
      size: 170021,
    },
    {
      imageName: "node.png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436334382_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
    },
    {
      imageName: "node.png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436429212_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
    },
    {
      imageName: "Screenshot (6).png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436431247_screenshot_snapem.png",
      mimetype: "image/png",
      size: 129058,
    },
    {
      imageName: "Screenshot (11).png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436431800_screenshot_snapem.png",
      mimetype: "image/png",
      size: 392555,
    },
    {
      imageName: "node.png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436779863_screenshot_snapem.png",
      mimetype: "image/png",
      size: 146770,
    },
    {
      imageName: "Screenshot (6).png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436782519_screenshot_snapem.png",
      mimetype: "image/png",
      size: 129058,
    },
    {
      imageName: "Screenshot (11).png",
      imageLink:
        "https://snapem.s3.us-east-1.amazonaws.com/screenshots/1748436784038_screenshot_snapem.png",
      mimetype: "image/png",
      size: 392555,
    },
  ],
  createdAt: "2025-05-28 18:15:34",
  updatedAt: "2025-05-28 18:23:08",
};
interface Screenshot {
  imageName: string;
  imageLink: string;
  mimetype: string;
  size: number;
}

interface Folderlist {
  _id: string;
  s3key: string;
  imageName: string;
  imageLink: string;
  mimetype: string;
  size: number;
}
const UserScreenshotsList = () => {
  const [Loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const isFromAdmin = searchParams.get("isFromAdmin") === "true";
  console.log(isFromAdmin, "isFromAdmin");
  console.log(userId, "id from params");
  const [screenshotList, setScreenshotList] = useState<Folderlist[]>([]);
  const Navigate = useNavigate();

  const [selectedScreenshots, setSelectedScreenshots] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const toggleSelect = (id: string) => {
    setSelectedScreenshots((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    screenshotList.length > 0 &&
    selectedScreenshots.length === screenshotList.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedScreenshots([]);
    } else {
      setSelectedScreenshots(screenshotList.map((s) => s?._id));
    }
  };

  const notify = (str: string) => toast(str);

  const getScreenshotListById = async (
    id: string,
    page: number = 1,
    limit: number = 10
  ) => {
    try {
      setLoading(true);
      const response = await fetchScreenshotListById(id, page, limit);
      if (response.data.status) {
        setScreenshotList(response.data?.data?.screenshots ?? []);
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
      getScreenshotListById(id, currentPage, limit);
    }
  }, [id, currentPage, limit]);

  const handleDelete = async () => {
    let body: {
      screenshotEntryId?: string;
      deleteAll?: boolean;
      screenshotIds?: string[];
    } = {};
    console.log("object");
    try {
      if (id && userId) {
        const isAllSelected =
          screenshotList.length > 0 &&
          selectedScreenshots.length === screenshotList.length;

        body = {
          screenshotEntryId: id,
          ...(isAllSelected
            ? { deleteAll: true }
            : { screenshotIds: selectedScreenshots }),
        };

        console.log(body, "===>");
        setLoading(true);

        const { data } = await screenshotListDelete(body, userId);
        if (data?.status) {
          setLoading(false);
          getScreenshotListById(id);
          setSelectedScreenshots([]);
          notify(data?.message || "Screenshots deleted successfully!");
        }
      }
    } catch (error) {
      console.error("Error deleting screenshot folders:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        // notify(response?.data?.message);
        setLoading(false);
      } else {
        // notify(response?.data?.data || "Unable to update profile!");
        setLoading(false);
      }
    }
  };
  if (Loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  console.log(selectedScreenshots, "selected screenshots");
  return (
    <div>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Screenshots</h2>
          <button
            onClick={() => Navigate(-1)}
            className="bg-purple-900 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded"
          >
            ← Back to Folders
          </button>
        </div>

        {/* Admin Controls */}
        {isFromAdmin && screenshotList.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="form-checkbox h-4 w-4 text-purple-600"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </label>
            <button
              onClick={handleDelete}
              className={`bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm ${
                selectedScreenshots.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={selectedScreenshots.length === 0}
            >
              Delete Selected
            </button>
          </div>
        )}

        {/* Empty state */}
        {screenshotList && screenshotList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {screenshotList.map((screenshot, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                {/* <img
                  src={screenshot.imageLink}
                  alt={screenshot.imageName || `Screenshot ${index + 1}`}
                  loading="lazy"
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                /> */}
                <img
                  src={screenshot.imageLink}
                  alt={screenshot.imageName || `Screenshot ${index + 1}`}
                  loading="lazy"
                  className="w-full h-48 object-contain bg-gray-100 transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 text-center truncate">
                  {screenshot.imageName}
                  {isFromAdmin && (
                    <input
                      type="checkbox"
                      checked={selectedScreenshots.includes(screenshot?._id)}
                      onChange={() => toggleSelect(screenshot?._id)}
                      className="absolute top-2 left-2 z-10 h-4 w-4 text-purple-600"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            No screenshots available.
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

export default UserScreenshotsList;
