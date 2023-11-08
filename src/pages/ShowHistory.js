import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import {generateHistoryPDF} from "./Admin/generatePDF";
import HistoryTable from "../component/Admin/HistoryTable";
import frame from "../images/FrameInside.svg";

function ShowHistory() {
    const { id } = useParams();
    const [asset, setAsset] = useState({});
    const [employee, setEmployee] = useState({});
    const [history, setHistory] = useState([]); // Add a state for history
 
    useEffect(() => {
        const fetchAssetAndAccount = () => {
            const docRef = doc(db, "asset", id);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const assetData = docSnap.data();
                        setAsset(assetData);

                        const empRef = doc(db, "Account", assetData.employeeId);
                        return getDoc(empRef);
                    } else {
                        console.log("No such asset!");
                    }
                })
                .then((empDoc) => {
                    if (empDoc && empDoc.exists()) {
                        setEmployee(empDoc.data());
                    } else {
                        console.log("No such Account!");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching asset and account:", error);
                });
        };
        if (id) {
            fetchAssetAndAccount();
        }
    }, [id]);

    return (
        <section className="flex items-center justify-center h-screen" style={{ backgroundImage: `url(${frame})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '1100px' }}>
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto bg-white rounded-lg border border-white p-8 items-center content-center flex shadow-xl">
                    <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <div class="flex border-b-4 border-gray-300 pt-4 pb-2">
                            <h1 className="text-blue-500 text-3xl title-font font-medium mb-2">Asset History</h1>
                        </div>
                        <>
                            <HistoryTable assetId={asset.id} setHistory={setHistory} /> {/* Pass setHistory function to HistoryTable */}
                        </>
                      
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShowHistory;
