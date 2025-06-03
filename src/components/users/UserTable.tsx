import { useState, useEffect } from "react";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router";
import { hitGetAllUsers, updateStatus } from "../../service/user.service";
import Loading from "../ui/loader/Loading";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  email: string;
  // phone: {
  //   images: string[];
  // };
  phone: string;
  status: string;
  // budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "User",
    },
    // email: "Agency Website",
    email: "Lindsey@email.com",
    phone: "1234567890",
    // team: {
    //   images: [
    //     "/images/user/user-22.jpg",
    //     "/images/user/user-23.jpg",
    //     "/images/user/user-24.jpg",
    //   ],
    // },
    // budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    email: "kayia@email.com",
    // team: {
    //   images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    // },
    phone: "1234567890",
    // budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    email: "Zain@email.com",
    // team: {
    //   images: ["/images/user/user-27.jpg"],
    // },
    phone: "1234567890",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    email: "abram@email.com",
    // team: {
    //   images: [
    //     "/images/user/user-28.jpg",
    //     "/images/user/user-29.jpg",
    //     "/images/user/user-30.jpg",
    //   ],
    // },
    phone: "1234567890",
    // budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    email: "carla@email.com",
    // team: {
    //   images: [
    //     "/images/user/user-31.jpg",
    //     "/images/user/user-32.jpg",
    //     "/images/user/user-33.jpg",
    //   ],
    // },
    phone: "5758584848",
    // budget: "1.9K",
    status: "Active",
  },
];

const SearchIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-gray-500 dark:text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      // clipRule="evenodd"
    />
  </svg>
);
const PlusIcon: React.FC = () => (
  <svg
    className="h-3.5 w-3.5 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      clip-rule="evenodd"
      fill-rule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    />
  </svg>
);
export default function UserTable() {
  const navigate = useNavigate();

  interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isSubscribed: boolean;
    status: string;
  }

  const [users, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  // const [error,setError] = useState(false);

  const fetchUsers = async () => {
    setAllUsers((prev) => (prev = []));
    setLoading(true);
    try {
      const response = await hitGetAllUsers();
      if (response.data.status) {
        console.log("users response data=====>", response);

        setAllUsers((prev) => (prev = response.data.data));

        setLoading(false);
      } else {
        navigate(`/notfound`);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      // setError(true);
      // setAllUsers((prev) => (prev = []));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(loading, "loading=====>");

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2S md:space-y-0 md:space-x-1 p-4">
        <div className="w-full  md:w-1/3 lg:w-1/3 mb-1">
          <form className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required={true}
              />
            </div>
          </form>
        </div>
        <div>
          <button
            type="button"
            className=" bg-purple-700 flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <PlusIcon />
            Add Users
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            {/* <Loading /> */}
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    User
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Subscription
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {loading ? (
                  <TableRow className="h-16">
                    <TableCell className="text-center">
                      <Loading />
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow className="h-16">
                    <TableCell className="text-center">No data found</TableCell>
                  </TableRow>
                ) : (
                  users.map((order) => (
                    <TableRow key={order?._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            {/* <img
                                width={40}
                                height={40}
                                src={order.user.image}
                                alt={order.user.name}
                              /> */}
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {/* {order.user.name} */}
                              {order?.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {/* {order.user.role} */} {order.role}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.phone}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.isSubscribed ? "Subscribed" : "Not Subscribed"}
                      </TableCell>
                      {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <div className="flex -space-x-2">
                            {order.team.images.map((teamImage, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                              >
                                <img
                                  width={24}
                                  height={24}
                                  src={teamImage}
                                  alt={`Team member ${index + 1}`}
                                  className="w-full size-6"
                                />
                              </div>
                            ))}
                          </div>
                        </TableCell> */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            order.status === "Active"
                              ? "success"
                              : order.status === "Pending"
                              ? "warning"
                              : "error"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            order.status === "Active"
                              ? "success"
                              : order.status === "Pending"
                              ? "warning"
                              : "error"
                          }
                        >
                          <svg
                            onClick={() =>
                              navigate(
                                `/users/view-edit-profile/edit/${order?._id}`
                              )
                            }
                            className="w-6 h-6 text-gray-500 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="square"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
                            />
                          </svg>
                          &nbsp;
                          <svg
                            onClick={() =>
                              navigate(
                                `/users/view-edit-profile/view/${order?._id}`
                              )
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500 dark:text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {/* Toggle Button */}
                          <label className="inline-flex items-center cursor-pointer ml-2">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={order.status === "active"}
                              onChange={async () => {
                                const newStatus =
                                  order.status === "active"
                                    ? "inactive"
                                    : "active";
                                // Optimistically update UI

                                try {
                                  const { data } = await updateStatus(
                                    order._id,
                                    newStatus
                                  );
                                  if (data?.status) {
                                    setAllUsers((prev) =>
                                      prev.map((u) =>
                                        u._id === order._id
                                          ? { ...u, status: newStatus }
                                          : u
                                      )
                                    );
                                  }
                                } catch (e) {
                                  // Revert UI on failure
                                  setAllUsers((prev) =>
                                    prev.map((u) =>
                                      u._id === order._id
                                        ? { ...u, status: order.status }
                                        : u
                                    )
                                  );
                                  alert("Failed to update status");
                                }
                              }}
                              disabled={loading}
                            />

                            {/* Toggle track & knob */}
                            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition-colors duration-300">
                              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>
                            </div>

                            {/* Toggle Label */}
                            {/* <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {order.status === "active" ? "Enabled" : "Disabled"}
                              </span> */}
                          </label>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
