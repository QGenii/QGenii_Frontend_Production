
import React from "react";

export default function PlanSelection() {
  return (
    <div className="flex gap-[8.5rem]">
      <div className="border p-[ 0.0625rem] rounded-xl  w-[18.875rem] h-[ 12.4375rem] bg-green-100 border-green-500 text-center">
        <h4 className="font-normal h-[4.08rem] flex flex-col justify-center items-center text-[0.875rem] text-center text-black  rounded-t-[0.5625rem] bg-[rgba(0,255,55,0.19)]" >Annual Subscription</h4>
        <div className="py-2">    <h4 className="text-[1.25rem] font-semibold mt-2">₹ 3,999 <span className="text-[1.25rem] font-normal">/Year</span></h4>
          <h4 className="text-[1rem] text-[#006015]">Save 20% </h4>
          <h4 className="text-[#006015] text-[1rem]" >(Best Plan)</h4></div>
      </div>

      <div className="border p-[ 0.0625rem] rounded-xl  w-[18.875rem] h-[ 12.4375rem] bg-[#fff] border-green-500 text-center">
        <h4 className="font-normal   text-[0.875rem] h-[4.08rem] flex flex-col justify-center items-center text-black  rounded-t-[0.5625rem] bg-[#F2F2F2]" >Monthly Subscription</h4>
        <div className="py-2">
          <h4 className="text-[1.25rem] font-semibold mt-2">₹ 400 <span className="text-[1.25rem] font-normal">/Months</span></h4>
        <h4 className="text-[1rem] font-normal">Cancel Anytime</h4>
        </div>

      </div>
    </div>
  );
}
