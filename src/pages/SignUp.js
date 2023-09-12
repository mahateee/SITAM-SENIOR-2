import ReactDOM from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "./logo3-1(2).png";
// import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/Asset");

    // try {
    //   // Send a POST request to the server with the form data
    //   const response = await axios.post('/SignUp', {
    //     name,
    //     email,
    //     password
    //   });

    //   if (response.status === 200) {
    //     // Navigate to the asset page if the POST request was successful
    //     navigate('/Asset');
    //   } else {
    //     // Set the error state if the POST request failed
    //     setError(response.data.message);
    //   }
    // } catch (error) {
    //   // Set the error state if therewas a problem sending the POST request
    //   setError(error.message);
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="name@company.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            onSubmit={handleSubmit}
            className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Sign up
          </button>
        </form>
        <div className="mt-10 text-center text-sm text-gray-500">
          Already using SITAM?{" "}
          <Link
            to="/signin"
            className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
