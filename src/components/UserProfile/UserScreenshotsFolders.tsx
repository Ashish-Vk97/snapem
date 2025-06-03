import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { toast } from "react-toastify";
import { hitScreenshotsFolders } from "../../service/screenshotvideo.service";
import { useNavigate } from "react-router";

const dates = ["2025-05-01", "2025-05-10", "2025-05-15", "2025-05-20"];
const formatDate = (dateString: string) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const UserScreenshotsFolders = () => {
  interface Folder {
    date: string;
    _id: string;
    // add other properties if needed
  }
  const [folderList, setFoldersList] = useState<Folder[]>([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const notify = (str: string) => toast(str);

  const fetchScreenshotsFolders = async () => {
    setLoading(true);
    try {
      // Simulate an API call
      setLoading(true);
      const response = await hitScreenshotsFolders();
      if (response.data.status) {
        console.log("users response data=====>", response);

        setFoldersList((prev) => (prev = response.data.data));
        // console.log(allEmergencyUsers, "all emergency users");
        setLoading(false);
      } else {
        Navigate(`/notfound`);
      }
    } catch (err) {
      console.error("Error fetching screenshot folders:", err);
      const { response } = err as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
        setLoading(false);
      } else {
        notify(response?.data?.data || "Unable to update profile!");
        setLoading(false);
      }
    }

    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchScreenshotsFolders();
  }, []);

  if (Loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {"Screenshot Folders"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {folderList && folderList?.length > 0 ? (
          folderList.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                Navigate(`/screenshots/${item?._id}`)}
              className="group bg-white rounded-lg shadow-sm border border-gray-2P00 hover:shadow-md transition duration-300 cursor-pointer p-4 flex items-center space-x-4 hover:bg-blue-50"
            >
              <div className="bg-purple-600 text-white p-3 rounded-md group-purple:bg-purple-700 transition">
                <FaFolder size={24} />
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  {formatDate(item?.date)}
                </p>
                <p className="text-gray-500 text-sm">Folder {index + 1} </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-20">
            No screenshot folders available.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserScreenshotsFolders;
