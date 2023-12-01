import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "../firebase/index";
import { db } from "../firebase/index";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import AssetForm from "../component/Admin/AssetForm";

export default function EditAsset() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEmployeeField, setShowEmployeeField] = useState(false);
  const [asset, setAsset] = useState({
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
    name: "",
    AssetID: "",
    Model: "",
    os: "",
    Brand: "",
  });

  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    const fieldName = event.target.name;
    setAsset({ ...asset, [event.target.name]: event.target.value });
    if (
      selectedStatus === "InUse" ||
      selectedStatus === "Return" ||
      selectedStatus === "Maintenance"
    ) {
      setShowEmployeeField(true);
    } else {
      setShowEmployeeField(false);
    }
  };

  const checkValidation = () => {
    let errors = { ...validation };
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
      errors.AssetID = "Asset ID is required.";
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

    setValidation(errors);
    return isValid;
  };

  useEffect(() => {
    // Fetch asset data based on the id parameter when the component mounts
    const fetchAssetData = async () => {
      try {
        const assetRef = doc(db, "asset", id);
        const assetDoc = await getDoc(assetRef);

        if (assetDoc.exists()) {
          const assetData = assetDoc.data();
          // Set the asset state with the fetched data
          setShowEmployeeField(
            assetData.Status === "InUse" ||
            assetData.Status === "Return" ||
            assetData.Status === "Maintenance"
          );

          setAsset(assetData);
        } else {
          // Handle the case where the asset doesn't exist
          console.log("Asset not found");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    // Call the fetchAssetData function
    fetchAssetData();
  }, [id]); // Trigger the fetch when the id parameter changes
  const [employees, setEmployees] = useState([]);

  React.useEffect(() => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      let updatedEmployeeId = "";
      if (
        asset.Status === "InUse" ||
        asset.Status === "Return" ||
        asset.Status === "Maintenance"
      ) {
        updatedEmployeeId = asset.employeeId;
      }
      const assetRef = doc(db, "asset", id);
      const historyRef = collection(db, "History"); // Reference to the history collection

      // Get the current timestamp
      const timestamp = serverTimestamp();

      try {
        // Update the asset data
        await updateDoc(assetRef, {
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
          employeeId: updatedEmployeeId,
          WarrantyStatus: asset.WarrantyStatus,
          WarrantyType: asset.WarrantyType,
          WarrantyEndDate: asset.WarrantyEndDate,
          OrderNumber: asset.OrderNumber,
          PurchaseDate: asset.PurchaseDate,
          PurchaseCost: asset.PurchaseCost,
          Supplier: asset.Supplier,
        });

        // Save the updated asset data to the history collection
        await addDoc(historyRef, {
          assetId: id,
          timestamp,
          updatedData: {
            Status: asset.Status,
            employeeId: updatedEmployeeId,
          },
        });

        console.log("Document successfully updated and saved to history!");
        // Set showEditAlert to true and navigate to the Request page
        navigate('/Asset', { state: { showEditAlert: true } });

      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <section class="bg-gray-200 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative p-4 bg-white rounded-lg shadow-xl sm:p-5">
          {/* <!-- Modal header --> */}
          <div class="pb-4 mb-4 rounded-t border-b-2 sm:mb-5">
            <h3 class="text-2xl font-semibold text-blue-800 ">Edit Asset Form</h3>
          </div>
          <AssetForm
            showEmployeeField={showEmployeeField}
            handleSubmit={handleSubmit}
            asset={asset}
            validation={validation}
            handleChange={handleChange}
            employees={employees}
            setAsset={setAsset}
            isEdit={true}
          />
        </div>
      </div>
    </section>
  );
}
