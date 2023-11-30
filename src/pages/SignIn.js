import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import frame from "../images/Frame.svg"
import logo from "../images/logoS.svg";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/index";
import { auth, firestore } from "../firebase/index";
import { useAuth } from "../context/AuthContext";
function SignIn({ setUserRole }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
  
      const userCredential = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;
  
      // Retrieve user document from Firestore based on the signed-in user's email
      const usersCollectionRef = collection(db, "Account");
      const q = query(usersCollectionRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Handle the user document data here
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
  
        // Determine the user role and navigate accordingly
        if (userData.role === "admin") {
          setUserRole("admin");
          // Additional logic for admins if needed
        } else {
          setUserRole("user");
          // Additional logic for users if needed
        }

      } else {
        setError("User data not found.");
      }
    } catch (error) {
      setError("Failed to login. Invalid email or password.");
    }
    setLoading(false);
  };
  
  return (
    <div className="flex justify-center items-center h-screen "  style={{ backgroundImage: `url(${frame})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-sm p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-12 w-auto" src={logo} alt="logo" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome Back!{" "}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              method="post"
              action="/Server"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    ref={emailRef}
                    // value={email}
                    // onChange={(event) => setEmail(event.target.value)}
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-2.5  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ref={passwordRef}
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md text-sm font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500"
                 
                >
                  Login
                </button>
              </div>
            </form>

            <div className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-purple-600 hover:text-blue-500"
              >
                Join us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
