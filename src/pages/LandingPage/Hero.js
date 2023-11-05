import React from "react";
import { Link } from "react-router-dom";
import ImageAssets from "../../images/imageAssets";

export default function Welcome() {
  return (
    <section role="heading" className="mb-40 mt-16">
      <ImageAssets />
      <div className="py-16 px-6 md:px-16 lg:px-32 mx-auto max-w-screen-xl text-center lg:py-32 animate-fade-up"> {/* Adjusted padding and margin */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
          Information Technology Asset Management System
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-6 md:px-16 lg:px-32"> {/* Adjusted padding */}
          Easily manage and track your organization's IT assets, from computers
          to printers. Keep track of asset details, generate reports, and plan
          for upgrades. Our user-friendly interface makes it easy to manage your
          assets efficiently. Start using our app today and take control of your
          IT assets!
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="inline-flex  shadow-lg shadow-purple-500/50 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-green-300  "
          >
            <Link to="/signup">Get started</Link>
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>

          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-100 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 shadow-lg shadow-purple-500/50 "
          >
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
