import ReactDOM from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import logo from "../images/logoS.svg";
import frame from "../images/Frame.svg"
 import EmailVerficationPage from "./EmailVerficationPage";
import { useAuth } from "../context/AuthContext";
// import axios from "axios";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "../firebase/index";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {

  const navigate = useNavigate();
  const { signup, sendEmailVerificationLink } = useAuth();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const emailRef = useRef();
  const phoneNumRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const { user } = await signup(
        // phoneNumRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        await sendEmailVerificationLink(emailRef.current.value),
      );
      const userId = user.uid; // Get the user's UID from the signup response
      console.log(userId);
      navigate("/emailPage");
      try {
        const docRef = await setDoc(doc(db, "Account", userId), {
          name: name,
          lastname: lastname,
       phoneNumber: phoneNumRef.current.value,
          email: emailRef.current.value,
          role: "user",
          department: "",
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen " style={{ backgroundImage: `url(${frame})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-sm p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          method="post"
          action="/Server"
        >
          <img className="mx-auto h-12 w-auto" src={logo} alt="logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to SITAM{" "}
          </h2>

          {error && <p className="text-red-600">{error}</p>}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your first name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your last name"
              required
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>
         <div>
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="phonenumber"
              id="phonenumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="000 000 0000"
              required
              ref={phoneNumRef}
            />
          </div> 
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email Address<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="name@company.com"
              required
              ref={emailRef}
            // value={email}
            // onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              ref={passwordRef}
            // value={password}
            // onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password-confirmation"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password-confirmation"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              ref={passwordConfirmRef}
            // value={password}
            // onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            onSubmit={handleSubmit}
            className="flex w-full justify-center rounded-md text-sm font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500"
          >
            Sign up
          </button>
        </form>
        <div className="mt-10 text-center text-sm text-gray-500">
          Already using SITAM?{" "}
          <Link
            to="/signin"
            className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
