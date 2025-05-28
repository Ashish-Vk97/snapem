import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router";
import { customerPortalSubscription } from "../../service/subscription.service";
import { toast } from "react-toastify";
import Loading from "../ui/loader/Loading";

// interface CurrentSubscription {
//   id: string;
//   status: string;
//   start_date: string;

//   plan?: {
//     id?: string;
//     currency?: string;
//     interval?: string;
//     inyerval_count?: string;
//     amount?: string;
//   };
// }
const UserSubscription = () => {
  const [loading, setLoading] = useState(false);
  const notify = (str: string) => toast(str);

  const { isOpen, openModal, closeModal } = useModal();

  //  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { currentUser } = authContext;

  const manageSubscription = async () => {
    try {
      const response = await customerPortalSubscription(
        currentUser?.stripeCustomerId
      );
      console.log(response, "response====>");
      setLoading(true);
      if (response && response.data.status) {
        console.log("subscription response data=====>", response);
        if (response?.data?.data?.url) {
          setLoading(false);
          window.location.href = response?.data?.data?.url;
        }

        // setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error managing subscription:", error);

      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      setLoading(false);
      console.log(response, response.data, "error....");
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
      } else {
        notify(response?.data?.message || "Something went wrong");
      }
    }
  };
  const formatDate = (dateString: string) => {
   
    if (!dateString) {
      return "NA"; 
    }
    const cleanedDateString = dateString?.replace(" at", "");
    const date = new Date(cleanedDateString);
     console.log( "dateString=====>", date);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );
  };
  //   const formattedDate = new Date(start_date).toLocaleDateString();

  console.log(currentUser, "=====>currentuserusersubscription");
  const { isSubscribed, subscription } = currentUser;
  const { id, status, start_date, plan } = subscription;
  const { amount, interval, interval_count } = plan || {};

  if (loading) {
    return <Loading />;
  }
  

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Subscription
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Subscription ID
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {id || " NA"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {status || " NA"}
                {/* {address?.city},{address?.state} */}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                start Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {formatDate(start_date) || " NA"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Amount
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {/* {amount ||" NA"} */}
                {amount ? `$${Number(amount)/100}` : " NA"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Interval
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {interval || " NA"}
              </p>
            </div>
            {/* <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                   { isSubscribed ? "Currently You are on active subscription plan" : "not subscribed"}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {"monthly"}
                </p>
              </div>  */}
          </div>
          <div>
            <p className="mb-4 mt-6 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {isSubscribed
                ? "Currently You are on active subscription plan"
                : "not subscribed"}
            </p>
            {/* <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {"monthly"}
                </p> */}
          </div>
        </div>

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
          Manage
        </button>
      </div>

      {isOpen && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                type="button"
                onClick={closeModal}
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
                  Are you sure to manage your susbcription
                </h3>
                <button
                  onClick={() => manageSubscription()}
                  type="button"
                  className="text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={closeModal}
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
    </div>
  );
};

export default UserSubscription;
