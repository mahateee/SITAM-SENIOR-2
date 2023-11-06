import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index";
// import QRCodeGenerator from './Barcode'; // Import your BarcodeComponent
import QRcode from "qrcode.react";
import generatePDF from "./Admin/generatePDF";
import frame from "../images/FrameInside.svg";

function ShowPage() {
  const { id } = useParams();
  const [asset, setAsset] = useState({});
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const docRef = doc(db, "asset", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAsset(docSnap.data());
          const empRef = doc(db, "Account", asset.employeeId);
          const empDoc = await getDoc(empRef);
          if (empDoc.exists()) {
            setEmployee(empDoc.data());
          } else {
            console.log("No such Account!");
          }
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
    <section className="flex items-center justify-center h-screen" style={{ backgroundImage: `url(${frame})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '1100px' }}>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto bg-white rounded-lg border border-white p-8 items-center content-center flex shadow-xl">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <div class="flex border-b-4 border-gray-300 pt-4 pb-2">
              <h1 className="text-blue-500 text-3xl title-font font-medium mb-2">Asset Information</h1>
            </div>
            <div className="flex py-2">
              <span className="text-gray-500">Asset ID</span>
              <span className="ml-auto text-gray-900">{asset.AssetID}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Name</span>
              <span className="ml-auto text-gray-900">{asset.name}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Category</span>
              <span className="ml-auto bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-400">
                {asset.Category}
              </span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Brand</span>
              <span className="ml-auto text-gray-900">{asset.Brand}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Model</span>
              <span className="ml-auto text-gray-900">{asset.Model}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Operating System</span>
              <span className="ml-auto text-gray-900">{asset.os}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Serial Number</span>
              <span className="ml-auto text-gray-900">
                {asset.SerialNumber}
              </span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Asset Status</span>
              <span className="ml-auto text-gray-900">
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
              </span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Insertion Date</span>
              <span className="ml-auto text-gray-900">{asset.date}</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Description</span>
              <span className="ml-auto text-gray-900">{asset.description}</span>
            </div>
            <div class="flex border-b-4 border-gray-300 pt-4 pb-2">
              <h1 className="text-blue-500 text-3xl title-font font-medium mb-2">Employee Information</h1>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500 pl-4">Employee</span>
              <span className="ml-auto text-gray-900">
                {employee.name + " " + employee.lastname}
              </span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500 pl-4">Department</span>
              <span className="ml-auto text-gray-900">
                {employee.department}
              </span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500 pl-4">Email</span>
              <span className="ml-auto text-gray-900">{employee.email}</span>
            </div>
            {/* Cancel and Generate PDF BUttons*/}

            <div className="flex justify-between mt-4">
              <Link
                to={`/Asset`}
                className=" inline-flex items-center text-black  rounded-lg font-medium text-md px-14 py-2 text-center font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500 "
              >Done</Link>

              <button
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-green-300 "
                onClick={() => generatePDF(asset, employee)}
              >Download</button>
            </div>
          </div>
          <div className="flex items-center" style={{ display: 'flex', marginLeft: '44px' }}>
            <QRcode id="myqr" value={id} size={450} includeMargin={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowPage;
