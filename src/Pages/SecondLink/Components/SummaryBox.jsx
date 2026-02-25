import React from "react";

export default function SummaryBox() {
  return (

    <div className="flex flex-col gap-[0.625rem]">
    <div className="border rounded-xl w-[19.3rem] h-[16.75rem] shadow-sm px-[1.3125rem] py-[0.68rem] ">
      <div className="flex flex-col w-[17.25rem]  gap-[1.25rem] items-first justify-center ">
      <h4 className="font-semibold text-[1.25rem]">Summary</h4>
      <div className="flex justify-between mt-2 text-[0.875rem]">
        <span className="text-[0.875rem]">Billing Annually  </span>
        <span className="text-[0.875rem]" >₹ 3,999</span>
      </div>
      
      <div className="flex justify-between mt-1 ">
        <span className="capitalize text-[0.875rem]">Number of licences</span>
        <span className="text-[0.875rem]">₹ 10</span>
      </div>
      <div className="flex justify-between mt-1 text-[0.875rem]">
        <span className="capitalize text-[0.875rem]text-[0.875rem]">Price per licences</span>
        <span className="text-[0.875rem]">₹ 24,000/yr</span>
      </div>
      <hr />
      <div className="flex justify-between mt-1 text-sm">
        <span >Total Due:</span>
        <span className="font-bold">₹ 24,000</span>
      </div>
     


      </div>

    </div>
    <div className="flex justify-center">

    <button>Buy Team plan</button>
    </div>

    </div>
  );
}
