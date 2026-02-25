import React from "react";

export default function BillingForm() {
  return (
    <div className="  text-[1rem] font-medium flex flex-col  px-1">
      <h4 className="text-[1.5rem] font-semibold">Billing Address</h4>

      <div className="mb-1">
        <label htmlFor="">Company Name</label>
        <input type="text"  className="block w-[50%] p-2 border border-gray-600 rounded-lg  outline-none mb-1 text-[1rem]"/>
        <label htmlFor="">Address</label>
        <input type="text"  className="block w-[50%] p-2 border border-gray-600 rounded-lg  outline-none border-g mb-1 text-[1rem]"/>
      </div>

      <div  className=" grid grid-cols-2  ">
      <div>
        <label className="block text-[1rem] font-normal mb-1">Country</label>
        <select className="w-[20.15rem] border rounded-1 p-2 text-[.71rem] font-medium rounded-lg ">
          <option>India</option>
          <option>USA</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1 text-[1rem] font-normal">State</label>
        <select className="w-[20.15rem] border rounded-1 p-2 text-[.71rem] font-medium rounded-lg ">
          <option>Bihar</option>
          <option>Delhi</option>
        </select>
      </div>
      </div>
      <h4 className="text-[0.75rem] font-normal mt-2">CodeIQGenius is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</h4>
    </div>
  );
}
