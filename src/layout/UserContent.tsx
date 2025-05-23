// import React from 'react'

import { useNavigate } from "react-router";
import { useModal } from "../hooks/useModal";
import snapImg from "../../snap.png";
import { ShieldCheck, Share2, AlertTriangle } from 'lucide-react';

const UserContent = () => {
 
    const Navigate = useNavigate();
    const { isOpen, openModal, closeModal } = useModal();
    const isSubscribed = localStorage.getItem("isSubscribed") === "true";
    const handelDownload = () => {

        const isSubscribed = localStorage.getItem("isSubscribed") === "true";

        if (isSubscribed) {
            // Logic to download the APK file
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
    {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-center px-8 py-20">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold text-[#6a1b9a] leading-tight">
            Building digital<br />Secure & Safe.
          </h2>
          <p className="text-lg text-gray-700">
            This platform provides an emergency SOS feature to keep you secure and safe and instantly connect to your close people. Access your contact information through <span className="font-bold text-[#6a1b9a]">Snap'em</span> and use our secure system.
          </p>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <img
            src="images/hero_section.png"
            alt="Snap'em Logo"
            className="w-3/4 max-w-sm drop-shadow-lg rounded-lg"
          />
        </div>
      </section>

        {/* How it works */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
      <h2 className="text-center text-4xl font-bold text-purple-700 mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <AlertTriangle className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Activate SOS</h3>
          <p className="text-gray-700 text-lg">Trigger the emergency SOS feature with single tap.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <Share2 className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Notify Contacts</h3>
          <p className="text-gray-700 text-lg">Immediately alert your trusted contacts and share your location.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <ShieldCheck className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Stay Safe</h3>
          <p className="text-gray-700 text-lg">Ensure your safety and security until help arrives.</p>
        </div>
      </div>
    </section>

    {/* download app */}

    
{/* <button 
    onClick={openModal} 
    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
    type="button"
>
    Toggle modal
</button> */}

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

    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Left Text Content */}
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">About Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Snap'em is dedicated to providing a reliable emergency SOS solution to help protect you,
            your loved ones in critical moments. Our mission is to offer a quick and easy way to reach
            out for help when it matters most.
          </p>
        </div>

        {/* Right Logo Box */}
        <div className="bg-white rounded-2xl shadow-md p-12 flex justify-center items-center">
          <img
          src="images/snapem_logo.png" // Replace with your actual logo path
          alt="Snap'em Logo"
          className="h-50"
        />
        </div>
      </div>
    </section>

{/* story Heading with description */}
{/* <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Powering innovation at <span className="font-extrabold">200,000+</span> companies worldwide</h2>
          <p className="mb-4 font-light">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
          <p className="mb-4 font-medium">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease.</p>
          <a href="#" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
              Learn more
              <svg className="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>
      </div>
  </div>
</section> */}

{/* end  Heading with description */}
 
 {/* create account */}
 
 {/* <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Payments tool for software companies</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
            <button onClick={()=>(Navigate("/signup"))} style={{backgroundColor:"#6b00ad"}} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Create Account
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <button onClick={()=>(Navigate("/signin"))} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Login
            </button> 
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"/>
        </div>                
    </div>
</section> */}

 {/* end create account */} 

    {/* <section className="bg-white dark:bg-gray-900">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 style={{color:"#6b00ad"}} className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We didn't reinvent the wheel</h2>
            <p  className="mb-4">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
            <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" loading="lazy" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" loading="lazy" />
        </div>
    </div>
</section> */}
  

     
       
       {/* <SubscriptionList /> */}


    </>
  );
};

export default UserContent;
