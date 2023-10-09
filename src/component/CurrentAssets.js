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
import { useAuth } from "../context/AuthContext"; // Update the path as needed
import "firebase/functions";

const AssetsTable = () => {
  const [assets, setAssets] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (!currentUser || !currentUser.uid) {
          console.error("Current user or user ID is undefined.");
          return;
        }

        console.log("Fetching assets for user ID:", currentUser.uid);

        // Fetch assets
        const assetsQuery = query(
          collection(db, "asset"),
          where("employeeId", "==", currentUser.uid)
        );

        const assetsSnapshot = await getDocs(assetsQuery);
        const assetsData = assetsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched assets:", assetsData);

        // Fetch employer name from the Account table
        const accountDocRef = doc(db, "Account", currentUser.uid);
        const accountDocSnapshot = await getDoc(accountDocRef);
        const employerName = accountDocSnapshot.exists()
          ? accountDocSnapshot.data().employerName
          : "Unknown Employer";

        console.log("Employer Name:", employerName);

        setAssets(assetsData.map((asset) => ({ ...asset, employerName })));
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [currentUser]);

  return (
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6">
      {/* <!-- Card header --> */}
      <div class="items-center justify-between lg:flex">
        <div class="mb-4 lg:mb-0">
          <h3 class="mb-2 text-xl font-bold text-gray-900">Assets</h3>
          <span class="text-base font-normal text-gray-500 ">
            This is a list of Assets
          </span>
        </div>
        <div class="items-center sm:flex">
          <div class="flex items-center">
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              class="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5"
              type="button"
            >
              Filter by status
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdown"
              class="z-10 hidden w-56 p-3 bg-white rounded-lg shadow"
            >
              <h6 class="mb-3 text-sm font-medium text-gray-900 ">Category</h6>
              <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                <li class="flex items-center">
                  <input
                    id="apple"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                  />

                  <label
                    for="apple"
                    class="ml-2 text-sm font-medium text-gray-900 "
                  >
                    Completed (56)
                  </label>
                </li>

                <li class="flex items-center">
                  <input
                    id="fitbit"
                    type="checkbox"
                    value=""
                    checked
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                  />

                  <label
                    for="fitbit"
                    class="ml-2 text-sm font-medium text-gray-900 "
                  >
                    Cancelled (56)
                  </label>
                </li>

                <li class="flex items-center">
                  <input
                    id="dell"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                  />

                  <label
                    for="dell"
                    class="ml-2 text-sm font-medium text-gray-900 "
                  >
                    In progress (56)
                  </label>
                </li>

                <li class="flex items-center">
                  <input
                    id="asus"
                    type="checkbox"
                    value=""
                    checked
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                  />

                  <label
                    for="asus"
                    class="ml-2 text-sm font-medium text-gray-900 "
                  >
                    In review (97)
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Table --> */}
      <div class="flex flex-col mt-6">
        <div class="overflow-x-auto rounded-lg">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 ">
                <thead class="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                    >
                      Transaction
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                    >
                      Brand
                    </th>

                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                    >
                      os
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white ">
                  {assets.map((asset, id) => (
                    <tr key={id}>
                      <td class="p-4 text-sm font-normal text-gray-900 whitespace-nowrap ">
                        Request a {asset.name}
                      </td>
                      <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap ">
                        {asset.Category}
                      </td>
                      <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowr">
                        {asset.Brand}
                      </td>

                      <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap ">
                        {asset.os}
                      </td>
                      <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap ">
                        <button
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
                        >
                          Return
                        </button>
                        <button
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
                        >
                          Maintenance
                        </button>
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
    // <div className="relative overflow-x-auto">
    //   <div className="flex flex-col items-center justify-center py-8">
    //   <table className="text-sm text-left text-gray-500">
    //       <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    //         <tr>
    //           <th scope="col" className="px-6 py-3">
    //             Current Asset
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Operating system
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Action
    //           </th>
    //           {/* Add more headers as needed */}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {assets.map((asset) => (
    //           <tr key={asset.id} className="bg-white border-b">
    //             <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
    //               {asset.name}
    //             </td>
    //             <td className="px-6 py-4">{asset.os}</td>
    //             <td className="px-6 py-4">
    //               <button   className="bg-white-500 hover:bg-gray-50 text-gray-700 font-bold py-1 px-2 mr-2 border border-gray-500 rounded">
    //                 Request Return
    //               </button>
    //               <button className="bg-white-500 hover:bg-gray-50 text-gray-700 font-bold py-1 px-2 border border-gray-500 rounded">
    //                 Request Maintenance
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default AssetsTable;
