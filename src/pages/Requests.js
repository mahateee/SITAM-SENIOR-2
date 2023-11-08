import React from "react";
import Sidebar from "../component/Sidebar";
import PreviousRequests from "../component/PreviousRequests";
import { useLocation } from 'react-router-dom';
import Alerts from "../component/Alerts"

function Requests() {
  const location = useLocation();
  const showSuccessAlert = location.state?.showSuccessAlert || false;
  return (
    <>
      <Sidebar />
      <div class="px-24 pt-6">
        {/* Your Request page content here */}
        {showSuccessAlert && (
          <div style={{ position: 'absolute', top: '90px', right: '10px' }}>
            <Alerts />
          </div>
        )}
        {/* Adding space between components */}
        <div className="mb-8 lg:mb-12" />{" "}
        <PreviousRequests />
        {/* Adding space between components */}
        <div className="mb-8 lg:mb-12" />{" "}
      </div>
    </>

  );
}

export default Requests;
