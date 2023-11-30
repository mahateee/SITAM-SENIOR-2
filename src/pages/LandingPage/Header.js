import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoS.svg";
export default function Header() {
  return (
    <nav class="bg-transparent fixed w-full z-20 top-0 left-0  ">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        <a class="flex items-center">
          <img src={logo} class="h-10 mr-4" alt="SITAM Logo" />
  
        </a>
        <div class="flex md:order-2">
          <button
            role="button"
            type="button"
            class="text-sm font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500
            mr-3"
          >
            <Link to="/signin">Sign in</Link>
          </button>
          <button
            type="button"
            class="text-sm font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500"
          >
            
            <Link to="/signup">Join Us </Link>
            <span aria-hidden="true">&rarr;</span>
    
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
         
        </div>
      </div>
    </nav>
  );
}
