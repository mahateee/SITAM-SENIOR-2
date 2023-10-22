import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isPagesActive, setIsPagesActive] = useState(false); // State to track the active state of "Pages" button

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handlePagesClick = () => {
    setIsPagesActive(!isPagesActive);
  };

  return (
    <div className="h-screen fixed z-50 flex">
      <div
        className={`bg-teal-800 text-white w-64 ${
          collapsed ? "hidden" : "block"
        } transition-all duration-300`}
      >
        <div className="p-4">
          <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-teal-800">
              <ul className="space-y-2 font-medium">
                <li>
                  <Link to="/adminAccount">
                    <a
                      href="#"
                      class="flex items-center p-2 rounded-lg hover:bg-teal-700"
                    >
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-teal-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                      </svg>
                      <span class="ml-3">Account</span>
                    </a>
                  </Link>
                </li>
                {/* Pages button with active class based on isPagesActive state */}
                <li>
                  <button
                    type="button"
                    className={`flex items-center p-2 w-full text-base rounded-lg transition duration-75 group hover:bg-teal-700 ${
                      isPagesActive
                        ? "bg-teal-700 dark:bg-teal-700 dark:text-white"
                        : ""
                    }`}
                    aria-controls="dropdown-pages"
                    data-collapse-toggle="dropdown-pages"
                    onClick={handlePagesClick}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <svg
                          aria-hidden="true"
                          className={`w-6 h-6 text-teal-500 transition duration-75 ${
                            isPagesActive ? "dark:text-white" : ""
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span
                          className={`ml-3 text-left whitespace-nowrap ${
                            isPagesActive ? "text-white" : "text-white-900"
                          }`}
                        >
                          Assets
                        </span>
                      </div>
                      <svg
                        className={`w-6 h-6 text-gray-400 transition duration-75 transform rotate-0 ${
                          isPagesActive ? "dark:text-white" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </button>

                  {/* Dropdown menu */}
                  <ul
                    id="dropdown-pages"
                    className={`py-2 space-y-2 ${
                      isPagesActive ? "block" : "hidden"
                    }`}
                  >
                    <li>
                      <Link to="/requestPage">
                        {/* Replace "/settings" with your desired URL */}
                        <a
                          className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${
                            isPagesActive
                              ? "hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700"
                              : "hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700"
                          }`}
                        >
                          Requests
                        </a>
                      </Link>
                    </li>

                    <li>
                      <a
                        href="#"
                        className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${
                          isPagesActive
                            ? "hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700"
                            : "hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700"
                        }`}
                      >
                        Returns
                      </a>
                    </li>
                    <li>
                      <Link to="/Asset">
                        <a
                          href="#"
                          className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${
                            isPagesActive
                              ? "hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700"
                              : "hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700"
                          }`}
                        >
                          Asset
                        </a>
                      </Link>
                    </li>
                    {/* <li>
      <a
        href="#"
        className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${
          isPagesActive ? 'hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700' : 'hover:bg-teal-700 dark:text-white dark:hover:bg-teal-700'
        }`}
      >
        Nothing
      </a>
    </li> */}
                  </ul>
                </li>

                <li>
                  <Link to="/maintenancePage">
                  <a
                    href="#"
                    class="flex items-center p-2 rounded-lg hover:bg-teal-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 w-6 h-6 text-teal-500 transition duration-75  group-hover:text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="ml-3">Maintenance</span>
                  </a>
                  </Link>
                </li>
              
              </ul>

              {/* Additional sections in the sidebar */}
              <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 light:border-gray-700">
                <li>
                  <Link to="/">
                    <a
                      href="#"
                      className="flex items-center p-2 rounded-lg hover:bg-teal-700"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-teal-500 transition duration-75 group-hover:text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="ml-3">log out</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <div className="flex-1 bg-teal-800 p-4">
        <button
          className="text-white p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleSidebar}
        >
          {collapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
