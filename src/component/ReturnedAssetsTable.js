import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";

const ReturnedAssetsTable = () => {
  const [returnedAssets, setReturnedAssets] = useState([]);

  useEffect(() => {
    const fetchReturnedAssets = async () => {
      try {
        // Fetch assets with the status "Return"
        const returnedAssetsQuery = query(
          collection(db, "asset"),
          where("Status", "==", "Return")
        );
        const returnedAssetsSnapshot = await getDocs(returnedAssetsQuery);
        const returnedAssetsData = returnedAssetsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the state with the returned assets
        setReturnedAssets(returnedAssetsData);
      } catch (error) {
        console.error("Error fetching returned assets:", error);
      }
    };

    fetchReturnedAssets();
  }, []);

  return (
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
      <h3 class="mb-2 text-xl font-bold text-gray-900">Returned Assets 🔄 </h3>
      <span className="text-base font-normal text-gray-500">
        List of Returned Assets.
      </span>
      <div class="flex flex-col mt-6 overflow-x-auto overflow-y-auto rounded-lg max-h-[600px]">
        
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 ">
                <thead class="bg-gray-50 ">
                  <tr>
                  <th
                      scope="col"
                      className="px-4 py-3 font-medium tracking-wider text-sm text-center text-gray-700 uppercase"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium tracking-wider text-sm text-center text-gray-700 uppercase"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium tracking-wider text-sm text-center text-gray-700 uppercase"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium tracking-wider text-sm text-center text-gray-700 uppercase"
                    >
                      Model
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white text-center ">
                  {returnedAssets.length > 0 ? (
                    returnedAssets.map((returned, id) => (
                      <tr key={id} className="border-b">
                        <td className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">{id + 1}</td>
                        <th
                          scope="row"
                          className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center"
                        >
                          {returned.Category}
                        </th>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
                          {returned.Brand}
                          {/* {returned.employeeName} */}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
                          {returned.Model}
                          {/* {returned.employeeName} */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center text-gray-600  py-4"
                      >
                        No returned assets.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default ReturnedAssetsTable;
