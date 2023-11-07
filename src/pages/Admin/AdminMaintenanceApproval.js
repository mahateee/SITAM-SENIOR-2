import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/index";
import { formatDate } from "../../component/functions/formatDate";

const AdminMaintenanceApproval = ({ requests, onApprove, onReject }) => (
  <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
    <h3 class="mb-2 text-xl font-bold text-gray-900">
      New Maintenance Requests ✅{" "}
    </h3>
    <span className="text-base font-normal text-gray-500">
    Requests Awaiting Approval or Rejection.
    </span>
    <div class="flex flex-col mt-6">
      <div class="overflow-x-auto rounded-lg">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden shadow sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 ">
              <thead class="bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    class="p-4 text-center text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Requester
                  </th>
                  <th
                    scope="col"
                    class="p-4 text-center text-xs font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Desired Date
                  </th>
                  <th
                    scope="col"
                    class="p-4 text-xs text-center font-medium tracking-wider text-left text-gray-500 uppercase "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white text-center ">
                {requests.length > 0 ? (
                  requests.map((main, id) => (
                    <tr key={id} className="border-b">
                      <th
                        scope="row"
                        className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap"
                      >
                        {main.user}
                      </th>
                      <td className="p-4 text-sm font-normal   text-gray-900 whitespace-nowrap">
                      {main.formattedDate}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
                        <button
                          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                          onClick={() => onApprove(main.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                          onClick={() => onReject(main.id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-600  py-4">
                      No new requests for approval.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminNewRequestsTable = () => {
  const [MaintainanceList, setMaintainance] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "Maintainance_Requests"),
      where("status", "==", "Waiting")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dateField = data.date;
        todosArray.push({
          ...data,
          id: doc.id,
          formattedDate: dateField ? formatDate(dateField) : "N/A", // Use "N/A" or any default value if date is undefined
        });
      });
      console.log("Fetched data:", todosArray); // Add this line
      setMaintainance(todosArray);
    });
    return () => unsub();
  }, []);
  
  const handleApprove = (requestId) => {
    updateRequestStatus(requestId, "Pending");
  };

  const handleReject = (requestId) => {
    updateRequestStatus(requestId, "Canceled");
  };
  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, "Maintainance_Requests", requestId);

      // Update the status field to "Approved" and set approved to true
      await updateDoc(requestRef, { status: newStatus, approved: true });

      setMaintainance((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
      console.log(`Request ${requestId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };
  return (
    <div className="overflow-x-auto">
      {/* Display the table for new requests awaiting approval */}
      <AdminMaintenanceApproval
        requests={MaintainanceList}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminNewRequestsTable;
