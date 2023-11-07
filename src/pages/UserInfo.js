import { PaperClipIcon } from "@heroicons/react/20/solid";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { firestore } from "../firebase/index";
import { useState } from "react";
import AccountAlerts from "../component/AccountAlerts";
import { useNavigate } from 'react-router-dom';
import frame from "../images/InsideFrame.svg";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/index";
export default function UserInfo() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    department: "",
    email: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(!open);
  };
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
            name: userData.name,
            lastname: userData.lastname,
            department: userData.department,
            email: userData.email,
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

  const navigate = useNavigate();
  const [showAccountAlert, setShowUsertAlert] = useState(false); // State for displaying the alert
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        await updateDoc(userRef, {
          name: formData.name,
          lastname: formData.lastname,
          department: formData.department,
          email: formData.email,
          profileImage: formData.profileImage,
        });
        console.log("Document successfully updated!");
        setShowUsertAlert(true);
        // Navigate away and clear the alert after a delay 
        setTimeout(() => {
          navigate('/userinfo');
          setShowUsertAlert(false);
        }, 10000);
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="flex items-center justify-center h-screen" style={{ backgroundImage: `url(${frame})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
        {showAccountAlert && (
          <div style={{ position: 'absolute', top: '90px', right: '10px' }}>
            <AccountAlerts />
          </div>
        )}
        <div className="p-6 bg-white border rounded-lg shadow-xl w-[80%]" style={{ height: '82vh' }}>
          <div class="mb-4 lg:mb-0  flex justify-between pb-4 mb-4 rounded-t border-b-2 sm:mb-5">
            <div>
              <h1 class="mb-2 text-3xl font-bold text-gray-900">Account Settings 👤 </h1>
              <span class="text-base font-normal text-gray-500">
                View and Edit Your Account Information.
              </span>
            </div>
            <button
              onClick={handleOpen}
              type="button"
              class="inline-flex items-center text-blue-500 bg-white-700 rounded-lg hover:bg-white-800 font-medium text-lg px-5 py-2.5 text-center"
            >
              <svg
                aria-hidden="true"
                class="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                <path
                  fill-rule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Edit
            </button>
          </div>
          <div className="flex items-center mt-8">
            <div className="relative w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark-bg-gray-600 mr-8 ml-12">
              <img
                src={formData.profileImage}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className=" p-6 w-[80%] border-gray-200">
            <dl className="divide-y divide-gray-100">
              <form onSubmit={handleSubmit}>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" >
                  <dt className="text-lg font-medium leading-6 text-gray-900 pr-6">
                    Full Name
                  </dt>
                  <dd className=" flex space-x-4 mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {open ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Enter your name"
                          required
                          onChange={handleChange}
                          value={formData.name}
                        />
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Enter your lastname"
                          required
                          onChange={handleChange}
                          value={formData.lastname}
                        />
                      </>
                    ) : (
                      formData && formData.name + " " + formData.lastname
                    )}
                  </dd>
                  {open && (
                    <>
                      <dt className="text-lg font-medium leading-6 text-gray-900 pr-6">
                        Profile Image URL
                      </dt>
                      <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          type="text"
                          name="profileImage"
                          id="profileImage"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Enter profile image URL"
                          onChange={handleChange}
                          value={formData.profileImage}
                        />
                      </dd>
                    </>
                  )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-medium leading-6 text-gray-900 pr-6">
                    Department
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {open ? (
                      <div>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                        >
                          <option value="">Select Category</option>
                          <option value="HR">HR</option>
                          <option value="FIN">FIN</option>
                        </select>
                      </div>
                    ) : (
                      formData && formData.department
                    )}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-medium leading-6 text-gray-900 pr-6">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {open ? (
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your email address"
                        required
                        onChange={handleChange}
                        value={formData.email}
                      />
                    ) : (
                      formData && formData.email
                    )}
                  </dd>
                </div>
                {open ? (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleOpen}
                      class=" inline-flex ml-6 items-center text-black  rounded-lg font-medium text-md px-14 py-2 text-center font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500 "
                    >
                      Done
                    </button>
                    <button
                      type="submit"
                      class="inline-flex mr-6 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-purple-500 "
                    >
                      Save Changes
                    </button>
                  </div>
                ) : null}
              </form>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
