import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import Example from "../component/Example"; 
import ScanQR from "../component/Admin/ScanQR";
import AdminSidebar from "../component/AdminSidebar";
import AssetRow from "../component/Admin/AssetRow";
import SearchInput from "../component/SearchInput";
import CategoryFilter from "../component/Admin/CategoryFilter";
import AddAssetButton from "../component/Admin/AddAssetButton";
import ColumnFilter from "../component/Admin/ColumnFilter";

function Assets() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
  });

  const handleCategoryChange = (Category) => {
    if (selectedCategories.includes(Category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== Category));
    } else {
      setSelectedCategories([...selectedCategories, Category]);
    }
  };

  return (
    <div data-testid="asset-table">
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
          {/* cntrol the width of the whole table */}
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full flex flex-row md:space-x-4  md:flex-row">
                <SearchInput
                  searchText={searchText}
                  handleChange={handleChange}
                />
                <ScanButton handleOpen={handleOpen} />
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <AddAssetButton />
                <ColumnFilter
                  columnVisibility={columnVisibility}
                  setColumnVisibility={setColumnVisibility}
                />
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  setSelectedCategories={selectedCategories}
                  handleCategoryChange={handleCategoryChange}
                  categories={categories}
                />
              </div>
            </div>
            {/* table */}
            <div className="overflow-y-auto" style={{ maxHeight: "700px" }}>
              <table className="w-full text-sm text-left text-gray-500 ">
                <TableHeader columnVisibility={columnVisibility} />
                <tbody>
                  {data.length > 0 ? (
                    data
                      .filter(
                        (asset) =>
                          selectedCategories.length === 0 ||
                          selectedCategories.includes(asset.Category)
                      )
                      .map((asset, i) => (
                        <AssetRow
                          asset={asset}
                          columnVisibility={columnVisibility}
                          index={i}
                          openCautionDialog={openCautionDialog}
                        />
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

export function ScanButton({ handleOpen }) {
  return (
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
  );
}

export function TableHeader({ columnVisibility }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" className="px-4 py-3 text-center">
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
        <th scope="col" className="px-4 py-3 text-center align-middle">
          Actions
        </th>
      </tr>
    </thead>
  );
}
