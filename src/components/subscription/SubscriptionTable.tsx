import React,{useState,useEffect} from "react";
import { addSubscriptionDetails, getAllSubscriptionList, updateSubscriptionDetails } from "../../service/subscription.service";
import { useNavigate } from "react-router";
import Loading from "../ui/loader/Loading";
import {toast} from "react-toastify";

const SubscriptionTable = () => {

  const Navigate = useNavigate();
  interface SubscriptionPlan {
    cardType: string;
    _id: string;
    price: number;
    description: string;
    perks: string[];
  }
  interface AddSubscriptionPlan {
    cardType: string;
   price:number;
   duration:number
    perks: string;
    description: string;
    // perks: string[];
  }
  interface SubscriptionDetails {
    _id: string;
    cardType: string;
    price: number;
    description: string;
  }


const [id, setId] = useState<string>("");
 const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
 const [AddsubscriptionPlans, setAddSubscriptionPlans] = useState<AddSubscriptionPlan>({
   cardType: "",
   price: 0,
   duration: 1,
   perks: "",
   description: "",
 });
const [subscriptionDetails, setSubscriptionDetails] = useState<{duration:number; cardType: string; price: number; description: string }>({
  cardType: "",
  price: 0,
  description: "",
  duration: 1,
});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false);
 
const notify = (str: string) => toast(str);


const handleEditSubscription = (item:SubscriptionDetails) => {
console.log(item,"item=====>")
  // Navigate("/subscription/edit-subscription", { state: { item } });
  setIsOpen(!isOpen);
  setId(item?._id);
  setSubscriptionDetails((prev)=>({...prev,cardType:item?.cardType,price:item?.price,description:item?.description}));


}

const handleAddSubscriptionModal = () => {
  // Navigate("/subscription/edit-subscription", { state: { item } });
    setIsAddSubscriptionOpen(!isAddSubscriptionOpen);
 }

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
      
      const { response } = error as { response: { data: { code: number,data:string, message: string } } };

      console.log(response, response.data,"error....");
      if(response?.data?.code === 404){
        // notify(response?.data?.message);
      }else{
        notify(response?.data?.data || "Something went wrong");
      }
    } finally {
      setLoading(false);
      // setSubscriptionPlans((prev)=>prev = []);
    }
  };

  const EditSubscrption = async (e:React.FormEvent<HTMLFormElement>,id:string) => {
    try {

      e.preventDefault();
      console.log("subscriptionDetails====>", subscriptionDetails);

      if (!subscriptionDetails.cardType || !subscriptionDetails.price || !subscriptionDetails.description) {
        alert("All fields are required. Please fill out the form completely.");
        return;
      }
     const response = await updateSubscriptionDetails(id,subscriptionDetails);

      console.log("response=====>", response);
      if (response && response.data.status) {
        setIsOpen(false);
        setSubscriptionDetails((prev)=>({...prev,cardType:"",price:0,description:""}));
        getAllSubscriptionPlans();
      } else {
        // setSubscriptionPlans((prev) => (prev = []));
      }
      
    } catch (error) {
      console.error("Error updating subscription plans:", error);
      const { response } = error as { response: { data: { code: number, data:string, message: string } } };

      console.log(response, response.data,"error....");
      if(response?.data?.code === 404){
        alert(response?.data?.data);
      }else{
        alert(response?.data?.data || "Something went wrong");
      }
    }
  }
  const AddSubscrption = async (e:React.FormEvent<HTMLFormElement>) => {
    try {

      e.preventDefault();
      console.log("subscriptionDetails====>", AddsubscriptionPlans);

      if (!AddsubscriptionPlans.cardType || !AddsubscriptionPlans.price || !AddsubscriptionPlans.description || !AddsubscriptionPlans.perks || !AddsubscriptionPlans.duration) {
        alert("All fields are required. Please fill out the form completely.");
        return;
      }

     
     const response = await addSubscriptionDetails(AddsubscriptionPlans);

      console.log("response=====>", response);
      if (response && response.data.status) {
        setAddSubscriptionPlans((prev)=>({...prev,cardType:"",price:0,perks:"",duration:1,description:""}));
        setIsAddSubscriptionOpen(false);
       
        getAllSubscriptionPlans();
      } else {
        // setSubscriptionPlans((prev) => (prev = []));
      }
      
    } catch (error) {
      console.error("Error adding subscription plans:", error);
      const { response } = error as { response: { data: { code: number,data:string, message: string } } };

      console.log(response, response.data,"error....");
      if(response?.data?.code === 404){
        alert(response?.data?.data);
      }else{
        notify(response?.data?.data || "Something went wrong");
      }
    } 
  }
  useEffect(() => {
    getAllSubscriptionPlans();
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <> 
    <div className="p-6 bg-gray-100  min-h-screen">
    {/* <h2 className="text-2xl font-semibold">Subscription Plans</h2> */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Subscription Plans</h2>
        <button onClick={()=>handleAddSubscriptionModal()} className="text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-4 py-2">
          Add Subscription
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <!-- Card 1 --> */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-bold mb-2">Basic Plan</h3>
        <p className="text-gray-600 text-lg mb-4">$9.99 / month</p>
        <ul className="text-sm text-gray-700 mb-4 space-y-1">
          <li>✔ 10GB Storage</li>
          <li>✔ Single User</li>
          <li>✔ Email Support</li>
        </ul>
        <div className="flex justify-between items-center">
          <button className="text-blue-600 hover:underline text-sm">Edit</button>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="toggle-checkbox" checked />
            <span className="text-sm">Active</span>
          </label>
        </div>
      </div> */}
      { subscriptionPlans && subscriptionPlans.length > 0 ? (
      subscriptionPlans.map((item, index) => {
        return (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-sm mx-auto">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">{item?.cardType || "NA"}</h3>
            <p className="text-gray-500 text-lg mt-1">
            ${item?.price} <span className="text-sm">/ month</span>
            </p>
            <p className="text-gray-600 mb-3">
                     {item?.description}
                    </p>
          </div>

          <ul className="space-y-2 text-gray-700 text-sm mb-6">
         {  item?.perks?.map((item:string, index:number) => (
                        // <li key={index} className="flex items-center mb-2">
                        //   <i className="fas fa-check text-green-500 mr-2"></i>{" "}
                        //   {item}
                        // </li>
                         <li key={index} className="flex items-center gap-2">
                         <span className="text-green-500">✔</span>      {item}
                       </li>
                      ))}
            {/* <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> 10GB Storage
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Single User
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Email Support
            </li> */}
          </ul>

          <div className="flex justify-between items-center border-t pt-4">
            <button   onClick={() => handleEditSubscription(item)} className="text-blue-600 hover:text-blue-800 text-sm font-medium transition">
              Edit
            </button>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked />
                <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
              </div>
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
        </div>
        )

      })):(
        <div className="flex items-center  justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full max-w-md text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v9a2 2 0 002 2z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">No Subscription Card Found</h2>
            <p className="text-gray-500 mt-2">
              Please add a subscription card to see it here.
            </p>
          </div>
        </div>

      )}

        {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-sm mx-auto">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Basic Plan</h3>
            <p className="text-gray-500 text-lg mt-1">
              $9.99 <span className="text-sm">/ month</span>
            </p>
          </div>

          <ul className="space-y-2 text-gray-700 text-sm mb-6">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> 10GB Storage
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Single User
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Email Support
            </li>
          </ul>

          <div className="flex justify-between items-center border-t pt-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition">
              Edit
            </button>

            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked />
                <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
              </div>
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
        </div> */}

        {/* <!-- Card 2 --> */}
       

        

        {/* <!-- Card 3 --> */}
       

       
        
       
      
      </div>
    </div>


    {isOpen && (
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update subscription card
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              </div>

              {/* Modal body */}
              <form onSubmit={(e)=>EditSubscrption(e,id)} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Card Type
                    </label>
                    {/* <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    /> */}
                      <select
                      id="category"
                      defaultValue=""
                      onChange={(e) => setSubscriptionDetails((prev)=>({...prev,cardType:e.target.value}))}
                      value={subscriptionDetails?.cardType}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      onChange={(e) => setSubscriptionDetails((prev)=>({...prev,price:Number(e.target.value)}))}
                      value={subscriptionDetails?.price}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Duration
                    </label>
                    <select
                      id="category"
                      defaultValue=""
                      value={subscriptionDetails?.duration}
                      onChange={(e) => setSubscriptionDetails((prev)=>({...prev,duration:Number(e.target.value)}))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value={0}>Monthly</option>
                      <option value={1}>Quarterly</option>
                      <option value={2}>Yearly</option>
                     
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={subscriptionDetails?.description}
                      onChange={(e) => setSubscriptionDetails((prev)=>({...prev,description:e.target.value}))}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {/* <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                 Update 
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 inline-flex items-center bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-4"
                  >
                  Close
                  </button>
              </form>
            </div>
          </div>
        </div>
      )}


{isAddSubscriptionOpen && (
        <div
          tabIndex={11}
          aria-hidden="true"
          //  className="fixed top-[-40px] right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%+40px)] max-h-none overflow-y-visible overflow-x-hidden"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add subscription card
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddSubscriptionOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              </div>

              {/* Modal body */}
              <form onSubmit={(e)=>AddSubscrption(e)} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Card Type
                    </label>
                    {/* <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    /> */}
                      <select
                      id="category"
                      defaultValue=""
                      onChange={(e) => setAddSubscriptionPlans((prev)=>({...prev,cardType:e.target.value}))}
                      value={AddsubscriptionPlans?.cardType}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      onChange={(e) => setAddSubscriptionPlans((prev)=>({...prev,price:Number(e.target.value)}))}
                      value={AddsubscriptionPlans?.price}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Duration
                    </label>
                    <select
                      id="category"
                      defaultValue=""
                      value={AddsubscriptionPlans?.duration}
                      onChange={(e) => setAddSubscriptionPlans((prev)=>({...prev,duration:Number(e.target.value)}))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="" disabled>
                        Select Duration
                      </option>
                      <option value={1}>Monthly</option>
                      <option value={2}>Quarterly</option>
                      <option value={3}>Yearly</option>
                     
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                       Perks
                    </label>
                    <input
                      id="perks"
                      type="text"
                      value={AddsubscriptionPlans?.perks}
                      onChange={(e) => setAddSubscriptionPlans((prev)=>({...prev,perks:e.target.value}))}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write perks here"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                       Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={AddsubscriptionPlans?.description}
                      onChange={(e) => setAddSubscriptionPlans((prev)=>({...prev,description:e.target.value}))}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                  type="submit"
                  className="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                  Add
                  </button>
                  <button
                  type="button"
                  onClick={() => {
                    setIsAddSubscriptionOpen(false)
                    setAddSubscriptionPlans((prev)=>({...prev,cardType:"",price:0,perks:"",duration:1,description:""}));
                  }}
                  className="text-gray-700 inline-flex items-center bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-4"
                  >
                  Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    


</>
  );
};

export default SubscriptionTable;
