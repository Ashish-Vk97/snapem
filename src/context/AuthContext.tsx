import { createContext, useState, useEffect, ReactNode } from "react";
import { hitGetUserById } from "../service/user.service";

interface Plan {
  id?: string;
  currency?: string;
  interval?: string;
  interval_count?: string;
  amount?: string;
}

interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  isSubscribed: boolean;
  stripeCustomerId: string;
  subscription:{ 
 
  id: string;
  status: string;
  start_date: string;
  plan?: Plan;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  loading: boolean;
}
// interface AuthContextType {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (isAuthenticated: boolean) => void;
//   currentUser: {
//     name: string;
//     email: string;
//     id: string;
//     role: string;
//     isSubscribed: boolean;
//     subId: string;
//     status: string;
//     start_date: string;
//     plan?: {
//       id?: string;
//       currency?: string;
//       interval?: string;
//       interval_count?: string;
//       amount?: string;
//     };
//   };

//   setCurrentUser: (user: {
//     name: string;
//     email: string;
//     id: string;
//     role: string;
//     isSubscribed: boolean;
//     subId: string;
//     status: string;
//     start_date: string;
//     plan?: {
//       id?: string;
//       currency?: string;
//       interval?: string;
//       interval_count?: string;
//       amount?: string;
//     };
//   }) => void;
//   loading: boolean;
// }

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    id: "",
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

  const [loading, setLoading] = useState(true);

  const getUserById = async (id: string, token: string) => {
    const response = await hitGetUserById(id, token);
    return response;
  };

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    const localUser = JSON.parse(localStorage.getItem("USER") || "{}");
    console.log("AuthContext useEffect");

    console.log(
      localUser,
      currentUser,
      "AuthContext start====================="
    );
    if (
      token !== null &&
      token !== undefined &&
      localUser !== null &&
      localUser !== undefined &&
      localUser._id !== null
    ) {
      (async () => {
        try {
          // let response = true;
          console.log(
            localUser,
            localUser._id,
            token,
            "AuthContext useEffect try"
          );
          setLoading(true);
          const response = await getUserById(localUser._id, token);
          console.log(
            response,
            response.data,
            "AuthContext useEffect try response"
          );
          if (response.data.status === true) {
            // const data = response.data.data;
            setCurrentUser((prevState) => ({
              ...prevState,
              ...response.data.data,
            }));
            setTimeout(() => {
              setIsAuthenticated(true);
              setLoading(false);
            }, 4000);

            // setIsAuthenticated(true);
          } else {
            localStorage.clear();
            setCurrentUser({
              name: "",
              email: "",
              id: "",
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
            setIsAuthenticated(false);
            // setLoading(false);
          }
        } catch (error) {
          localStorage.clear();
          setCurrentUser({
            name: "",
            email: "",
            id: "",
            role: "",
            stripeCustomerId: "",
             isSubscribed: false,
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
          setIsAuthenticated(false);
        } finally {
          setLoading(false);

          // Stop loading
        }
      })();
    } else {
      localStorage.clear();
      setCurrentUser({
        name: "",
        email: "",
        id: "",
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
      setIsAuthenticated(false);
      setLoading(false);
    }
    setLoading(false);
  }, [isAuthenticated]);

  return (
    <div>
      {loading ? (
        <div className=" border border-amber-300 w-full text-5xl">
          Loading...
        </div>
      ) : (
        <AuthContext.Provider
          value={{
            isAuthenticated,
            setIsAuthenticated,
            setCurrentUser,
            currentUser,
            loading,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
