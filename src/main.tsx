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

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div>
    <h1>Something went wrong!</h1>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

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
