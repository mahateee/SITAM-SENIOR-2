import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import Sidebar from "../component/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "../firebase/index";
export default function AddAsset() {
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
  });
  const checkValidation = () => {
    let errors = validation;

    let isValid = true;
    // Assets name validation
    if (!asset.name.trim()) {
      errors.name = "Asset name is required";
      isValid = false;
    } else if (!asset.name.match(/[A-Za-z]/)) {
      errors.name = "please enter only alphabets.";
      isValid = false;
    } else {
      errors.name = "";
    }
    // Assets ID validation

    if (!asset.AssetID.trim()) {
      errors.AssetID = "Assets ID is required";
      isValid = false;
    } else if (!asset.AssetID.match(/[0-9]/)) {
      errors.AssetID = "please enter only numbers.";
      isValid = false;
    } else {
      errors.AssetID = "";
    }
    // Assets Model validation

    if (!asset.Model.trim()) {
      errors.Model = "Assets Model is required";
      isValid = false;
    } else if (!asset.Model.match(/[a-zA-Z]/)) {
      errors.Model = "please enter only alphabets and number.";
      isValid = false;
    } else {
      errors.Model = "";
    }

    // Assets OS validation

    if (!asset.os.trim()) {
      errors.os = "Assets Os is required";
      isValid = false;
    } else if (!asset.os.match(/[a-zA-Z]/)) {
      errors.os = "please enter only alphabets and number";
      isValid = false;
    } else {
      errors.os = "";
    }

    // Assets Brand validation

    if (!asset.Brand.trim()) {
      errors.Brand = "Assets Brand is required";
      isValid = false;
    } else if (!asset.Brand.match(/[a-zA-Z]/)) {
      errors.Brand = "please enter only alphabets.";
      isValid = false;
    } else {
      errors.Brand = "";
    }

    return isValid;
  };

  // const [assets, setAssets] = useState([]);
  const handleChange = (event) => {
    setAsset({ ...asset, [event.target.name]: event.target.value });
  };

  // const navigate = useNavigate();
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const isValid = checkValidation();
  //   if (isValid) {
  //     axios
  //       .post("/Asset/add", asset)
  //       .then((response) => {
  //         setAssets([...assets, response.data]);
  //         setAsset({
  //           Assets: "",
  //           AssetID: "",
  //           SerialNumber: "",
  //           Model: "",
  //           Brand: "",
  //           Category: "",
  //           Os: "",
  //           Description: '',
  //           Status: '',
  //           date: "",
  //         });

  //       }).then(() => navigate("/Asset"))
  //       .catch((error) => console.error(error));
  //   }
  // };
  const handleSubmit = () => {
    console.log("submit");
  };
  // useEffect(() => {
  //   axios
  //     .get("/Asset/add")
  //     .catch((error) => console.error(error));
  //   checkValidation();
  // }, [asset]);
  useEffect(() => {
    checkValidation();
  }, [asset]);
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
        });
        console.log("Document written with ID: ", docRef.id);
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
          <form
            onSubmit={addAssetItem}
            // method="post"
            // action="/Server"
            className="mb-4 px-10"
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="Assets"
                >
                  Asset:
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
                {validation.name && console.log(validation)}
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="AssetID"
                >
                  ID:
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
                {validation.AssetID && (
                  <p className="mt-2 text-sm text-red-600">
                    {validation.AssetID}
                  </p>
                )}
                {validation.AssetID && console.log(validation)}
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Status"
                >
                  Status:
                </label>
                <select
                  id="Status"
                  name="Status"
                  value={asset.Status}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Disposed">Disposed</option>
                  <option value="InUse">In Use</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="SerialNumber"
                >
                  Serial Number:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="SerialNumber"
                  type="text"
                  name="SerialNumber"
                  value={asset.SerialNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Model"
                >
                  Model:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="Model"
                  type="text"
                  name="Model"
                  value={asset.Model}
                  onChange={handleChange}
                />
                {validation.Model && (
                  <p className="mt-2 text-sm text-red-600">
                    {validation.Model}
                  </p>
                )}
                {validation.Model && console.log(validation)}
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="date"
                >
                  Date:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="date"
                  type="date"
                  name="date"
                  value={asset.date}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Brand"
                >
                  Brand:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="Brand"
                  type="text"
                  name="Brand"
                  value={asset.Brand}
                  onChange={handleChange}
                />
                {validation.Brand && (
                  <p className="mt-2 text-sm text-red-600">
                    {validation.Brand}
                  </p>
                )}
                {validation.Brand && console.log(validation)}
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="Category"
                >
                  Category:
                </label>

                <select
                  id="Category"
                  name="Category"
                  value={asset.Category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected="">Select category</option>
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
                {validation.os && (
                  <p className="mt-2 text-sm text-red-600">{validation.os}</p>
                )}
                {validation.os && console.log(validation)}
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="description"
                >
                  description:
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
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                role="button"
                className="bg-teal-700 hover:bg-teal-900 text-white font-bold my-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Asset
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
