import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import frame from "../images/InsideFrame.svg";
import logo from "../images/OTP.png";
import { useAuth } from "../context/AuthContext";

function OTPPage({ phoneNumber }) {
  const { verifyPhoneNumber, resendVerificationCode } = useAuth();
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      // Combine the digits into a single string
      const formattedCode = verificationCode.join("");
      // Call the function to verify the OTP
      await verifyPhoneNumber(phoneNumber, formattedCode);
      // You can add further logic here after successful OTP verification
      // For example, navigate to another page or update the UI
      navigate("/user"); // Navigate to the user dashboard after successful verification
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async (event) => {
    event.preventDefault();

    try {
      setError("");
      // Call the function to resend the verification code
      await resendVerificationCode(phoneNumber);
      // You can add UI feedback here, such as a success message
      console.log("Verification code resent successfully");
    } catch (error) {
      setError("Failed to resend verification code. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center overflow-hidden h-screen"
      style={{
        backgroundImage: `url(${frame})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative flex min-h-screen flex-col justify-center py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg border rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Phone Number Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your phone number +966-000-000</p>
              </div>
            </div>
            <div>
              <form action="" method="post" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="w-16 h-16">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name={`digit-${index}`}
                          id={`digit-${index}`}
                          maxLength="1"
                          value={verificationCode[index - 1]}
                          onChange={(e) => {
                            const updatedCode = [...verificationCode];
                            updatedCode[index - 1] = e.target.value;
                            setVerificationCode(updatedCode);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
                        type="submit"
                      >
                        Verify Login
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive the code?</p>{" "}
                      <button
                        onClick={handleResend}
                        className="cursor-pointer focus:outline-none"
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPPage;
