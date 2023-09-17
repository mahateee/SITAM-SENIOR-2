import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index";
// import QRCodeGenerator from './Barcode'; // Import your BarcodeComponent

function ShowPage() {
  const { id } = useParams();
  const [asset, setAsset] = useState({});

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const docRef = doc(db, "asset", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAsset(docSnap.data());
        } else {
          console.log("No such asset!");
        }
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    };

    fetchAsset();
  }, [id]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto bg-gray-50 rounded-lg border border-gray-200 p-8 items-center content-center flex">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Asset Information</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{asset.name}</h1>
            <div className="flex mb-4">
              <a className="flex-grow text-teal-700 border-b-2 border-teal-700 py-2 text-lg px-1"> Details</a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1"> Maintenance History</a>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset ID</span>
              <span className="ml-auto text-gray-900">{asset.AssetID}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Status</span>
              <span className="ml-auto text-gray-900">
                {(asset.Status === "Available") ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Available</span> : null}
                {(asset.Status === "InUse") ? <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">In Use</span> : null}
                {(asset.Status === "Disposed") ? <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Disposed</span> : null}
              </span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Serial Number</span>
              <span className="ml-auto text-gray-900">{asset.SerialNumber}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Model</span>
              <span className="ml-auto text-gray-900">{asset.Model}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Insertion Date</span>
              <span className="ml-auto text-gray-900">{asset.date}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Brand</span>
              <span className="ml-auto text-gray-900">{asset.Brand}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Category</span>
              <span className="ml-auto bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-400">{asset.Category}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Operating System</span>
              <span className="ml-auto text-gray-900">{asset.os}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Description</span>
              <span className="ml-auto text-gray-900">{asset.description}</span>
            </div>
            {/* Cancel Button */}
          <div className="flex justify-center mt-4">
            <Link
              to={`/Asset`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-white text-sm font-medium rounded-md bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </Link>
          </div>
          </div>


          <div className="flex justify-center items-center">    
                {/* <QRCodeGenerator id={asset.id} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowPage;