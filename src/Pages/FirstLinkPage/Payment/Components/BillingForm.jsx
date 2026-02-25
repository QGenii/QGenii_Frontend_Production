import React from "react";

export default function BillingForm() {
  return (
    <div className="  text-[1rem] font-medium flex flex-col  px-1">
      <h4>Billing Address</h4>
<div  className=" grid grid-cols-2  ">
      <div>
        <label className="block text-[1rem] font-normal mb-1">Country</label>
        <select className="w-[20.15rem] border rounded-1 p-2 text-[.71rem] font-medium">
          <option>India</option>
          <option>USA</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1 text-[1rem] font-normal">State</label>
        <select className="w-[20.15rem] border rounded-1 p-2 text-[.71rem] font-medium">
          <option>Bihar</option>
          <option>Delhi</option>
        </select>
      </div>
      </div>
    </div>
  );
}
