import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
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
  const updateAssetStatus = async (assetKey) => {
    const assetDocRef = doc(db, "asset", assetKey);
    await updateDoc(assetDocRef, { Status: "Return" });
  };

  const navigate = useNavigate();
  const handleReturn = async (assetKey, index) => {
    try {
      // Update the status in Firestore
      await updateAssetStatus(assetKey);

      // Create a copy of the assets array
      const updatedAssets = [...assets];
      // Update the status of the asset to "Return"
      updatedAssets[index].Status = "Return";
      // Update the state with the updated assets
      setAssets(updatedAssets);
      // Set showSuccessAlert to true and navigate to Request page
      navigate('/personalassets', { state: { showReturnAlert: true } });
      
    } catch (error) {
      console.log("Error updating asset status:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ flex: 1, maxWidth: '90%' }} class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6">
      {/* <!-- Card header --> */}
      <div class="items-center justify-between lg:flex">
        <div class="mb-4 lg:mb-0">
          <h3 class="mb-2 text-xl font-bold text-gray-900">Current Assets </h3>
          <span class="text-base font-normal text-gray-500 ">
            A List of Current Assets.
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
              Filter by Category
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
                      class="p-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase "
                    >
                      Asset Name
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase "
                    >
                      Asset Category
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase "
                    >
                      Asset Brand
                    </th>

                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase "
                    >
                      Operating System
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white ">
                  {assets.map((asset, id) => (
                    <tr key={id}>
                      <td class="p-4 text-sm font-normal text-center text-gray-900 whitespace-nowrap ">
                       {asset.name}
                      </td>
                      <td class="p-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap ">
                        {asset.Category}
                      </td>
                      <td class="p-4 text-sm font-semibold text-center text-gray-900 whitespace-nowr">
                        {asset.Brand}
                      </td>

                      <td class="p-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap ">
                        {asset.os}
                      </td>
                      <td class="p-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap " style={{ width: '135px' }}>
                        <button
                          onClick={() => handleReturn(asset.id, id)}
                          type="button"
                          className="text-white bg-indigo-800 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-6 mb-2 focus:outline-none">
                          Return
                        </button>
                        <Link
                          to={`/Request/Maintenance/${asset.id}`}
                          className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-6 mb-2 focus:outline-none">
                            Maintenance</Link>
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
    </div>

  );
};

export default AssetsTable;
