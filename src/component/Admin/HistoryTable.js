import React, { useEffect, useState } from "react";
// import { firestore } from '../firebase';
import {generateHistoryPDF} from "../../pages/Admin/generatePDF";
import { db, firestore } from "../../firebase";
import {
  collection,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { formatDate } from "../functions/formatDate";
const HistoryTable = ({ assetId }) => {
  const [history, setHistory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const q = query(collection(db, "History"), where("assetId", "==", id));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const historyArray = [];
      const promises = [];
      querySnapshot.forEach((queryDoc) => {
        const historyData = queryDoc.data();
        const empRef = doc(db, "Account", historyData.updatedData.employeeId);

        const promise = getDoc(empRef)
          .then((accountDoc) => {
            const accountData = accountDoc.data();
            const updatedHistoryData = {
              ...historyData,
              accountInfo: accountData,
              formattedDate: formatDate(historyData.timestamp),
            };
            historyArray.push(updatedHistoryData);
          })
          .catch((error) => {
            console.log("Error fetching account info:", error);
          });

        promises.push(promise);
      });

      await Promise.all(promises);
      setHistory(historyArray);
    });

    return () => unsubscribe();
  }, [assetId]);
  
  return (
    <div class="relative overflow-x-auto max-h-[400px]"> 
      <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" class="px-6 py-3">
              Timestamp
            </th>
            <th scope="col" class="px-6 py-3">
              Asset Status
            </th>
            <th scope="col" class="px-6 py-3">
              Employee Name
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, id) => (
            <tr key={id} class="bg-white border-b ">
              <td class="px-6 py-4">{entry.formattedDate}</td>
              <td class="px-6 py-4">
                {JSON.stringify(entry.updatedData.Status)}
              </td>
              <td class="px-6 py-4">{entry.accountInfo.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Cancel and Generate PDF BUttons*/}
      <div className="flex justify-between mt-4">
                            <Link
                                to={`/Asset`}
                                className=" inline-flex items-center text-black  rounded-lg font-medium text-md px-14 py-2 text-center font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500 "
                            >Done</Link>
                          
                            <button
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-purple-500 "
                                onClick={() => generateHistoryPDF(history)}  
                                // Call generateHistoryPDF with the history data
                            >Download</button>
                        </div>
    </div>
  );
};

export default HistoryTable;
