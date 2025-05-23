import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { forgotPassword } from "../../service/auth.service";
import Input from "../form/input/InputField";
import Label from "../form/Label";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [emailObj, setEmailObj] = useState({ email: "" });
  const [forgotPassResponse, setForgotPassResponse] = useState({message:"",link:""});

  const notify = (str: string) => toast(str);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailObj((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!emailObj?.email) {
        notify("email field are required");
        return;
      }

      const { data } = await forgotPassword({ email: emailObj?.email });

      console.log("response.data", data);
      if (data.status === true) {
        notify(data?.message);
        setForgotPassResponse({message:data?.data?.message,link:data?.data?.link});
        // setTimeout(() => {
        //   navigate("/signin");
        // }, 1000);
      }
    } catch (error) {
      console.log(error, "error....");
      const { response } = error as {
        response: { data: { code: number; message: string } };
      };
      if (response?.data?.code === 404) {
        notify(response?.data?.message);
      } else {
        notify(response?.data?.message || "Unable to change passaword!");
      }
    }
  };

  return ( 
     <div className="flex flex-col justify-center mt-30 flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-purple-500 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email to recover your password!
            </p>
          </div>
          <form onSubmit={submitHandler}>
         
              <div className="space-y-5">
               
          
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      value={emailObj?.email}
                    onChange = {(e) => inputHandler(e)}
                      placeholder="Enter your password"
                      type={"email"}
                      
                    />
                  
                  
                  </div>
                </div>

              
               
               
               
                {/* <!-- Button --> */}
                <div>
                  <button type='submit' className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-purple-500 shadow-theme-xs hover:bg-purple-600">
                   Forgot Password
                  </button>
                </div>
              </div>
            </form>
           
        </div>

         {forgotPassResponse?.message && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {forgotPassResponse?.message}
                </p>
                <Link
                  to={forgotPassResponse?.link}
                  className="text-purple-500 hover:underline"
                >
                  Click here to reset your password
                </Link>
              </div>
            )}
      
    </div>
    );
};

export default ForgotPassword;
