import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/index";

export default function AdminMaintenance() {
  const [MaintainanceList, setMaintainance] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [data, setData] = useState(MaintainanceList);

  useEffect(() => {
    const q = query(collection(db, "Maintainance_Requests"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setMaintainance(todosArray);
      setData(todosArray);
    });
    return () => unsub();
  }, []);

  const handleChange = (value) => {
    const searchValues = value.split(" ").map((v) => v.trim());
    setSearchText(searchValues);
    filterData(searchValues);
  };

  const filterData = (values) => {
    if (values.length === 0) {
      setData(MaintainanceList);
    } else {
      const filteredData = MaintainanceList.filter((item) => {
        return values.every((searchValue) => {
          return Object.entries(item).some(([key, value]) => {
            if (key.toLowerCase().includes("status")) {
              return false; // exclude status from search
            }
            if (value && typeof value === "string") {
              return value.toLowerCase().includes(searchValue.toLowerCase());
            }
            return false;
          });
        });
      });
      setData(filteredData);
    }
  };

  const updateMaintancStatus = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, "Maintainance_Requests", requestId);
      await updateDoc(requestRef, { status: newStatus });
      // Update the local state to reflect the change
      setMaintainance((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, status: newStatus } : request
        )
      );
      console.log(`Request ${requestId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
      <div className="flex items-center justify-between lg:flex space-x-4">
        <div className="mb-4 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            Received Maintenance Requests ⚙️
          </h3>
          <span className="text-base font-normal text-gray-500">
            Latest Request has been Approved
          </span>
        </div>
        <div className="w-full md:w-1/3">
          <form className="flex items-left">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                placeholder="Search"
                value={searchText.join(" ")}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto rounded-lg max-h-96">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      <th scope="col" className="px-4 py-3">
        Requester name
      </th>
      <th scope="col" className="px-4 py-3">
        Maintainance Type
      </th>
      <th scope="col" className="px-4 py-3">
        Category
      </th>
      <th scope="col" className="px-4 py-3">
        remarks
      </th>
      <th scope="col" className="px-4 py-3">
        Asset ID
      </th>
      <th scope="col" className="px-4 py-3">
      urgency
      </th>
      <th scope="col" className="px-4 py-3">
        Assign
      </th>
      <th scope="col" className="px-4 py-3">
        <span className="sr-only">Actions</span>
      </th>
    </tr>
  </thead>
  <tbody>
    {data.length > 0 ? (
      data.map((main, id) => (
        <tr key={id} className="border-b">
          <th
            scope="row"
            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
          >
            {main.user}
          </th>
          <td className="px-4 py-3">{main.maintenanceType}</td>
          <td className="px-4 py-3">{main.category}</td>
          <td className="px-4 py-3">{main.remarks}</td>
          <td className="px-4 py-3">{main.assetID}</td>
          <td className="px-4 py-3">{main.urgency}</td>
          <td className="px-4 py-3">
            <select
              value={main.assign || "None"}
              onChange={(e) =>
                updateMaintancStatus(main.id, e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value="None">None</option>
              <option value="User">User</option>
              <option value="dana">dana</option>
             
            </select>
          </td>
          <td className="px-4 py-3 flex items-center justify-end">
          </td>
        </tr>
      ))
    ) : null}
  </tbody>
</table>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}