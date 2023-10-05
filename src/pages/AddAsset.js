import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "../firebase/index";
import { onSnapshot, query } from "firebase/firestore";

export default function AddAsset() {
  const navigate = useNavigate();
  const [showEmployeeField, setShowEmployeeField] = useState(false);
  const [asset, setAsset] = useState({
    id: "",
    name: "",
    AssetID: "",
    SerialNumber: "",
    Model: "",
    Brand: "",
    Category: "",
    os: "",
    description: "",
    Status: "",
    date: "",
    employeeId: "",
  });
  const [validation, setValidation] = useState({
    id: "",
    name: "",
    AssetID: "",
    SerialNumber: "",
    Model: "",
    Brand: "",
    Category: "",
    os: "",
    description: "",
    Status: "",
    date: "",
    employeeId: "",
  });

  const checkValidation = () => {
    let errors = validation;

    let isValid = true;
    // Assets name validation
    if (!asset.name.trim()) {
      errors.name = "Asset Name is required.";
      isValid = false;
    } else if (!asset.name.match(/^[A-Za-z\s]*$/)) {
      errors.name = "Please enter only alphabets.";
      isValid = false;
    } else {
      errors.name = "";
    }

    // Assets ID validation
    if (!asset.AssetID.trim()) {
      errors.AssetID = "Assets ID is required.";
      isValid = false;
    } else if (!asset.AssetID.match(/[0-9]/)) {
      errors.AssetID = "Please enter only numbers.";
      isValid = false;
    } else {
      errors.AssetID = "";
    }

    // Assets Serial Number validation
    if (!asset.SerialNumber.trim()) {
      errors.SerialNumber = "Asset Serial Number is required.";
      isValid = false;
    } else if (!asset.SerialNumber.match(/^[A-Za-z0-9-\s]*$/)) {
      errors.SerialNumber =
        "Please enter only alphabets, numbers, and/or hyphens.";
      isValid = false;
    } else {
      errors.SerialNumber = "";
    }

    // Assets Model validation
    if (!asset.Model.trim()) {
      errors.Model = "Asset Model is required.";
      isValid = false;
    } else if (!asset.Model.match(/^[A-Za-z0-9\s]*$/)) {
      errors.Model = "Please enter only alphabets and/or numbers.";
      isValid = false;
    } else {
      errors.Model = "";
    }

    // Assets OS validation
    if (!asset.os.trim()) {
      errors.os = "Asset Operating System is required.";
      isValid = false;
    } else if (!asset.os.match(/^[A-Za-z0-9\s]*$/)) {
      errors.os = "Please enter only alphabets and/or numbers.";
      isValid = false;
    } else {
      errors.os = "";
    }

    // Assets Brand validation
    if (!asset.Brand.trim()) {
      errors.Brand = "Asset Brand is required.";
      isValid = false;
    } else if (!asset.Brand.match(/^[A-Za-z\s]*$/)) {
      errors.Brand = "Please enter only alphabets.";
      isValid = false;
    } else {
      errors.Brand = "";
    }

    return isValid;
  };

  // const [assets, setAssets] = useState([]);
  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    setAsset({ ...asset, [event.target.name]: event.target.value });
    if (selectedStatus === "InUse") {
      setShowEmployeeField(true);
    }
  };

  useEffect(() => {
    checkValidation();
  }, [asset]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "Account"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setEmployees(todosArray);
      console.log(employees);
      // setData(todosArray);
    });
    return () => unsub();
  }, []);
  const addAssetItem = async (event) => {
    event.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      try {
        const docRef = await addDoc(collection(db, "asset"), {
          name: asset.name,
          AssetID: asset.AssetID,
          SerialNumber: asset.SerialNumber,
          Model: asset.Model,
          Brand: asset.Brand,
          Category: asset.Category,
          os: asset.os,
          description: asset.description,
          Status: asset.Status,
          date: asset.date,
          employeeId: asset.employeeId,
        });
        console.log("Document written with ID: ", docRef.id);
        navigate("/Asset");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <section class="bg-white ">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900">Add a New Asset</h2>
          <form onSubmit={addAssetItem} className="mb-4 px-10">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="Assets"
                >
                  Asset Name:
                </label>
                <input
                  data-testid="asset-id-input"
                  role="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="name"
                  type="text"
                  name="name"
                  value={asset.name}
                  onChange={handleChange}
                />
                {validation.name && (
                  <p className="mt-2 text-sm text-red-600">{validation.name}</p>
                )}
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="AssetID"
                >
                  Asset ID:
                </label>
                <input
                  label="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="AssetID"
                  type="text"
                  name="AssetID"
                  value={asset.AssetID}
                  onChange={handleChange}
                />
                {/* validate */}
                {validation.AssetID && (
                  <p className="mt-2 text-sm text-red-600">
                    {validation.AssetID}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Status"
                >
                  Asset Status:
                </label>
                <select
                  id="Status"
                  name="Status"
                  value={asset.Status}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>
                    Select Status
                  </option>
                  <option value="Available">Available</option>
                  <option value="InUse">In Use</option>
                  <option value="Disposed">Disposed</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="SerialNumber"
                >
                  Asset Serial Number:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="SerialNumber"
                  type="text"
                  name="SerialNumber"
                  value={asset.SerialNumber}
                  onChange={handleChange}
                />
                {/* validate */}
                {validation.SerialNumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {validation.SerialNumber}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Model"
                >
                  Asset Model:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="Model"
                  type="text"
                  name="Model"
                  value={asset.Model}
                  onChange={handleChange}
                />
                {/* validate */}
                {validation.Model && (
                  <p className="mt-2 text-sm text-red-600">
                    {validation.Model}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="date"
                >
                  Insertion Date:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="date"
                  type="date"
                  name="date"
                  value={asset.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Brand"
                >
                  Asset Brand:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="Brand"
                  type="text"
                  name="Brand"
                  value={asset.Brand}
                  onChange={handleChange}
                />
                {/* validate */}
                {validation.Brand && (
                  <p className="mt-2 text-sm text-red-600">
                    {validation.Brand}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Category"
                >
                  Asset Category:
                </label>

                <select
                  id="Category"
                  name="Category"
                  value={asset.Category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  <option value="Monitors">Monitors</option>
                  <option value="Laptop">Laptop</option>
                  <option value="PC">PC</option>
                  <option value="Printer">Printer</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="os"
                >
                  Operating System:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="os"
                  type="text"
                  name="os"
                  value={asset.os}
                  onChange={handleChange}
                />
                {/* validate */}
                {validation.os && (
                  <p className="mt-2 text-sm text-red-600">{validation.os}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="description"
                >
                  Description:
                </label>

                <textarea
                  id="description"
                  type="text"
                  name="description"
                  value={asset.description}
                  onChange={handleChange}
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Your description here"
                  required
                ></textarea>
              </div>
              {showEmployeeField && (
                <div className="w-full  my-2.5">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="employee"
                  >
                    Employee:
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    value={asset.employeeId}
                    onChange={(e) =>
                      setAsset({ ...asset, employeeId: e.target.value })
                    }
                  >
                    <option value="">Select Employee</option>
                    {/* <option value="AM7M4QfDBfae37XMWKvdGvCepbX2">
                    George Ahmed
                  </option> */}
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                    {/* Other employee options */}
                  </select>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                role="button"
                className="bg-teal-700 hover:bg-teal-900 text-white font-bold my-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Asset
              </button>
              <Link
                to={`/Asset`}
                className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
