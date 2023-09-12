import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo3-1(2).png";
export default function Header() {
  return (
    <nav class="bg-gray-100 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a class="flex items-center">
          <img src={logo} class="h-8 mr-3" alt="SITAM Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap">
            SITAM
          </span>
        </a>
        <div class="flex md:order-2">
          <button
            role="button"
            type="button"
            class=" text-gray-900 hover:text-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3   "
          >
            <Link to="/signin">Sign in</Link>
          </button>
          <button
            type="button"
            class="text-white bg-teal-600 hover:bg-teal-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
          >
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-100">
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0 md:dark:text-teal-600"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:p-0"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
