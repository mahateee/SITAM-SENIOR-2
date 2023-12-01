import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, addDoc } from "../firebase/index";
import { onSnapshot, query } from "firebase/firestore";
import AssetForm from "../component/Admin/AssetForm";

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
    WarrantyStatus: "",
    WarrantyType: "",
    WarrantyEndDate: "",
    OrderNumber: "",
    PurchaseDate: "",
    PurchaseCost: "",
    Supplier: "",
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
    let errors = {};
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

    // Set validation state
    setValidation(errors);
    return isValid;
  };

  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    setAsset({ ...asset, [event.target.name]: event.target.value });
    if (selectedStatus === "InUse") {
      setShowEmployeeField(true);
    }
  };

  const handleSubmit = async (event) => {
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
          WarrantyStatus: asset.WarrantyStatus,
          WarrantyType: asset.WarrantyType,
          WarrantyEndDate: asset.WarrantyEndDate,
          OrderNumber: asset.OrderNumber,
          PurchaseDate: asset.PurchaseDate,
          PurchaseCost: asset.PurchaseCost,
          Supplier: asset.Supplier,
        });
        console.log("Document written with ID: ", docRef.id);
        // Set showAddAlert to true and navigate to the Asset page
        navigate('/Asset', { state: { showAddAlert: true } });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
    });
    return () => unsub();
  }, []);

  return (
    <section class="bg-gray-200 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow-xl sm:p-5">
          {/* <!-- Modal header --> */}
          <div class="pb-4 mb-4 rounded-t border-b-2 sm:mb-5">
            <h3 class="text-2xl font-semibold text-blue-800 ">Add Asset Form</h3>
          </div>
          <AssetForm
            showEmployeeField={showEmployeeField}
            handleSubmit={handleSubmit}
            asset={asset}
            validation={validation}
            handleChange={handleChange}
            employees={employees}
            setAsset={setAsset}
            isEdit={false}
          />
        </div>
      </div>
    </section>
  );
}
