import React, { useState } from "react";
import QrReader from "modern-react-qr-reader";
import { useNavigate } from "react-router-dom";

export default function ScanQR() {
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const handleScan = (data) => {
    if (data) {
      setResult(data);

      console.log(result);
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
      id="info-popup"
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
          <div class="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
            <h3 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Privacy info
            </h3>
            <QrReader
              fluid={false}
              delay={300}
              facingMode={"environment"}
              onError={handleError}
              onScan={handleScan}
            />
            <p>{result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
