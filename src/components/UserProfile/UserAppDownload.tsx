import  {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useModal } from '../../hooks/useModal';
import { useNavigate } from 'react-router';
import snapemIcon from "/images/Snapdownload.png"; // Adjust the path as necessary

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
            link.href = "https://i.diawi.com/bNoCfg"; // Replace with the actual APK file path
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

    {/* <section className="flex flex-col">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="max-w-screen-sm mx-auto text-center">
                <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">Download Your <b  style={{color:"#7E57C2"}}>Snap'em </b>Application</h2>
                <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">Use our mobile application for your saftey . Click below!</p>
                <button 
                 onClick={openModal}
                disabled={!isSubscribed ? false : true}
                onClick={handelDownload}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">
                  {isSubscribed ?"App downloaded stay safe":"Download"}
                  Download
             </button>
            </div>
        </div>
    </section> */}

     <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Title and Icon */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold mb-4">Snap’em</h1>
          <button onClick={handelDownload}  className="bg-purple-700 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-800">
            Download Now
          </button>
        </div>
        <img src={snapemIcon} alt="Snapem Icon" className="w-74 h-74 mt-6 md:mt-0" />
      </div>

      {/* Full-width cover image */}
      <div className="mb-10 mt-4">
        <img
          src={"./images/Screenshots.png"} // Replace with the actual path to your cover image
          alt="Snap'em App Cover"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* About and Install sections */} 
      <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700">
        <div>
          <h2 className="font-semibold text-lg mb-2">About Snap’em</h2>
          <p>
            Snap’em is a smart safety app for Android that automatically captures device screenshots
            at regular intervals and securely uploads them to the cloud. In case of an emergency, the built-in
            SOS feature instantly records a 30-second video with audio, shares it with a pre-set emergency
            contact, and safely stores the recording online.
          </p>
          <p className="mt-3">
            Users can log into the Snap’em website to manage their profile, view captured screenshots,
            access SOS recordings, and update emergency contact details.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">How to Install Snap’em (APK)</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to Settings &gt; Security on your Android device.</li>
            <li>
              Enable Install from Unknown Sources (you may find this under install unknown apps in newer Android versions).
            </li>
            <li>Locate and open the downloaded Snap’em APK file.</li>
            <li>Tap Install and follow the on-screen instructions.</li>
            <li>
              Once installed, launch the app and log in to stay informed and stay protected.
            </li>
          </ol>
        </div>
      </div>
    </section>
      
    </>
  )
}

export default UserAppDownload
