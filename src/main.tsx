import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router";
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { FallbackProps } from 'react-error-boundary';


let pathName = window.location.pathname;

// const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
//   <div>
//     <h1>Something went wrong!</h1>
//     <p>{error.message}</p>
//     <button onClick={resetErrorBoundary}>Try Again</button>
//   </div>
// );

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-4">
          We're sorry for the inconvenience. Please try again.
        </p>

        {/* Show error message in development only */}
     
          <pre className="bg-gray-100 text-red-600 text-sm p-2 rounded mb-4 overflow-x-auto">
            {error.message}
          </pre>
     

        <button
          onClick={resetErrorBoundary}
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};


if (pathName === "/" || pathName === undefined) {
  pathName = "/dashboard";
  // console.log("Path Index2", pathName);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
    <ToastContainer />
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <ThemeProvider>
          <AppWrapper>
            <Router>
              {/* <App pathName ={pathName}/> */}
              <App />
            </Router>
          </AppWrapper>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
  
);
