import { useState } from 'react'
import {  EyeCloseIcon, EyeIcon } from "../../icons";
import {  toast } from "react-toastify";
import Label from "../form/Label";
import Input from "../form/input/InputField";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {  useNavigate, useParams } from "react-router";
import {hitChangePassword} from "../../service/user.service";



const ChangePassword = () => {

  const navigate = useNavigate();
  const { token } = useParams();
  console.log("Token", token);


    const [showPassword, setShowPassword] = useState(false);
    const [passwordObj, setPasswordObj] = useState({password:"",rePassword:""});

    const notify = (str: string) => toast(str);
    
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordObj((prev) => ({ ...prev, [name]: value }));
   }

const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    
    try {

        if(!passwordObj?.password) {   
          notify("Password field are required");
            return;
        };
        if(!passwordObj?.rePassword) {   
          notify(" Confirm password field are required");
          return;
      };



        if (passwordObj.rePassword === passwordObj.password) {
         const {data} = await hitChangePassword({ password: passwordObj.password, token: token as string })
           
              console.log("response.data", data);
              if (data.status === true) {
                notify("your password has been successfully changed");
                setTimeout(() => {
                  navigate("/signin");
                }, 1000);
               
              } else {
                if (data.code === 200) {
                  notify(data?.message);
                  return;
                }
                notify("Unable to change passaword!");
              }
         
           
        } else {
          notify(" Both password should be match");
        }
      
      
       
      }
        
     catch (error) {

        console.log(error,"error....");
        const { response } = error as { response: { data: { code: number, message: string } } };
        if(response?.data?.code === 404){
          notify(response?.data?.message);
        }else{
          notify( response?.data?.message || "Unable to change passaword!");
        }
    }
 };

    
  return (
    <div className="flex flex-col justify-center mt-40 flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-purple-500 text-title-sm dark:text-white/90 sm:text-title-md">
              Change Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your password to change password!
            </p>
          </div>
          <form onSubmit={submitHandler}>
         
              <div className="space-y-5">
               
          
                <div>
                  <Label style={{color:"#6b00ad"}}>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      value={passwordObj.password}
                    onChange = {(e) => inputHandler(e)}
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Label style={{color:"#6b00ad"}}>
                   Confirm Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                    name='rePassword'
                      id="password"
                       value={passwordObj.rePassword}
                    onChange = {(e) => inputHandler(e)}
                      placeholder="Enter your confirm password"
                      type={showPassword ? "text" : "password"}
                      
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
               
               
               
                {/* <!-- Button --> */}
                <div>
                  <button type='submit' className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-purple-500 shadow-theme-xs hover:bg-purple-600">
                   Change Password & login
                  </button>
                </div>
              </div>
            </form>
        </div>
      
    </div>
  )
}

export default ChangePassword
