import React from 'react'
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
 <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200 px-4">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
      <h1 className="text-2xl font-semibold text-purple-600 mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-700 mb-6">{error?.message || "Error occurs"}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition duration-300"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorFallback
