import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/index";
import Example from "../component/Example"; // Import the caution dialog component here
import ScanQR from "../component/ScanQR";
import AdminSidebar from "../component/AdminSidebar";

function Assets() {
  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [openColumn, setOpenColumn] = React.useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handleOpenColumn = () => {
    setOpenColumn(!openColumn);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [checkedName, setCheckedName] = useState(false);
  const handleChangeCheckBox = () => {
    setCheckedName(!checkedName);
  };
  const deleteAssetItem = async (id) => {
    await deleteDoc(doc(db, "asset", id)).then(() => {
      console.log("delete");
    });
  };

  const [showCautionDialog, setShowCautionDialog] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const openCautionDialog = (id) => {
    setSelectedAssetId(id);
    setShowCautionDialog(true);
  };
  const [assetsList, setAssetsList] = useState([]);
  const [data, setData] = useState([]);
  React.useEffect(() => {
    const q = query(collection(db, "asset"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setAssetsList(todosArray);
      setData(todosArray);
    });
    return () => unsub();
  }, []);
  // exclude column list from filter
  const excludeColumns = ["id"];
  const [searchText, setSearchText] = useState([]);
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ["Monitors", "Laptop", "PC", "Phone", "Printer"];
  const [columnVisibility, setColumnVisibility] = useState({
    ID: true,
    Name: true,
    Status: true,
    Brand: true,
    Category: true,
    Date: true,
    // Add more columns as needed
  });

  const handleCategoryChange = (Category) => {
    if (selectedCategories.includes(Category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== Category));
    } else {
      setSelectedCategories([...selectedCategories, Category]);
    }
  };

  const handleColumnVisibilityChange = (columnName) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };
  return (
    <div data-testid="asset-table">
      <AdminSidebar />
      {showCautionDialog && (
        <Example
          open={showCautionDialog}
          onClose={() => {
            setShowCautionDialog(false);
          }}
          onDelete={() => {
            deleteAssetItem(selectedAssetId); // Pass the selected asset ID
            setShowCautionDialog(false); // Close the dialog after deletion
          }}
          assetId={selectedAssetId}
          setShowCautionDialog={setShowCautionDialog} // Pass setShowCautionDialog as a prop
          deleteAssetItem={deleteAssetItem} // Pass deleteAssetItem as a prop
        />
      )}
      {open && <ScanQR onClose={handleClose} />}
      {/* table */}
      <section className="bg-gray-50  p-3 sm:p-5">
        <div
          className="mx-auto max-w-screen-xl px-4 lg:px-12 "
          style={{ maxWidth: "95%" }}
        >
          {" "}
          {/* cntrol the width of the whole table */}
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 "
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                      placeholder="Search"
                      value={searchText.join(" ")}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <button onClick={handleOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-5 h-5 text-gray-500 "
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                  />
                </svg>
              </button>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  className="flex items-center justify-center  bg-teal-700  text-white hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
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
                    />
                  </svg>
                  <Link to={`/Asset/add`}>Add Asset</Link>
                </button>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <div class="">
                    <button
                      onClick={handleOpenColumn}
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

                    {openColumn && (
                      <div class="z-10  absolute mt-14 top-6 w-48 p-3 bg-white rounded-lg shadow">
                        <h6 class="mb-3 text-sm font-medium text-gray-900 ">
                          Column
                        </h6>
                        <ul
                          class="space-y-2 text-sm"
                          aria-labelledby="dropdownDefault"
                        >
                          {Object.entries(columnVisibility).map(
                            ([columnName, isVisible]) => (
                              <li class="flex items-center">
                                <label
                                  key={columnName}
                                  class="ml-2 text-sm font-medium text-gray-900"
                                >
                                  <input
                                    type="checkbox"
                                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                                    checked={isVisible}
                                    onChange={() =>
                                      handleColumnVisibilityChange(columnName)
                                    }
                                  />
                                  {columnName}
                                </label>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 w-full md:w-auto">
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
                        class="z-10  absolute mt-14 top-6 right-0 w-48 p-3 bg-white rounded-lg shadow"
                      >
                        <h6 class="mb-3 text-sm font-medium text-gray-900 ">
                          Category
                        </h6>
                        <ul
                          class="space-y-2 text-sm"
                          aria-labelledby="dropdownDefault"
                        >
                          {categories.map((category) => (
                            <li class="flex items-center">
                              <label
                                class="ml-2 text-sm font-medium text-gray-900"
                                key={category}
                              >
                                <input
                                  type="checkbox"
                                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                                  checked={selectedCategories.includes(
                                    category
                                  )}
                                  onChange={() =>
                                    handleCategoryChange(category)
                                  }
                                />
                                {category}
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

            {/* table */}
            <div className="overflow-y-auto" style={{ maxHeight: "700px" }}>
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      #
                    </th>
                    {columnVisibility.ID && (
                    <th scope="col" className="px-4 py-3 text-center">
                      Asset ID
                    </th>
                    )}
                    {columnVisibility.Name && (
                      <th scope="col" className="px-4 py-3 text-center">
                        Asset Name
                      </th>
                    )}

                    {columnVisibility.Status && (
                      <th scope="col" className="px-4 py-3 text-center">
                        Asset Status
                      </th>
                    )}
                    {columnVisibility.Brand && (
                      <th scope="col" className="px-4 py-3 text-center">
                        Asset Brand
                      </th>
                    )}

                    {columnVisibility.Category && (
                    <th scope="col" className="px-4 py-3 text-center">
                      Asset Category
                    </th>
                    )}
                    {columnVisibility.Date && (
                    <th scope="col" className="px-4 py-3 text-center">
                      Insertion Date
                    </th>
                    )}
                    <th
                      scope="col"
                      className="px-4 py-3 text-center align-middle"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.length > 0 ? (
                    data
                      .filter(
                        (asset) =>
                          selectedCategories.length === 0 ||
                          selectedCategories.includes(asset.Category)
                      )
                      .map((asset, i) => (
                        <tr className="border-b" data-testid="asset" key={i}>
                          <td className="px-4 py-3">{i + 1}</td>
                          {columnVisibility.ID && (
                          <td className="px-4 py-3 text-center">
                            {asset.AssetID}
                          </td>
                          )}
                          {columnVisibility.Name && (
                            <td className="px-4 py-3 text-center">
                              {asset.name}
                            </td>
                          )}
                          {columnVisibility.Status && (
                            <td className="px-4 py-3 text-center">
                              {asset.Status === "Available" ? (
                                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  Available
                                </span>
                              ) : null}
                              {asset.Status === "InUse" ? (
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  In Use
                                </span>
                              ) : null}
                              {asset.Status === "Disposed" ? (
                                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  Disposed
                                </span>
                              ) : null}
                              {asset.Status === "Return" ? (
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  Return
                                </span>
                              ) : null}
                              {asset.Status === "Maintenance" ? (
                                <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                  Maintenance
                                </span>
                              ) : null}
                            </td>
                          )}
                          {columnVisibility.Brand && (
                            <td className="px-4 py-3 text-center">
                              {asset.Brand}
                            </td>
                          )}
                          {columnVisibility.Category && (
                          <td className="px-4  py-3 text-center">
                            <span className=" bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-400">
                              {asset.Category}
                            </span>
                          </td>
                          )}
                          {columnVisibility.Date && (
                          <td className="px-4 py-3 text-center">
                            {asset.date}
                          </td>
                          )}

                          <div className="flex justify-center items-center">
                            <td
                              className="px-4 py-2"
                              style={{ width: "150px" }}
                            >
                              {/* show button. */}
                              <button
                                type="button"
                                data-drawer-target="drawer-read-product-advanced"
                                data-drawer-show="drawer-read-product-advanced"
                                aria-controls="drawer-read-product-advanced"
                                class="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  class="w-5 h-3 mr-1 -ml-0.25"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                  ></path>
                                </svg>
                                <Link to={`/Asset/show/${asset.id}`}>
                                  Preview
                                </Link>
                              </button>
                            </td>
                            <td
                              className=" px-4 py-2"
                              style={{ width: "130px" }}
                            >
                              {/* Edit button for the edit page. */}
                              <button
                                type="button"
                                class=" inline-flex items-center text-white bg-gray-500 rounded-lg hover:bg-gray-800 font-medium text-sm px-5 py-2.5 text-center "
                              >
                                <svg
                                  aria-hidden="true"
                                  class="mr-1 -ml-1 w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                  <path
                                    fill-rule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <Link to={`/Asset/edit/${asset.id}`}>Edit</Link>
                              </button>
                            </td>
                            <td
                              className=" px-4 py-2"
                              style={{ width: "150px" }}
                            >
                              {/* Delete Button. */}
                              <button
                                onClick={() => {
                                  openCautionDialog(asset.id); // Open the caution dialog
                                }}
                                type="button"
                                class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                              >
                                <svg
                                  class="mr-1 -ml-1 w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                Delete
                              </button>
                            </td>
                          </div>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2" colSpan={7}>
                        No Assets
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* Content */}
    </div>
  );
}

export default Assets;
