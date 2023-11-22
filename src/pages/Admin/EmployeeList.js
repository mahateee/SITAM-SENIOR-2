import React from "react";
import AdminSidebar from "../../component/AdminSidebar";
import { useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/index";
export default function EmployeeList() {
  const [searchText, setSearchText] = useState([]);
  const [assetsList, setAssetsList] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "Account"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setAssetsList(todosArray);
      console.log(assetsList);
      setData(todosArray);
    });
    return () => unsub();
  }, []);
  const [data, setData] = useState(assetsList);

  // exclude column list from filter
  const excludeColumns = ["id"];

  // handle change event of search input
  const handleChange = (value) => {
    const searchValues = value.split(" ").map((v) => v.trim());
    setSearchText(searchValues);
    filterData(searchValues);
  };
  const filterData = (values) => {
    if (values.length === 0) {
      setData(assetsList);
    } else {
      const filteredData = assetsList.filter((item) => {
        return values.every((searchValue) => {
          return Object.keys(item).some((key) =>
            excludeColumns.includes(key)
              ? false
              : item[key]
                .toString()
                .toLowerCase()
                .includes(searchValue.toLowerCase())
          );
        });
      });
      setData(filteredData);
    }
  };

  const updateMaintancAssign = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, "Account", requestId);
      await updateDoc(requestRef, { role: newStatus });
      // Update the local state to reflect the change
      setData((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, role: newStatus } : request
        )
      );
      console.log(`Request ${requestId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <>
      <AdminSidebar />
      <section className="bg-gray-50 min-h-screen p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="mt-12 p-4 bg-white border border-gray-300 rounded-lg shadow-lg sm:p-6">
            <div className="flex items-center justify-between lg:flex space-x-4">
              <div className="mb-4 lg:mb-0">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Employees 👨‍💼
                </h3>
                {/* <span className="text-base font-normal text-gray-500">
                  List of Employees.
                </span> */}
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
            <div class="relative overflow-x-auto max-h-[600px]">
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                      Name
                    </th>
                    <th 
                    scope="col" 
                    className="px-4 py-3 font-medium tracking-wider text-sm text-center text-gray-700 uppercase"
                    >
                      Email Address
                    </th>
                    <th 
                    scope="col" 
                    className="px-4 py-3 font-medium tracking-wider text-sm text-center text-gray-700 uppercase"
                    >
                      Role
                    </th>
                    <th 
                    scope="col" 
                    className="px-4 py-3 font-medium tracking-wider text-sm text-center text-gray-700 uppercase"
                    >
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0
                    ? data.map((user, id) => (
                      <tr key={id} class="bg-white border-b text-center">
                        <td className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">{id + 1}</td>
                        <th
                          scope="row"
                          className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center"
                        >
                          {user.name + " " + user.lastname}
                        </th>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">{user.email}</td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
                          <select
                            value={user.role || "None"}
                            onChange={(e) =>
                              updateMaintancAssign(user.id, e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                          >
                            <option value="None">None</option>
                            <option value="admin">Admin</option>
                            <option value="user">Employee</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">{user.department}</td>
                      </tr>
                    ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
