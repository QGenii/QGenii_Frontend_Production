

import React, { useState, useEffect } from "react";
import Img from "../../../../assets/assets/FirstLinkPage/Img.png";
import QRCode from "../../../../assets/assets/FirstLinkPage/QRCode.png";

export default function PaymentMethods() {
  const [method, setMethod] = useState("card"); // card, upi, wallet
  const [upiTab, setUpiTab] = useState("id"); // id = UPI ID, qr = QR Code
  const [timeLeft, setTimeLeft] = useState(null); // null = no timer
  const [UPI, setUPI] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("UPI Submitted:", UPI);
  };

  const handleUPIChange = (e) => {
    setUPI(e.target.value);
  };

  // ⏳ Start countdown when QR is active
  useEffect(() => {
    let timer;
    if (method === "upi" && upiTab === "qr" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [method, upiTab, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex flex-col justify-first items-center gap-[1.875rem]  ">
      <div className="flex justify-first items-first gap-[3.7rem]   min-h-2">
        {/* LEFT SIDE: Payment Options */}
        <div className="   w-[20.5625rem] ">
          <h2 className="text-lg font-medium mb-4 text-[1rem]">
            Select Payment Method
          </h2>

          <div className="flex flex-col gap-[1.875rem]  mb-6 w-[14.0625rem] ">
            {/* Cards */}
            <label className="flex items-center gap-2 cursor-pointer text-[0.875rem] font-normal">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={method === "card"}
                onChange={() => setMethod("card")}
                className="accent-blue-600"
              />
              <span className="">Cards</span>
              <div className="flex gap-2 ml-2 font-medium w-[14rem]   h-[2.0625rem]">
                <img src={Img} alt="Visa" className="h-6" />
              </div>
            </label>

            {/* UPI */}
            <label className="flex items-center gap-2 cursor-pointer text-[0.875rem] font-normal">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={method === "upi"}
                onChange={() => {
                  setMethod("upi");
                  setUpiTab("id"); // reset to UPI ID tab
                  setTimeLeft(null); // stop/reset timer
                }}
                className="accent-blue-600"
              />
              <span className="font-medium">UPI</span>
            </label>

            {/* Wallet */}
            <label className="flex items-center gap-2 cursor-pointer text-[0.875rem] font-normal">
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={method === "wallet"}
                onChange={() => setMethod("wallet")}
                className="accent-blue-600"
              />
              <span className="font-medium">Wallet</span>
            </label>
          </div>
        </div>

        {/* RIGHT SIDE: CARD FORM */}
        {method === "card" && (
          <div className="   rounded-b-lg shadow-inner flex justify-first items-first ">
            <div className="flex flex-col gap-5 items-first justify-first  w-[24.8625rem]  ">
              <div className="w-full max-w-md  rounded-lg shadow-md   py-3">
                <div>
                  <label className="text-[0.75rem] font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="border px-2 py-2 rounded-1 w-full focus:ring focus:ring-blue-300 text-[0.71rem]"
                  />
                </div>
                <div>
                  <label className="text-[0.75rem] font-medium">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="border px-2 py-2 rounded-1 w-full focus:ring focus:ring-blue-300 text-[0.71rem]"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <div>
                      <label className="text-[0.75rem] font-normal">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="flex items-center self-stretch px-2 py-2 rounded-1 w-[6rem] border text-[0.71rem]"
                      />
                    </div>
                    <div>
                      <label className="text-[0.75rem] font-medium">
                        CVC/CVV
                      </label>
                      <input
                        type="text"
                        placeholder="CVV"
                        className="flex items-center self-stretch px-2 py-2 rounded-1 w-[6rem] border text-[0.71rem]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: UPI FORM */}
        {method === "upi" && (
          <div className="flex flex-col justify-center items-center px-3">
            <div className="py-2 w-[24.3625rem] rounded-lg shadow-md bg-[#E8F2F8]">
              {/* Tabs */}
              <div className="flex gap-[0.625rem] p-[0.625rem]">
                <input
                  type="button"
                  value="UPI ID"
                  className={`text-center font-medium text-[0.875rem] py-[0.5rem] w-[11.25rem] ${upiTab === "id" ? "bg-white text-black" : "text-gray-700"
                    }`}
                  onClick={() => {
                    setUpiTab("id");
                    setTimeLeft(null); // stop/reset timer
                  }}
                />
                <input
                  type="button"
                  value="QR Code"
                  className={`text-center text-[0.875rem] font-medium py-[0.5rem] w-[11.25rem] ${upiTab === "qr" ? "bg-white text-black" : "text-gray-700"
                    }`}
                  onClick={() => {
                    setUpiTab("qr");
                    setTimeLeft(300); // ⏳ start countdown (5 mins)
                  }}
                />
              </div>

              {/* Tab Content */}
              <div className=" rounded-b-lg">
                {upiTab === "id" && (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center items-center">
                      <label
                        htmlFor="upi"
                        className="block text-[0.75rem] font-medium text-gray-700 w-[18.25rem]"
                      >
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={UPI}
                        id="upi"
                        onChange={handleUPIChange}
                        placeholder="UPI ID"
                        className="w-[18.25rem] px-4 py-2 border text-[0.71rem] border-gray-300 rounded-lg mb-4"
                      />
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">
                      <input
                        type="submit"
                        value="Continue"
                        className="bg-[#0C316E] cursor-pointer w-[9.25rem] py-[0.46875rem] text-[0.65rem] text-white font-medium rounded-[0.5625rem] text-center"
                      />
                    </div>
                  </form>
                )}

                {upiTab === "qr" && (
                  <div className="flex flex-col items-center justify-center   py-4 rounded">
                    <div className="flex flex-col items-center justify-center ">
                      <img
                        src={QRCode}
                        alt="QR Code"
                        className="w-[7rem] h-[7rem] aspect-[109/102]"
                      />
                      <p className="text-gray-700 ">
                        Open your UPI app to confirm Payment

                      </p>
                      {timeLeft !== null && (
                        <h4 className=" font-semibold text-[0.875rem]">
                          You have  <span className="text-red-600 text-center">{formatTime(timeLeft)}</span> to pay
                        </h4>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pay button only for Card */}
      {method === "card" && (
        <div className="flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Pay Now ₹1,239
          </button>
        </div>
      )}
    </div>
  );
}
