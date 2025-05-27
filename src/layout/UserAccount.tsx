import  { useContext } from 'react'
import UserInfoCard from '../components/UserProfile/UserInfoCard'
import UserAddressCard from '../components/UserProfile/UserAddressCard'
import { AuthContext } from '../context/AuthContext';
import UserSubscription from '../components/UserProfile/UserSubscription';

const UserAccount = () => {

      const authContext = useContext(AuthContext);
    
        if (!authContext) {
          throw new Error("AuthContext must be used within an AuthProvider");
        }
    
        const {  currentUser  } = authContext
    
        console.log(currentUser,"=====>currentuser")
  return (
    <div> 

        {/* <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">User Account</h1>
            <p className="text-gray-700">This is the user account page.</p>
        </div> */}

         <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                  Profile
                </h3>
                <div className="space-y-6">
              
                  <UserInfoCard isUserAccount ={true} currentUser={currentUser} />
                  <UserAddressCard currentUser={currentUser} />
                  <UserSubscription />
                </div>
              </div>
         
    </div>
  )
}

export default UserAccount
