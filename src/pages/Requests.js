import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/HeaderInside";
import Footer from "../component/Footer";

function Requests() {
  return (
    <div className="xs:bg-gray-50 white:bg-gray-900 relative flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        <div className="mx-auto max-w-screen-xl px-4 lg:px-12 flex flex-col md:flex-row w-1/2">
          <div className="absolute bottom-20 right-4">
            <Link
              to="/newRequest"
              className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 text-white font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none"
            >
              <svg
                className="h-7 w-7 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              New Request
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Requests;
