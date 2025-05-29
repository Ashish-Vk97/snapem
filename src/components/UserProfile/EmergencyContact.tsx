import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  addEmergencyContact,
  deleteEmergencyContact,
  editEmergencyContactApi,
  hitEmergencyContactApi,
} from "../../service/emergency.service";
import { useNavigate } from "react-router";
import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { Modal } from "../ui/modal";

type EmergencyUser = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  // Add other fields as needed, e.g. email?: string;
};

const EmergencyContact = () => {
  const [allEmergencyUsers, setAllEmergencyUsers] = useState<EmergencyUser[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [userData, setUserData] = useState<EmergencyUser>({
    name: "",
    email: "",
    phone: "",
  });
  const [id, setId] = useState<string>("");
  const {
    isOpen,
    openModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    isDeleteOpen,
  } = useModal();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  //   const { currentUser } = authContext;

  const notify = (str: string) => toast(str);

  //   useEffect(() => {
  //     if (currentUser && currentUser._id) {
  //         setId(currentUser._id);
  //     }
  // }, [currentUser]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!(userData.name ?? "").trim() || !(userData.phone ?? "").trim()) {
        notify("All fields are required.");
        return;
      }

      // Here you would typically send the data to your API
      // For example:
      const response = await addEmergencyContact(userData);
      // console.log(response.data, "response data");

      if (response.data.status) {
        console.log("Emergency contact added successfully:", response.data);
        setUserData({ name: "", email: "", phone: "" });
        closeModal();
        notify("Emergency contact added successfully!");
        fetchEmergencyContact();
      } else {
        console.error(
          "Failed to add emergency contact:",
          response.data.message
        );
        notify("Failed to add emergency contact:" + response.data.message);
      }
    } catch (error) {
      console.error("Error saving emergency contact:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        alert(response?.data?.message);
      } else {
        alert(response?.data?.data || "Unable to update profile!");
      }
    }
  };

  const fetchEmergencyContact = async () => {
    try {
      setLoading(true);
      const response = await hitEmergencyContactApi();
      if (response.data.status) {
        console.log("users response data=====>", response);

        setAllEmergencyUsers((prev) => (prev = response.data.data));
        console.log(allEmergencyUsers, "all emergency users");
        setLoading(false);
      } else {
        Navigate(`/notfound`);
      }
    } catch (error) {
      console.error("Error fetching emergency contact:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        // notify(response?.data?.message);
        setAllEmergencyUsers((prev) => (prev =[]));
          setId("");

        setLoading(false);
      } else {
        // notify(response?.data?.data || "Unable to update profile!");
        setAllEmergencyUsers((prev) => (prev =[]));
        setLoading(false);
          setId("");
      }
    }
  };

  useEffect(() => {
    fetchEmergencyContact();
  }, []);
  const handelOpen = (item: EmergencyUser, isEdit: boolean) => {
    if (isEdit) {
      setId(item?._id || "");
      setUserData({
        name: item.name || "",
        email: item.email || "",
        phone: item.phone || "",
      });
    }

    openModal();
  };

  const editEmergencyContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!(userData.name ?? "").trim() || !(userData.phone ?? "").trim()) {
        notify("All fields are required.");
        return;
      }

      // Here you would typically send the data to your API
      // For example:
      const response = await editEmergencyContactApi(id, userData);

      // console.log(response.data, "response data");

      if (response.data.status) {
        console.log("Emergency contact added successfully:", response.data);
        setUserData({ name: "", email: "", phone: "" });
        setId("");
        closeModal();
        notify("Emergency contact edited successfully!");
        fetchEmergencyContact();
      } else {
        console.error(
          "Failed to add emergency contact:",
          response.data.message
        );
        notify("Failed to add emergency contact:" + response.data.message);
      }
    } catch (error) {
      console.error("Error editing emergency contact:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
      } else {
        notify(response?.data?.data || "Unable to update profile!");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) {
        notify("Invalid contact ID.");
        return;
      }
      const response = await deleteEmergencyContact(id);

      if (response.data.status) {
        console.log("Emergency contact deleted successfully:", response.data);
        notify("Emergency contact deleted successfully!");
        fetchEmergencyContact();
         setId("");
        closeDeleteModal();

      } else {
        console.error(
          "Failed to delete emergency contact:",
          response.data.message
        );
           setId("");
        notify("Failed to delete emergency contact:" + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching emergency contact:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
        setLoading(false);
           setId("");
      } else {
        notify(response?.data?.data || "Unable to update profile!");
        setLoading(false);
           setId("");
      }
    }
  };
  const handelDeleteModal = (id: string) => {
    setId(id);
    openDeleteModal();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {isDeleteOpen && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure want to this contact
                </h3>
                <button
                  onClick={() => handleDelete(id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pr-3 h-20 mb-5  bg-purple-200 dark:bg-gray-900">
        <h1 className="text-2xl text-purple-700 font-bold pl-3 mb-4">
          Emergency Contacts
        </h1>
        <button
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
        >
          {" "}
          Add +
        </button>
      </div>
      <div className="flex flex-row gap-6 justify-center">
        {allEmergencyUsers && allEmergencyUsers.length > 0 ? (
          allEmergencyUsers.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-white max-w-sm shadow overflow-hidden rounded-lg"
              >
                <div className="px-4 py-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User database
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and informations about user.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 col-span-2">
                        {item?.name || "NA"}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 col-span-2">
                        {item?.email || "NA"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 col-span-2">
                        {item?.phone || "0000000000"}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex mt-4 mx-3 mb-4 md:mt-6">
                  <button
                    onClick={() => handelOpen(item, true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {" "}
                    Edit{" "}
                  </button>
                  <button
                    onClick={()=>handelDeleteModal(item._id || "")}
                    className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-gray-700">
              No Emergency Contacts Found
            </h1>
          </div>
        )}
      </div>

      {/* <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
     
        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
           
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div className="flex mt-4 md:mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
            <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
        </div>
    </div>
</div> */}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setUserData({ name: "", email: "", phone: "" });
          setId("");
          closeModal();
        }}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add Emergency Contact
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Add your details to keep your emergency contact up-to-date.
            </p>
          </div>
          <form
            onSubmit={id ? editEmergencyContact : handleSave}
            className="flex flex-col"
          >
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    value={userData?.name}
                  />
                </div>

                <div>
                  <Label>Email address</Label>
                  <Input
                    type="email"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    value={userData?.email}
                  />
                </div>

                <div>
                  <Label>Phone No</Label>

                  <Input
                    type="text"
                    placeholder="Enter your phone no."
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    value={userData?.phone}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setUserData({ name: "", email: "", phone: "" });
                  setId("");
                  closeModal();
                }}
              >
                Close
              </Button>

              <Button
                size="sm"
                type="submit"
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EmergencyContact;
