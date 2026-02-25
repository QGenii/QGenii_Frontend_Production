import React, { useState } from "react";

export default function TransactionsTabs() {
  const [tab, setTab] = useState("purchases");

  const tabs = [
    { key: "purchases", label: "Purchases" },
    { key: "subscriptions", label: "Subscriptions" },
    { key: "refunds", label: "Refunds" }
  ];

  const activeStyle = "bg-[#2800AE] text-white ";
  const inactiveStyle = "bg-white text-black  border";

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-4 justify-center mb-6">
        {tabs.map((t) => (
          <span
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              tab === t.key ? activeStyle : inactiveStyle
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="  p-6  ">
        {tab === "purchases" && (
          <div>
            <table className=" border-collapse mx-auto">
              <thead>
                <tr className="text-left  text-gray-700  border-b ">
                  <th className="py-3 px-4 text-[0.875rem] font-medium w-[6rem] text-nowrap pl-2"></th>
                  <th className="py-3 px-4 text-[0.875rem] font-medium w-[6rem] text-nowrap">Date</th>
                  <th className="py-3 px-4 text-[0.875rem] font-medium w-[6rem] text-nowrap">Total Price</th>
                  <th className="py-3 px-4 text-[0.875rem] font-medium w-[6rem] text-nowrap">Payment Type</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4  text-[0.875rem]  w-[6rem] text-nowrap text-[#2800AE] font-medium">Name of the video/Course</td>
                  <td className="py-4 px-4  text-[0.875rem] font-medium w-[6rem] text-nowrap text-gray-700">Mon dd, yyyy</td>
                  <td className="py-4 px-4  text-[0.875rem] font-medium w-[6rem] text-nowrap text-gray-700">₹499</td>
                  <td className="py-4 px-4  text-[0.875rem] font-medium w-[6rem] text-nowrap text-gray-700">Card No</td>

                  <td className="py-4 flex gap-3 pr-2">
                    <span className="px-4 py-2 border border-[#2800AE] rounded-md text-[#2800AE] text-sm font-medium hover:bg-[#f2efff]">Receipt</span>
                    <span className="px-4 py-2 border border-[#2800AE] rounded-md text-[#2800AE] text-sm font-medium hover:bg-[#f2efff]">Invoice</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {tab === "subscriptions" && (
          <div className="text-center text-gray-600 mt-10 text-sm">No subscriptions Yet</div>
        )}

        {tab === "refunds" && (
          <div className="text-center text-gray-600 mt-10 text-sm">No Refunds</div>
        )}
      </div>
    </div>
  );
}
