import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../service/user.service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

interface CurrentUser {
  name: string;
  email: string;
  _id: string;
  role: string;
  phone?: string;
  address?: {
    country?: string;
    city?: string;
    pincode?: string;
    state?: string;
  };
}

export default function UserInfoCard({
  currentUser, mode = "edit", isUserAccount = false
}: {
  currentUser: CurrentUser;
  isUserAccount?: boolean;
  mode?: "view" | "edit";
}) {

  const Navigate = useNavigate();

  const authContext = useContext(AuthContext); 
      
          if (!authContext) {
            throw new Error("AuthContext must be used within an AuthProvider");
          }
      
          const {  setCurrentUser  } = authContext;
      
         
  const [userData, setUserData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    role: currentUser.role || "",
  });
  const [id, setId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  // const notify = (str: string) => toast(str);
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(userData, "Savingchanges");
      if (!userData.name.trim()) {
        console.log("name run", userData.name);
        alert("Name is required.");
        return;
      }

      if (
        !userData.email.trim() ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)
      ) {
        console.log("email run", userData.email);
        alert("A valid email is required.");
        return;
      }
      if (userData.phone && !/^\+?\d{7,15}$/.test(userData.phone)) {
        console.log("phone run", userData.phone);
        alert("Please enter a valid phone number.");
        return;
      }
      if (!userData.role.trim()) {
        alert("Role is required.");
        return;
      }
      const { data } = await updateUserProfile(id, userData);

      if (data.status) {
         setCurrentUser((prevState) => ({
              ...prevState,
              ...data.data,
            }));
        // localStorage.setItem("USER", JSON.stringify({_id,email,role,name}));
        setUserData({
          name: "",
          email: "",
          phone: "",
          role: "",
        });

        toast.success("registration successfull");
        closeModal();
      }
    } catch (error) {
      const { response } = error as {
        response: { data: { code: number;data:string; message: string } };
      };

      console.log(response.data, "error....");
      if (response?.data?.code === 404) {
        alert(response?.data?.message);
      }else{
        alert(response?.data?.data || "Unable to update profile!");
      }
    }
    // Handle save logic here

    // closeModal();
  };

  useEffect(() => {
    console.log(currentUser, "currentUser in UserInfoCard");
    setUserData(() => ({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      role: currentUser.role || "",
    }));
    setId(currentUser._id || "");
  }, [currentUser]);
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {currentUser?.name || " NA"}
              </p>
            </div>

            {/* <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Chowdhury
              </p>
            </div> */}

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {currentUser?.email || " NA"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {currentUser?.phone || " NA"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Role
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {currentUser?.role || " NA"}
              </p>
            </div>
          </div>
        </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-4">
        {mode === "edit" && (
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        )}
       { isUserAccount && (  <button
          onClick={() => {
           Navigate( "/emergency");
          }
          }
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Manage emergency contacts 
        </button>)}
      </div>
       
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSave}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                {/* <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5> */}

                {/* <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      value="https://www.facebook.com/PimjoHQ"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input type="text" value="https://x.com/PimjoHQ" />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      value="https://www.linkedin.com/company/pimjo"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input type="text" value="https://instagram.com/PimjoHQ" />
                  </div>
                </div> */}
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      value={userData.name}
                    />
                  </div>

                  {/* <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input type="text" value="Chowdhury" />
                  </div> */}

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      value={userData.email}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      value={userData.phone}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input
                      type="text"
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      value={userData.role}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={()=>{
                setUserData({ name: "", email: "", phone: "",role: "" });
                setId("");
                closeModal();

              }}>
                Close
              </Button>
              <Button size="sm" type="submit" className="bg-purple-600 text-white hover:bg-purple-700">Save Changes</Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
