// import React from 'react'

import { Link, useNavigate } from "react-router";
import { useModal } from "../hooks/useModal";
import snapImg from "../../snap.png";
import { ShieldCheck, Share2, AlertTriangle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Emergency from "/images/Animation.gif";
import sos from "/images/sos.gif";
import sosGuy from "/images/sos_guy.gif";
import { FaHeart } from "react-icons/fa";

const plans = [
  {
    name: "Monthly",
    price: "$5",
    note: " Billed monthly",
    features: [
      "SOS Emergency Alerts",
      "Auto Screenshot Uploads",
      "30-Day Cloud Storage",
      "Real-Time Location Sharing",
      "Emergency Contact Notifications",
    ],
    highlight: false,
  },
  {
    name: "Half yearly",
    price: "$25",
    note: "Billed every 6 months",
    features: [
      "SOS Emergency Alerts",
      "Auto Screenshot Uploads",
      "30-Day Cloud Storage",
      "Real-Time Location Sharing",
      "Emergency Contact Notifications",
    ],
    highlight: true,
    tag: "Most Popular",
  },
  {
    name: "Yearly",
    price: "$50",
    note: "Billed yearly",
    features: [
      "SOS Emergency Alerts",
      "Auto Screenshot Uploads",
      "30-Day Cloud Storage",
      "Real-Time Location Sharing",
      "Emergency Contact Notifications",
    ],
    highlight: false,
  },
];

const UserContent = () => {
  const Navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  // const isSubscribed = localStorage.getItem("isSubscribed") === "true";
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated, currentUser,setActiveTab } = authContext;

  const { isSubscribed: isUserSubscribed, stripeCustomerId } =
    currentUser || {};

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
    const handleClick = () => {
    setActiveTab("app");
    Navigate("/account");
  };

  console.log(isAuthenticated, currentUser, "isAuthenticated");

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 gap-10 bg-white text-gray-100">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Smart Protection,
            <br />
            Wherever You Go
          </h1>
          <p className="text-gray-600 mb-6">
           snap'em is your personal safety companion. Designed to provide
            instant emergency response, real-time location sharing, and
            continuous visual monitoring — all through one easy-to-use Android
            app. Whether you're traveling, commuting, or at home,snap'em
            ensures that your loved ones are just one tap away.
          </p>
          {!isAuthenticated ? (
            <div className="flex justify-center md:justify-start gap-4">
              <button onClick={()=>Navigate("/signup")}  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md hover:bg-purple-200">
                Sign Up
              </button>
              <button onClick={()=>Navigate("/signin")}  className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800">
                Sign In &nbsp; &rarr;
              </button>
            </div>
          ) : (
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => handleClick()}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md hover:bg-purple-200"
              >
                Download App
              </button>
              {/* <button
                onClick={() => Navigate("/account")}
                className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800"
              >
                My Account &nbsp; &rarr;
              </button> */}
            </div>
          )}
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2">
          <img
            src={"./images/Android.png"} // Replace with your actual image path
            alt="Snap'em App"
            className="max-w-xs mx-auto rounded-xl"
          />
        </div>
      </div>
      {/* Hero Section */}

      {/* <section className="flex flex-col lg:flex-row justify-between items-center px-8 py-20">
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
      </section> */}
      {/* how  it works updated  */}

      <section className="bg-white px-6 md:px-20 py-16 text-center">
        <div className="mb-12">
          <p className="text-sm font-semibold text-purple-700">
            How snap'em Works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">
            Emergency Help in Seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <img src={Emergency} alt="Sign up" className="w-32 h-32 mb-4" />
            <p className="text-sm text-gray-700">
              Sign up & add your emergency contacts
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <img src={sos} alt="Tap SOS" className="w-32 h-32 mb-4" />
            <p className="text-sm text-gray-700">
              Tap SOS in case of emergency
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <img
              src={sosGuy}
              alt="Notification sent"
              className="w-32 h-32 mb-4"
            />
            <p className="text-sm text-gray-700">
              Your contacts get notified instantly
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      {/* <section className="bg-gray-50 py-16 px-6 md:px-20">
      <h2 className="text-center text-4xl font-bold text-purple-700 mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      
        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <AlertTriangle className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Activate SOS</h3>
          <p className="text-gray-700 text-lg">Trigger the emergency SOS feature with single tap.</p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <Share2 className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Notify Contacts</h3>
          <p className="text-gray-700 text-lg">Immediately alert your trusted contacts and share your location.</p>
        </div>

   
        <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <ShieldCheck className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Stay Safe</h3>
          <p className="text-gray-700 text-lg">Ensure your safety and security until help arrives.</p>
        </div>
      </div>
    </section> */}

      {/* Plans Section */}

      <section className="bg-white px-6 md:px-20 py-16 text-center">
        <p className="text-sm font-semibold text-purple-700 mb-2">
          Subscription & App Access
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Start Your Safety Plan — Choose the Right Fit
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Whether you're trying snap'em for a month or protecting long-term,
          every plan includes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-6 border transition-all duration-300 min-h-[420px] max-w-[340px] mx-auto ${
                plan.highlight
                  ? "bg-purple-900 text-white border-purple-700 shadow-lg scale-105"
                  : "bg-white text-black border-gray-200"
              } transition-all duration-300`}
            >
              {/* Badge for Most Popular */}
              {plan.tag && (
                <div className="absolute top-3 right-2 bg-white text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {plan.tag}
                </div>
              )}

              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="text-3xl font-bold">{plan.price}</div>
              <p className="text-sm whitespace-pre-line mb-6">{plan.note}</p>

              <ul className="text-sm space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>

            { !isAuthenticated ? <button
                className={`w-full py-2 rounded-md font-medium ${
                  plan.highlight
                    ? "bg-white text-purple-900 hover:bg-gray-100"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
                onClick={() => Navigate("/signin")}
              >
                Choose Plan
              </button> : <button
                className={`w-full py-2 rounded-md font-medium ${
                  plan.highlight
                    ? "bg-white text-purple-900 hover:bg-gray-100"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
              disabled={true}
              >
                Choose Plan
              </button>}
             
            </div>
          ))}
        </div>
      </section>

      {/* call to action signup */}

      {!isAuthenticated ? (
        <div className="bg-purple-100 rounded-xl px-6 py-4 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto my-12">
          <h3 className="text-purple-900 font-semibold text-lg mb-3 md:mb-0">
            Join Snap’em and Stay Secure
          </h3>
          <button onClick={()=>Navigate("/signup")} className="bg-purple-900 text-white text-xs px-4 py-2 rounded-md hover:bg-purple-800">
            Sign Up
          </button>
        </div>
      ) : (
        <section className="bg-purple-100 mb-4 w-full px-4 md:px-12 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between rounded-xl bg-purple-100 px-6 py-6">
            {/* Text */}
            <h2 className="text-lg md:text-xl font-semibold text-purple-900 text-left">
              Your SOS Companion
              <br className="hidden md:block" /> is One Tap
            </h2>

            {/* Button */}
            <button onClick={()=>handleClick()} className="mt-4 md:mt-0 bg-purple-800 hover:bg-purple-900 text-white text-xs px-4 py-2 rounded shadow-sm">
              Download
            </button>
          </div>
        </section>
      )}
      {/* download app */}

      {/* footer */}

      

      {/* <button 
    onClick={openModal} 
    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
    type="button"
>
    Toggle modal
</button> */}

      {/* <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
       
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">About Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
           snap'em is dedicated to providing a reliable emergency SOS solution to help protect you,
            your loved ones in critical moments. Our mission is to offer a quick and easy way to reach
            out for help when it matters most.
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-md p-12 flex justify-center items-center">
          <img
          src="images/snapem_logo.png" // Replace with your actual logo path
          alt="Snap'em Logo"
          className="h-50"
        />
        </div>
      </div>
    </section> */}

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
