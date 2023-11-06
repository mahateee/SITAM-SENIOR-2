import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../images/logoS.svg";
import { useEffect } from "react";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../firebase/index";
import { useAuth } from "../context/AuthContext";

function AdminSidebar({ children }) {

  const [formData, setFormData] = useState({
    profileImage: "",
  });
  const { currentUser, logout } = useAuth();
  const userRef = doc(db, "Account", currentUser.uid);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(userData);
          setFormData((prevFormData) => ({
            ...prevFormData,

            profileImage: userData.profileImage,
          }));
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [currentUser.uid]);

  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const [isPagesActive, setIsPagesActive] = useState(false); // State to track the active state of "Pages" button

  const handlePagesClick = () => {
    setIsPagesActive(!isPagesActive);
  };
  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              {/* <button onClick={toggleSidebar}>button</button> */}
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" class="flex ml-2 md:mr-24">
                {/* <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 mr-3"
                  alt="FlowBite Logo"
                /> */}
                <img src={logo} className="h-8 mr-3" alt="SITAM Logo" />
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                  SITAM
                </span>
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
                    aria-expanded={isUserDropdownOpen}
                    data-dropdown-toggle="dropdown-user"
                    onClick={toggleUserDropdown}
                  >
                    <span class="sr-only">Open user menu</span>
                    <div class="relative w-8 h-8 overflow-hidden bg-gray-200 rounded-full dark-bg-gray-600 ">
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </button>
                </div>
                <div
                  style={{
                    flexDirection: "column-reverse",
                    position: "absolute",
                    bottom: "-82px", // Adjust this value to move the dropdown up or down.
                    right: "0",
                  }}
                  class={` ${isUserDropdownOpen ? "block" : "hidden"
                    } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
                  id="dropdown-user"
                >
                  <ul class="py-1" role="none">
                    <li>
                      <Link to="/adminAccount">
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                          role="menuitem"
                        >
                          Account
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Log out
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <button onClick={toggleSidebar}>button</button>
      <aside>
        <div
          className={`fixed left-0 px-4 top-0 drop-shadow-2xl h-screen w-64  pt-20 bg-white z-40 text-white transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <ul class="space-y-2 text-gray-900 py-4 font-medium">
            <li>
              <Link to="/adminAccount">
                <a
                  href="#"
                  class="flex items-center p-2  rounded-lg hover:bg-gray-100"
                >
                  <svg
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  <span class="ml-3">Account</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/employeelist">
                <a
                  href="#"
                  class="flex items-center p-2  rounded-lg hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-500 hover:text-gray-900 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="ml-3">Employees</span>
                </a>
              </Link>
            </li>
            {/* Pages button with active class based on isPagesActive state */}
            <li>
              <button
                type="button"
                className={`flex items-center  p-2 w-full text-base rounded-lg transition duration-75 group hover:bg-gray-100 ${isPagesActive ? "bg-gray-200 " : ""
                  }`}
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
                onClick={handlePagesClick}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <svg
                      aria-hidden="true"
                      className={`w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75`}
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
                    <span className={`ml-3 text-left whitespace-nowrap`}>
                      Management
                    </span>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition duration-75 transform rotate-0`}
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
                className={`py-2 space-y-2 text-gray-900 ${isPagesActive ? "block" : "hidden"
                  }`}
              >
                <li>
                  <Link to="/Asset">
                    <a
                      href="#"
                      className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${isPagesActive
                          ? "hover:bg-gray-100 "
                          : "hover:bg-gray-100 "
                        }`}
                    >
                      Assets
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/requestPage">
                    {/* Replace "/settings" with your desired URL */}
                    <a
                      className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100`}
                    >
                      Requests
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/returnPage">
                    <a
                      href="#"
                      className={`flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100`}
                    >
                      Returns
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/maintenancePage">
                <a
                  href="#"
                  class="flex items-center p-2  rounded-lg hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 20"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-gray-500 hover:text-gray-900"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="ml-3">Maintenance</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/dashboardPage">
                <div
                  href="#"
                  class="flex items-center p-2  rounded-lg hover:bg-gray-100"
                >
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6  transition duration-75 text-gray-500 hover:text-gray-900 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span class="ml-3">Dashboard</span>
                </div>
              </Link>
            </li>
          </ul>
          {/* Additional sections in the sidebar */}
          <ul className="pt-4 mt-4 space-y-2  text-gray-900 font-medium border-t border-gray-200 light:border-gray-700">
            <li>
              <Link to="/">
                <a
                  href="#"
                  className="flex items-center p-2  rounded-lg hover:bg-gray-100"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75 group-hover:text-gray-900"
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
                  <span className="ml-3">Log out</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div class="p-4 sm:ml-64">{children}</div>
    </>
  );
}

export default AdminSidebar;
