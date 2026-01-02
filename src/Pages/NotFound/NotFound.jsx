import React from "react";
import { useNavigate } from "react-router";
import logo from "/Web Development/Programming Hero/Assignments/B12A10/shipsync-client-side/src/assets/ship-wreck-icon-cartoon-vector-600nw-2266051349.webp"

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Go to home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4">
      <div className="text-center p-8 bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg border border-base-300">
        <div className="mb-6">
          <h1 className="text-8xl font-black bg-gradient-to-r from-info via-accent to-error bg-clip-text text-transparent">
            404
          </h1>
          <p className="mt-4 text-2xl font-bold text-base-content">
            Oops! Page Not Found
          </p>
          <p className="mt-2 text-base-content/70">
            The page you're looking for seems to have sailed away.
          </p>
        </div>
        
        <div className="my-8">
          <img
            src={logo} 
            alt="ShipSync 404"
            className="mx-auto h-48 object-contain"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleGoBack}
            className="btn btn-outline btn-info btn-lg flex-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="btn btn-info btn-lg flex-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-base-200 rounded-lg">
          <p className="text-sm text-base-content/60">
            Need help? Contact our support or browse our popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            <a href="/products" className="text-info hover:text-info/80 text-sm font-medium">Products</a>
            <a href="/export" className="text-info hover:text-info/80 text-sm font-medium">Export</a>
            <a href="/import" className="text-info hover:text-info/80 text-sm font-medium">Import</a>
            <a href="/dashboard" className="text-info hover:text-info/80 text-sm font-medium">Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;