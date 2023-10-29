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

  const [openFilter, setOpenFilter] = React.useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
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
