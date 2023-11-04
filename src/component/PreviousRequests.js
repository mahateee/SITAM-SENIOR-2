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

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const statuses = ["Waiting", "Pending", "Completed", "Canceled", "In Progress"];
  const handleStatusChange = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((c) => c !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, statuses]);
    }
  };
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
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
          <div className="flex-grow pr-10">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500"
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
              className="flex items-center justify-center  bg-teal-700  text-white hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                ></path>
              </svg>
              New Request
            </Link>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto mr-4 ml-10">
            <div class="">
              <button
                onClick={handleOpenFilter}
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                class="flex   items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="w-4 h-4 mr-2 text-gray-400"
                  viewbox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Filter
                <svg
                  class="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
              {openFilter && (
                <div
                  id="filterDropdown"
                  class="  z-10 absolute mt-14 top-22 right-28 w-40 p-3 bg-white rounded-lg shadow"
                >
                  <h6 class="mb-3 text-sm font-medium text-gray-900 ">
                    Status
                  </h6>
                  <ul
                    class="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    {statuses.map((statuss) => (
                      <li class="flex items-center">
                        <label
                          class="ml-2 text-sm font-medium text-gray-900"
                          key={statuss}
                        >
                          <input
                            type="checkbox"
                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                            checked={selectedStatuses.includes(
                              statuss
                            )}
                            onChange={() =>
                              handleStatusChange(statuss)
                            }
                          />
                          {statuss}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
                      Desired Date
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
                      Status
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase text-center"
                    >
                      Description
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
                      <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
                        {asset.system}
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
