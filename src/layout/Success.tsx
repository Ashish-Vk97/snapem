import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { addPaymentSuccess } from "../service/subscription.service";
import { toast } from "react-toastify";

const Success = () => {
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [planDetails, setPlanDetails] = useState<any>({
    subscriptionId: "",
    user: {
      name: "",
      email: "",
      subscription: {
        start_date: "",
        plan: {
          amount: 0,
          currency: "",
          interval_count: 0,
          interval: "",
        },
      },
    },
  });

  const notify = (str: string) => toast(str);

  const fetchSessionData = async (id: string) => {
    try {
      const response = await addPaymentSuccess(id);

      if (response && response.data.status) {
        console.log("subscription success=====>", response);
        if (response?.data?.data) {
          // setSubscriptionPlans((prev) => (prev = response?.data?.data));
          console.log(
            "subscription success response data=====>",
            response.data.data
          );
          
          setPlanDetails((prev: any) => ({
            subscriptionId: response.data.data.subscriptionId,
            user: {
              name: response.data.data.user.name,
              email: response.data.data.user.email,
              subscription: {
                start_date: response.data.data.user.subscription.start_date,
                plan: {
                  amount: response.data.data.user.subscription.plan.amount,
                  currency: response.data.data.user.subscription.plan.currency,
                  interval_count: response.data.data.user.subscription.plan.interval_count,
                  interval: response.data.data.user.subscription.plan.interval,
                },
              },
            },
          }));

         
        }

        // setLoading(false);
      } else {
        setLoading(false);
        // setSubscriptionPlans((prev) => (prev = []));
      }
    } catch (error) {
      console.error("Error adding subscription plans:", error);
      const { response } = error as {
        response: { data: { code: number; data: string; message: string } };
      };

      console.log(response, response.data, "error....");
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
      } else {
        notify(response?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    const id = searchParams.get("session_id");
    console.log(id, "id=====================>");
    setSessionId(id ?? "");
    // Optionally: fetch session data using this ID
    fetchSessionData(id ?? "");
  }, [searchParams]);

  console.log(planDetails, "planDetails");
  const {
    subscriptionId,
    user: {
      name,
      email,
      subscription: {
        start_date,
        plan: { amount, currency, interval_count, interval },
      },
    },
  } = planDetails;

//   const startDateTimestamp = 1747034321000; // JavaScript Date object uses milliseconds

// const startDate = new Date(startDateTimestamp);

// const year = startDate.getFullYear();
// const month = startDate.getMonth() + 1; // Month is 0-indexed
// const day = startDate.getDate();
// const hours = startDate.getHours();
// const minutes = startDate.getMinutes();
// const seconds = startDate.getSeconds();

// const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

// console.log("Original Timestamp:", 1747034321);
// console.log("Real Date:", formattedDate);
 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) + " " + date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
//   const formattedDate = new Date(start_date).toLocaleDateString();
  const formattedDate = formatDate(start_date);
  const formattedAmount = `$${amount.toFixed(2)} ${currency.toUpperCase()}`;
  return (
    // <div className="bg-gray-100 h-screen">
    //   <div className="bg-white p-6  md:mx-auto">
    //     <svg
    //       viewBox="0 0 24 24"
    //       className="text-green-600 w-16 h-16 mx-auto my-6"
    //     >
    //       <path
    //         fill="currentColor"
    //         d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
    //       ></path>
    //     </svg>

    //     <div className="text-center">
    //       <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
    //         Payment Done!
    //       </h3>
    //       <p className="text-gray-600 my-2">
    //         Thank you for completing your secure online payment.
    //       </p>
    //       <p> Have a great day! </p>
    //       <div className="py-10 text-center">
    //         <button
    //           onClick={() => Navigate("/subscription")}
    //           className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
    //         >
    //           GO BACK
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto mb-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          />
        </svg>

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you {name.trim()} for subscribing.
          </p>

          <div className="text-left text-sm text-gray-700 space-y-2 border-t pt-4">
            <p>
              <strong>Subscription ID:</strong> {subscriptionId || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Start Date:</strong> {formattedDate}
            </p>
            <p>
              <strong>Amount:</strong> {formattedAmount}
            </p>
            <p>
              <strong>Billing:</strong> Every {interval_count} {interval}
              {interval_count > 1 ? "s" : ""}
            </p>
          </div>

          <div className="py-8 text-center">
            <button
              onClick={() => Navigate("/account")}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded"
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
