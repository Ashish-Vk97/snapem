import React, { useState, useEffect } from "react";
import { addPaymentCheckout, getAllSubscriptionList } from "../../service/subscription.service";
import Loading from "../../components/ui/loader/Loading";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SubscriptionList: React.FC = () => {
  const Navigate = useNavigate();
  interface SubscriptionPlan {
    cardType: string;
    price: number;
    description: string;
    perks: string[];
    stripePriceId: string;
    stripeProductId: string;
  }

  interface SubscriptionPanel {
    cardType: string;
    price: number;
    description: string;
    perks: string[];
    stripePriceId: string;
    stripeProductId: string;
  };
 const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
const [selectedPlan, setSelectedPlan] = useState<SubscriptionPanel | null>(null)

const notify = (str: string) => toast(str);
const openPanel = (plan: SubscriptionPanel): void => {
  setSelectedPlan(plan);
  setIsPanelOpen(true);
};

const closePanel = (): void => {
  setIsPanelOpen(false);
  setSelectedPlan(null);
};

const handlePurchase = async(plan: SubscriptionPanel) => {
  // alert(`Purchased ${plan.cardType}`);
  try {
   
    const { stripePriceId:priceId } = plan;
    setLoading(true);
    const response = await addPaymentCheckout({priceId});

      if (response && response.data.status) {
        console.log("subscription response data=====>", response);
        if (response?.data?.data?.url) {
          setLoading(false);
        window.location.href = response?.data?.data?.url; 
      }

      
        // setLoading(false);
      } else {
        setLoading(false);
        // setSubscriptionPlans((prev) => (prev = []));
      }
    
  } catch (error) {
      console.error("Error adding subscription plans:", error);
      const { response } = error as { response: { data: { code: number,data:string, message: string } } };

      console.log(response, response.data,"error....");
      if(response?.data?.code === 404){
        notify(response?.data?.message);
      }else{
        notify(response?.data?.message || "Something went wrong");
      }
  }

  // localStorage.setItem("isSubscribed", "true");
  // closePanel();
  // Navigate("/user-home");
};

  const getAllSubscriptionPlans = async () => {
   
    try {
      const response = await getAllSubscriptionList();

      if (response && response.data.status) {
        console.log("subscription response data=====>", response);

        setSubscriptionPlans((prev) => (prev = response.data.data));
        // setSubscriptionPlans([...response.data.data]);
        setLoading(false);
      } else {
        setSubscriptionPlans((prev) => (prev = []));
      }
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
    } finally {
      setLoading(false);
      // setSubscriptionPlans((prev)=>prev = []);
    }
  };

  useEffect(() => {
    getAllSubscriptionPlans();
  }, []);

  if (loading) {
    return <Loading />;
  }

  
  console.log(selectedPlan, "===>selected plan");
 
  return (
    <>

{isPanelOpen && selectedPlan && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300"
      onClick={closePanel}
    ></div>

    {/* Slide-in Panel */}
    <div
      className={`
        fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out
        ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex justify-between items-center p-5 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedPlan.cardType} Plan
        </h2>
        <button
          onClick={closePanel}
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-bold text-purple-700">
            ${selectedPlan.price}
          </span>
          <span className="text-lg ml-2 text-gray-500">/month</span>
        </div>

        <p className="text-gray-600 mb-6">{selectedPlan.description}</p>

        <ul className="space-y-3 mb-6">
          {selectedPlan.perks.map((perk, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <i className="fas fa-check text-green-500 mr-3"></i> {perk}
            </li>
          ))}
        </ul>

        <button
          onClick={() => handlePurchase(selectedPlan)}
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-3 px-4 rounded-lg w-full text-lg font-semibold"
        >
          Buy {selectedPlan.cardType}
        </button>
      </div>
    </div>
  </>
)}



      <div className="App bg-purple-100">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-8">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-purple-900 dark:text-white">
            Choose your plans to get Snap'em
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Here at snap'em we focus on security where technology, innovation,
            and capital can unlock your saftey and secure your life.
          </p>
        </div>

        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Starter Plan */}
              { subscriptionPlans && subscriptionPlans?.length > 0 ? (subscriptionPlans?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3"
                  >
                    <h2 className="text-xl font-bold mb-4">{item?.cardType}</h2>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold"> ${item?.price} </span>
                      <span className="text-lg ml-1">/month</span>
                    </div>
                    <div className="text-gray-500 line-through mb-4">
                      $25.00
                    </div>
                    <p className="text-gray-600 mb-4">
                     {item?.description}
                    </p>
                    <ul className="mb-6">
                      {
                      // [
                      //   "5 website",
                      //   "500 MB Storage",
                      //   "Unlimited Sub-Domain",
                      //   "3 Custom Domain",
                      //   "Free SSL Certificate",
                      //   "Unlimited Traffic",
                      // ]
                      item?.perks?.map((item:string, index:number) => (
                        <li key={index} className="flex items-center mb-2">
                          <i className="fas fa-check text-green-500 mr-2"></i>{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                     onClick={() => openPanel(item)}
                      style={{ backgroundColor: "#7E57C2" }}
                      className="bg-gray-800 text-white py-2 px-4 rounded-lg w-full"
                    >
                      Choose Starter
                    </button>
                  </div>
                );
              })) :(
                <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3">
                  <h2 className="text-xl font-bold mb-4">No Plans Available</h2>
                  <p className="text-gray-600 mb-4">
                    Currently, there are no subscription plans available.
                  </p>
                </div>
              )}

              {/* Medium Plan */}
              {/* <div
                style={{ backgroundColor: "#7E57C2" }}
                className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-full md:w-1/3"
              >
                <h2 className="text-xl font-bold mb-4">Quarterly</h2>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$25.00</span>
                  <span className="text-lg ml-1">/month</span>
                </div>
                <div className="text-gray-500 line-through mb-4">$30.00</div>
                <p className="text-black-400 mb-4">
                  For working on commercial projects
                </p>
                <ul className="mb-6">
                  {[
                    "10 website",
                    "1 GB Storage",
                    "Unlimited Sub-Domain",
                    "5 Custom Domain",
                    "Free SSL Certificate",
                    "Unlimited Traffic",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <i className="fas fa-check text-green-500 mr-2"></i>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full">
                  Choose Medium
                </button>
              </div> */}

              {/* Large Plan */}
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionList;
