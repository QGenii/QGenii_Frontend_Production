import React from "react";

export default function OrderSummary() {
  return (
    <div className=" w-[51.rem] shadow-sm flex h-36 py-[1.375rem] px-[2.5rem] flex-col  rounded-[0.625rem] border border-[#8686A1]/50 bg-[#FDFDFD] shadow-[ -1px_4px_12px_0_rgba(12,49,110,0.10) ]">
      <h4 className="font-medium font-poppins text-[1rem]">Order Summary</h4>
      
      <div className="flex justify-between gap-2 mt-2 text-[0.875rem] capitalize font-normal">
        <span className="text-zinc-700">Item Name</span>
        <span>₹ 1,239</span>
      </div>
      <div className="flex justify-between mt-1 text-[0.875rem] capitalize font-normal">
        <span className="text-zinc-700">Price Breakdown</span>
        <span>₹ 1,239</span>
      </div>
    </div>
  );
}
