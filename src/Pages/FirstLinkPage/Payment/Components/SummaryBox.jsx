import React from "react";

export default function SummaryBox() {
  return (
    <div className="border rounded-xl w-[19.3rem] h-[12.75rem] shadow-sm px-[1.3125rem] py-[0.68rem] ">
      <div className="flex flex-col w-[17.25rem]  gap-[1.25rem] items-first justify-center ">
      <h4 className="font-semibold text-[1.25rem]">Summary</h4>
      <div className="flex justify-between mt-2">
        <span>Total Due:</span>
        <span className="font-bold">₹ 3,999</span>
      </div>
      <hr />
      <div className="flex justify-between mt-1 text-sm">
        <span>Yearly Access:</span>
        <span>₹ 3,999</span>
      </div>
      </div>
    </div>
  );
}
