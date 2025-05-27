// import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ReactNode,useContext, useEffect } from "react";
import { useRoutes, Navigate, useNavigate } from "react-router";
import axios from "axios";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import UserAppLayout from "./layout/UserAppLayout";
import UserContent from "./layout/UserContent";
import ChangePassword from "./components/auth/ChangePassword";
import { AuthContext } from "./context/AuthContext";
import Users from "./pages/users/Users";
import SubscriptionList from "./layout/SubscriptionLayout/SubscriptionList";
import SubscriptionTable from "./components/subscription/SubscriptionTable";
import Success from "./layout/Success";
import Cancel from "./layout/Cancel";
import UserAccount from "./layout/UserAccount";
import ForgotPassword from "./components/auth/ForgotPassword";
import TransactionsTable from "./components/users/TransactionTable";
import EmergencyContact from "./components/UserProfile/EmergencyContact";
import UserViewEdit from "./layout/UserViewEdit";

interface RedirectToSignInProps {
  isUser: boolean;
  Component: ReactNode;
}

interface validateAdminChildrenProps {
  isAdmin: boolean;
  Component: ReactNode;
}
const UserWrapper: React.FC<RedirectToSignInProps> = ({
  isUser,
  Component,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated or their role is not 'User', redirect to '/signin'
    if (!isUser) {
      console.log("isuser =====>", isUser);
      localStorage.clear();
      navigate("/signin");
      return;
    }
  }, [isUser, navigate]);

  return <>{Component}</>; // No UI to render since we're redirecting the user
};

const AdminWrapper: React.FC<validateAdminChildrenProps> = ({
  isAdmin,
  Component,
}) => {
  const navigate = useNavigate();
  

  useEffect(() => {
    console.log("isAdmin=====>", isAdmin);
    // If the Admin is not authenticated or their role is not 'User', redirect to '/signin'
    if (!isAdmin) {
      localStorage.clear();
      navigate("/signin");
      return;
    }
  }, [isAdmin]);

  return <>{Component}</>; // No UI to render since we're redirecting the user
};

// interface AppProps {
//   pathName: string;
// }

// export default function App({ pathName }: AppProps) {
  export default function App() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { setIsAuthenticated, setCurrentUser,isAuthenticated, currentUser  } = authContext;
    const token = localStorage.getItem("AUTH_TOKEN");
  const localUser = JSON.parse(localStorage.getItem("USER") || "{}");
  // const navigate = useNavigate();

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      setIsAuthenticated(true);
      console.log(response,"======apppresponse");
      return response;
    },
    function (err) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      console.log(err, err.response);

      if (err.response) {
        console.log(err.response.status,"==========appp");
        console.log(err.response.statusText);
        console.log(err.message);
        console.log(err.response.headers); // 👉️ {... response headers here}
        console.log(err.response.data); // 👉️ {... response data here}
      }

      if (
        err?.response?.status === 403 &&
        err?.response?.data?.message === "Invalid token or token has expired!"
      ) {
        
        window.localStorage.clear();
        setIsAuthenticated(false);
          setCurrentUser({
              name: "",
              email: "",
              _id: "",
              role: "",
               isSubscribed: false,
               stripeCustomerId: "",
              subscription: {
                id: "",
                status: "",
                start_date: "",
                plan: {
                  id: "",
                  currency: "",
                  interval: "",
                  interval_count: "",
                  amount: "",
                },
              },
            });
        navigate(`/signin`, { replace: true });
      }

      if (err?.response?.status === 403) {
        console.log(err);
        // setSessionMessageFlag(true);
        window.localStorage.clear();
        setIsAuthenticated(false);
         setCurrentUser({
              name: "",
              email: "",
              _id: "",
              role: "",
               isSubscribed: false,
               stripeCustomerId: "",
              subscription: {
                id: "",
                status: "",
                start_date: "",
                plan: {
                  id: "",
                  currency: "",
                  interval: "",
                  interval_count: "",
                  amount: "",
                },
              },
            });
        // navigate(
        //   `/unauthorized`,
        //   { state: `${err.response.data.message}` },
        //   { replace: true }
        // );
      }
      if (err?.response?.status === 405) {
        console.log("check active user ........");
        // setSessionMessageFlag(true);
        window.localStorage.clear();
        setIsAuthenticated(false);
        navigate(`/`, { replace: true });
      }

      if (err?.response?.status === 401) {
        // setSessionMessageFlag(true);
        window.localStorage.clear();
        setIsAuthenticated(false);
         setCurrentUser({
              name: "",
              email: "",
              _id: "",
              role: "",
               isSubscribed: false,
               stripeCustomerId: "",
              subscription: {
                id: "",
                status: "",
                start_date: "",
                plan: {
                  id: "",
                  currency: "",
                  interval: "",
                  interval_count: "",
                  amount: "",
                },
              },
            });
      }
      return Promise.reject(err);
    }
  );

  // const authenticated = true;
  // const user = {
  //   id: 1,
  //   email: "john@gmail.com",
  //   name: "John Doe",
  //   role: "USER",
  // };
  // console.log(currentUser,isAuthenticated,"currentUser=========>app");
  

  // Determine the layout based on authentication and role
  // const isAdmin = isAuthenticated && currentUser.role === "ADMIN";
  // const isUser = isAuthenticated && currentUser.role === "USER";
  const isAdmin =  localUser.role === "ADMIN";
  const isUser = localUser.role === "USER";
  // const isAuthenticatedUser = isAuthenticated && currentUser;

  console.log(currentUser,"user===>",isUser,"admin==>", isAdmin,isAuthenticated,"isUser=======>");


  // const localUser = JSON.parse(localStorage.getItem("USER") || "{}");
// const isAdmin = localUser.role === "ADMIN";
// const isUser = localUser.role === "USER";
const isLoggedIn = localUser && (isAdmin || isUser);

const routes = useRoutes([
  // Redirect anyone hitting root to /home
  {
    index: true,
    element: <Navigate to="/home" />,
  },
  // Public Routes
  { 
    path: "/signin", 
    element: isLoggedIn ? <Navigate to="/home" /> : <SignIn /> 
  },
  { 
    path: "/signup", 
    element: isLoggedIn ? <Navigate to="/home" /> : <SignUp /> 
  },
  
   { path: "/reset-password", element: <ForgotPassword /> },
  { path: "/changePassword/:token", element: <ChangePassword /> },
  { path: "/success", element: <Success /> },
  { path: "/cancel", element: <Cancel /> },
  { path: "*", element: <NotFound /> },

  // Unauthenticated /home (default for unauthenticated users)
  // {
  //   path: "/home",
  //   element: isLoggedIn ? (
  //     isUser ? (
  //       <Navigate to="/subscription" />
  //     ) : (
  //       <Navigate to="/dashboard" />
  //     )
  //   ) : (
  //     <UserAppLayout>
  //       <UserContent />
  //     </UserAppLayout>
  //   ),
  // },
  {
    path: "/home",
    element: isLoggedIn ? (
      isUser ? (
        <Navigate to="/user-home" />
      ) : (
        <Navigate to="/dashboard" />
      )
    ) : (
      <UserAppLayout />
    ),
    children: [
      {
        index: true,
        element: <UserContent />,
      },
      // {
      //   index: true,
      //   element: <UserContent />,
      // },
    ],
  },
  

  // Protected Layouts (Only visible when logged in)
  isLoggedIn && {
    path: "/",
    element: isAdmin ? <AppLayout /> : <UserAppLayout />,
    children: [
      {
        index: true,
        element: isUser ? (
          <Navigate to="/user-home" />
        ) : (
          // <AdminWrapper isAdmin={isAdmin} Component={<Home />} />
          <Navigate to="/dashboard" />
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AdminWrapper isAdmin={isAdmin} Component={<Home />} />
        ),
      },
      {
        path: "/profile",
        element: (
          <AdminWrapper isAdmin={isAdmin} Component={<UserProfiles />} />
        ),
      },
      {
        path: "/users",
        element: <AdminWrapper isAdmin={isAdmin} Component={<Users />} />,
      },
      {
        path: "/content",
      
        element: <AdminWrapper isAdmin={isAdmin} Component={<TransactionsTable />} />,
      },
       {
        path: "/emergency",
        
        element: <UserWrapper isUser={isUser} Component={<EmergencyContact />} />,
      }, 

      {
        path: "/images",
        element: <AdminWrapper isAdmin={isAdmin} Component={<Images />} />,
      },
      {
        path: "/videos",
        element: <AdminWrapper isAdmin={isAdmin} Component={<Videos />} />,
      },
      
      {
        path: "/subscription",
        element: (
          <UserWrapper isUser={isUser} Component={<SubscriptionList />} />
        ),
      },
       {
        path: "/account",
        element: (
          <UserWrapper isUser={isUser} Component={<UserAccount />} />
        ),
      },
      {
        path: "/admin-subscription",
        element: (
          <AdminWrapper isAdmin={isAdmin} Component={ <SubscriptionTable/>} />
        ),
      },
    
      {
        path: "/contacts",
        element: (
          <UserWrapper isUser={isUser} Component={<BarChart />} />
        ),
      },
      {
        path: "/user-home",
        element: (
          <UserWrapper isUser={isUser} Component={<UserContent />} />
        ),
      },
      {
        path: "/view-edit-profile",
        element: (
          <UserWrapper isUser={isUser} Component={<UserViewEdit />} />
        ),
      },
    ],
  },
]);



  // const routes = useRoutes([
  //   {
  //     index: true,
  //     element: <Navigate to="/home" />,
  //   },
  //   {
  //     path: "/",
  //     // element: <AppLayout />,
  //     element: localUser ? (
  //       isAdmin ? (
  //         <AppLayout />
  //       ) : (
  //         <UserAppLayout />
  //       )            
  //     ) : (
  //       <Navigate to="/signin" />
  //     ),
  //     children: [
  //       {
  //         path: "/",
  //         element: isUser ? (
  //           <Navigate to="/subscription" /> 
  //         ) : (
  //           <AdminWrapper isAdmin={isAdmin} Component={<Home />} /> // Admin user sees Home
  //         ),
  //       },
  //       // { path: '/profile', element: <UserProfiles /> },
  //       {
  //         path: "/profile",
  //         element: (
  //           <AdminWrapper isAdmin={isAdmin} Component={<UserProfiles />} />
  //         ),
  //       },
  //       {
  //         path: "/users",
  //         element: (
  //           <AdminWrapper isAdmin={isAdmin} Component={<Users />} />
  //         ),
  //       },
  //       {
  //         path: "/calendar",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Calendar />} />,
  //       },
  //       {
  //         path: "/blank",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Blank />} />,
  //       },
  //       {
  //         path: "/form-elements",
  //         element: (
  //           <AdminWrapper isAdmin={isAdmin} Component={<FormElements />} />
  //         ),
  //       },
  //       {
  //         path: "/basic-tables",
  //         element: (
  //           <AdminWrapper isAdmin={isAdmin} Component={<Videos />} />
  //         ),
  //       },
  //       {
  //         path: "/alerts",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Alerts />} />,
  //       },
  //       {
  //         path: "/avatars",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Avatars />} />,
  //       },
  //       {
  //         path: "/badge",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Badges />} />,
  //       },
  //       {
  //         path: "/buttons",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Buttons />} />,
  //       },
  //       {
  //         path: "/images",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Images />} />,
  //       },
  //       {
  //         path: "/videos",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<Videos />} />,
  //       },
  //       {
  //         path: "/line-chart",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<LineChart />} />,
  //       },
  //       {
  //         path: "/bar-chart",
  //         element: <AdminWrapper isAdmin={isAdmin} Component={<BarChart />} />,
  //       },
  //       // { path: '/subscription', element: <UserWrapper isUser={isUser} Component = {< UserContent/>} /> },
  //       // {
  //       //   // index: true,
  //       //   path:"/home",
  //       //   element: (
  //       //     <UserWrapper isUser={isUser} Component={<UserContent />} />
  //       //   ),
  //       // },
  //       {
  //         // index: true,
  //         path:"/subscription",
  //         element: (
  //           <UserWrapper isUser={isUser} Component={<SubscriptionList />} />
  //         ),
  //       },

  //       {
  //         path: "/contacts",
  //         element: (
  //           <UserWrapper isUser={isUser} Component={<BarChart />} />
  //         ),
  //       },
  //     ],
  //   },
  //   { path: "/signin", element: <SignIn /> },
  //   { path: "/signup", element: <SignUp /> },
  //   { path: "/changePassword/:token", element: <ChangePassword /> },
  //   { path: "*", element: <NotFound /> },
  //   { path: "/notfound", element: <NotFound /> },
  //   {
  //     // index: true,
  //     path:"/home",
  //     // element: (
  //     //   <UserWrapper isUser={isUser} Component={<UserContent />} />
  //     // ),
  //     element: <UserContent />
  //   },
  // ]);
  
  return (
    
    <>
      <ScrollToTop />
      {routes}
    </>
  );
}
