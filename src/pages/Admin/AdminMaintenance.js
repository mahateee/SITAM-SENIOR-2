import React, { useEffect, useState , useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase/index";
export default function AdminMaintenance() {
  const [MaintainanceList, setMaintainance] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [data, setData] = useState([]);

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
  const updateMaintancAssign = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, "Maintainance_Requests", requestId);
      await updateDoc(requestRef, { assign: newStatus });
      // Update the local state to reflect the change
      setMaintainance((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, assign: newStatus } : request
        )
      );
      console.log(`Request ${requestId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const q = query(
          collection(db, "Account"),
          where("role", "==", "admin")
        );
        const unsub = onSnapshot(q, (querySnapshot) => {
          const adminsArray = [];
          querySnapshot.forEach((doc) => {
            adminsArray.push({ ...doc.data(), id: doc.id });
          });
          setEmployees(adminsArray);
        });
        return () => unsub();
      } catch (error) {
        console.error("Error fetching admin employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const predictUrgency = (role, maintenanceType, urgency) => {
    if (role === 'admin') {
      if (maintenanceType === 'Repair') {
        return urgency === 'within 3 Days' ? 'High' : 'Medium';
      } else if (maintenanceType === 'Hardware issues') {
        return 'High';
      } else if (maintenanceType === 'Software issues') {
        return 'Medium';
      }
    } else if (role === 'user') {
      if (maintenanceType === 'Repair') {
        return urgency === 'within 3 Days' ? 'Medium' : 'Low';
      } else if (maintenanceType === 'Hardware issues') {
        return urgency === 'within 3 Days' ? 'High' : 'Medium';
      } else if (maintenanceType === 'Software issues') {
        return 'Low';
      }
    }
  
    // Default case if the role or maintenanceType doesn't match any specified condition
    return 'Unknown';
  };
  
  
  const getUrgencyColor = (predictUrgency) => {
    switch (predictUrgency) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Low":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return"bg-orange-100 text-orange-800";
        case "Unknown":
          return"bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };
  const UrgencyColor = getUrgencyColor(predictUrgency);

  return (
    <div className="p-12 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
      <div className="flex items-center justify-between lg:flex space-x-12">
        <div className="mb-4 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            Received Maintenance Requests ⚙️
          </h3>
          <span className="text-base font-normal text-gray-500">
          Latest Request has been Approved.
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
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg max-h-96">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center">
                      Requester name
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Maintainance Type
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Asset Category
                    </th>
                  
                    <th scope="col" className="px-4 py-3 text-center">
                      Asset ID
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      Urgency
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                     Predicted Urgency
                    </th>
                    <th scope="col" class="px-12 py-3 text-center">
                      Status
                    </th>
                    <th scope="col" className="px-12 py-3 text-center">
                      Assign
                    </th>
                    <th scope="col" className="px-12 py-3 text-center">
                      Remarks
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0
                    ? data.map((main, id) => (
                        <tr key={id} className="border-b">
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {main.user}
                          </th>
                          <td className="px-4 py-3 text-center">{main.maintenanceType}</td>
                          <td className="px-4 py-3 text-center">{main.category}</td>
                          <td className="px-4 py-3 text-center">{main.assetID}</td>
                          <td className="px-4 py-3 text-center">{main.urgency}</td>
                          <td className="px-4 py-3 text-center">
  <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${getUrgencyColor(predictUrgency(main.role, main.maintenanceType, main.urgency))}`}>
    {main.predictedUrgency || predictUrgency(main.role, main.maintenanceType)}
  </span>
</td>



                          <td className="px-4 py-3 text-center">
                            <select
                              value={main.status || "Waiting"}
                              onChange={(e) =>
                                updateMaintancStatus(main.id, e.target.value)
                              }
                              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                              <option value="Waiting">Waiting</option>
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </td>
                          <td className="px-6 py-5">
                            <select
                              value={main.assign || "None"}
                              onChange={(e) =>
                                updateMaintancAssign(main.id, e.target.value)
                              }
                              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                              <option value="None">None</option>
                              {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                  {employee.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 text-center">
                          <Remarks remarks={main.remarks} assetId={main.ID}/>
                           </td>
                          <td className="px-4 py-3 flex items-center justify-end"></td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Remarks = ({ remarks, assetId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        id="dropdownMenuIconHorizontalButton"
        data-dropdown-toggle="dropdownDotsHorizontal"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
        type="button"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          style={{ top: '2.5rem' }} // Adjust this value as needed
        >
          <ul
            className="py-2 text-sm text-gray-700 bg-white"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 overflow-hidden"
              >
                {remarks}
              </a>
            </li>
          </ul>
          <div className="py-2">
            <Link to={`/Asset/show/${assetId}`}>
              <a
                href={`/show/${assetId}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Asset Details
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};



