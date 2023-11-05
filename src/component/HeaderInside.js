import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiSettings } from "react-icons/fi";
import logo from "../images/logoS.svg";

export default function HeaderInside() {
  return (
    <nav className="bg-gray-100 fixed w-full z-20 top-0 left-0 border-b border-gray-200 opacity-75">
      <div className="max-w-screen-xl relative mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="SITAM Logo" />
        </Link>
   
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
          {/* React Icons for Account and Settings */}
          <Link to="/account" className="text-gray-600">
            <FiUser className="h-6 w-6" />
          </Link>
          <Link to="/settings" className="text-gray-600">
            <FiSettings className="h-6 w-6" />
          </Link>
      </div>
    </nav>
  );
}
