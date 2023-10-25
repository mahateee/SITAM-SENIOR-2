import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import { useAuth } from "../context/AuthContext"; 
import "firebase/functions";
import { Link } from "react-router-dom";

const PreviousRequests = () => {
  const [assets, setAssets] = useState([]);
  const { currentUser } = useAuth();
  const [originalAssets, setOriginalAssets] = useState([]); // Store original data
  
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          if (!currentUser || !currentUser.uid) {
            console.error("Current user or user ID is undefined.");
            return;
          }
  
          console.log("Fetching requests for user ID:", currentUser.uid);
  
          // Fetch requests
          const requestsQuery = query(
            collection(db, "request"),
            where("userid", "==", currentUser.uid)
          );
  
          const requestsSnapshot = await getDocs(requestsQuery);
          const requestsData = requestsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          console.log("Fetched requests:", requestsData);
  
          setAssets(requestsData);
          setOriginalAssets(requestsData); // Store original data
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      };
  
      fetchRequests();
    }, [currentUser]);

    
  const [searchText, setSearchText] = useState("");
  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const filterData = (value) => {
    if (value === "") {
      setAssets(originalAssets); // Reset to the original data when the search is cleared
    } else {
      const filteredData = originalAssets.filter((asset) => {
        return Object.values(asset)
          .join(" ")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setAssets(filteredData);
    }
  };

  return (
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
      {/* <!-- Card header --> */}
      <div class="items-center justify-between lg:flex">
        <div class="mb-4 lg:mb-0">
          <h3 class="mb-2 text-xl font-bold text-gray-900">Assets Requests</h3>
          <span class="text-base font-normal text-gray-500 ">
            List of Latest Request.
          </span>
        </div>

        <div className="items-center sm:flex">
        <div className="flex-grow pr-10"> {/* Use flex-grow to expand the search input */}
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full pl-10 p-2"
                      placeholder="Search"
                      value={searchText}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                </form>
              </div>

          <div className="">
            <Link
              to="/newRequest"
              className="flex items-center justify-center bg-teal-700 hover:bg-teal-700 focus:ring-4 focus:ring-teal-800 text-white font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none"
            >
              <svg
                className="h-7 w-7 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              New Request
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- Table --> */}
      <div class="flex flex-col mt-6">
      <div className="overflow-y-auto" style={{ maxHeight: '640px' }}>
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden shadow sm:rounded-lg">
            
              <table class="min-w-full divide-y divide-gray-200 ">
                <thead class="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase text-center"
                    >
                      Transaction
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase text-center"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase text-center"
                    >
                      Asset Brand
                    </th>

                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase text-center"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase text-center"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white ">
                  {assets.map((asset, id) => (
                    <tr key={id}>
                      <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap text-center">
                        Request a{" "}
                        <span class="font-semibold">{asset.type}</span>
                      </td>
                      <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
                        {/* {asset.date} */}
                      </td>
                      <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowr text-center">
                        {asset.brand}
                      </td>
                      <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
                        {asset.system}
                      </td>

                      <td class="p-4 whitespace-nowrap text-center">
                      <span className="ml-auto text-gray-900">
                      {(!asset.status || asset.status === "Waiting") ? (
    <span className="bg-violet-100 text-violet-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      Waiting
    </span>
  ) : null}
  {(!asset.status || asset.status === "Pending") ? (
    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      Pending
    </span>
  ) : null}
  {asset.status === "Completed" ? (
    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      Completed
    </span>
  ) : null}
  {asset.status === "Canceled" ? (
    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      Canceled
    </span>
  ) : null}
  {asset.status === "In Progress" ? (
    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
      In Progress
    </span>
  ) : null}
</span>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default PreviousRequests;
