import { PaperClipIcon } from "@heroicons/react/20/solid";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { firestore } from "../firebase/index";
import { useState } from "react";
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
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(!open);
    // After handling the edit, hide the button
    // setIsEditVisible(false);
  };
  const { currentUser, logout } = useAuth();
  const userRef = doc(db, "Account", currentUser.uid);
  // const [isEditVisible, setIsEditVisible] = useState(true);

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
        });
        
        console.log("Document successfully updated!");
        
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
      <div className="mx-auto max-w-screen-md">

      <div className="flex items-center mx-auto max-w-screen-md px-4 sm:px-0">
  <div class="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark-bg-gray-600 mr-5">
    <svg
      className="absolute inset-0 w-full h-full text-gray-400 top-1.5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      ></path>
    </svg>
  </div>
  <div>
    <h3 className="text-base font-semibold leading-7 text-gray-900">
      Account
      {/* {userData} */}
    </h3>
    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      Personal details.
    </p>
  </div>
  {/* {isEditVisible && ( */}
  <div className="ml-auto"> {/* Use ml-auto to push the button to the right */}
    <button
      onClick={handleOpen}
      type="button"
      class="inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 font-medium text-sm px-5 py-2.5 text-center"
    >
      <svg
        aria-hidden="true"
        class="mr-1 -ml-1 w-5 h-5"
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
    {/* )} */}
</div>




        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className=" flex space-x-4 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {open ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your name"
                        required
                        onChange={handleChange}
                        value={formData.name}
                      />
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Department
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {open ? (
                    <div>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                      >
                        <option value="">Select category</option>
                        <option value="HR">HR</option>
                        <option value="FIN">FIN</option>
                      </select>
                    </div>
                  ) : (
                    formData && formData.department
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {open ? (
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter your email"
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
                <button
                  type="submit"
                  class=" inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 font-medium text-sm px-5 py-2.5 text-center "
                >
                  save
                </button>
              ) : null}
            </form>
          </dl>
        </div>
      </div>
    </div>
  );
}
