import React from 'react'
import { useNavigate } from 'react-router'

const Cancel = () => {

 
  const Navigate = useNavigate();
  return (
    <div className="bg-gray-100 h-screen">
    <div className="bg-white p-6 md:mx-auto">
      
      <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
        <path fill="currentColor"
          d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm4.95 16.536a1 1 0 0 1-1.414 1.414L12 13.414l-3.536 3.536a1 1 0 0 1-1.414-1.414L10.586 12 7.05 8.464a1 1 0 0 1 1.414-1.414L12 10.586l3.536-3.536a1 1 0 0 1 1.414 1.414L13.414 12l3.536 3.536z">
        </path>
      </svg>
  
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed</h3>
        <p className="text-gray-600 my-2">Unfortunately, your payment was not successful.</p>
        <p>Please try again or contact support if the issue persists.</p>
        <div className="py-10 text-center">
          <button onClick={()=>Navigate("/subscription")} className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
            TRY AGAIN
          </button>
        </div>
      </div>
  
    </div>
  </div>
  
  )
}

export default Cancel
