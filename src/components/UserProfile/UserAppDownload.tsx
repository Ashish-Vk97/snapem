import  {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useModal } from '../../hooks/useModal';
import { useNavigate } from 'react-router';

const UserAppDownload = () => {

    const Navigate = useNavigate();
    const { isOpen, openModal, closeModal } = useModal();
    // const isSubscribed = localStorage.getItem("isSubscribed") === "true";
     const authContext = useContext(AuthContext); 
          
              if (!authContext) {
                throw new Error("AuthContext must be used within an AuthProvider");
              }
          
              const {   currentUser } = authContext;

              const {isSubscribed: isUserSubscribed, stripeCustomerId} = currentUser || {};

   const handelDownload = () => {

       

        if (isUserSubscribed && stripeCustomerId) {
           
            const link = document.createElement("a");
            link.href = "/path-to-your-apk-file.apk"; // Replace with the actual APK file path
            link.download = "Snapem.apk";
            link.click();
        } else {
            openModal();
        }
      
    };



  return (
    <>
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
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Access to this application requires an active subscription. Please consider purchasing a subscription plan to continue using our services.</h3>
                    <button 
                        onClick={()=>(Navigate("/subscription"))} 
                        type="button" 
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
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

    <section className="flex flex-col">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="max-w-screen-sm mx-auto text-center">
                <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">Download Your <b  style={{color:"#7E57C2"}}>Snap'em </b>Application</h2>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Use our mobile application for your saftey . Click below!</p>
                <button 
                //  onClick={openModal}
                // disabled={!isSubscribed ? false : true}
                onClick={handelDownload}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">
                  {/* {isSubscribed ?"App downloaded stay safe":"Download"} */}
                  Download
             </button>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default UserAppDownload
