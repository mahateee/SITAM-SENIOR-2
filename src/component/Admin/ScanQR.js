import React, { useState, useRef } from "react";
import QrReader from "modern-react-qr-reader";
import { useNavigate } from "react-router-dom";
export default function ScanQR({ onClose }) {
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const [delayScan, setDelayScan] = useState(500);
  const handleScan = (data) => {
    if (data) {
      setResult(data);

      console.log(result);
      setDelayScan(false);
      setTimeout(() => {
        navigate(`/Asset/show/${result}`);
      }, "1000");
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div
      id="deleteModal"
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 flex  justify-center items-center w-screen md:inset-0 h-modal md:h-screen"
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
          <button
            onClick={onClose}
            type="button"
            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <QrReader
          id="video"
          delay={300}
          scanDelay={delayScan}
          style={{ width: "100%" }}
          facingMode={"environment"}
          onError={handleError}
          onScan={handleScan}
          constraints={{ facingMode: "environment" }}
          videoStyle={{ width: "100%" }}
        />
        <p>{result}</p>
      </div>
    </div>
  );
}
