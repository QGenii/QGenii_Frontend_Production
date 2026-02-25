import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="  py-16 px-6 text-center mt-7 bg-[linear-gradient(90deg,#1E1E1E_0%,#000080_100%)]">
      <div className="flex flex-col gap-4 py-[5.5625rem]">
      <div className="flex flex-col items-center justify-center h-full  gap-[1.375rem]">
        <h5 className="text-2xl md:text-3xl font-semibold text-white">
        What will learning do for your organization?
        </h5>
        <h4 className=" text-[0.675rem] text-white font-normal">
          See the impact of online learning for businesses. Let’s start on a plan that supports your goals.
        </h4>

       <Link to='/requestdemo'> <button className="bg-white ">
          Request a Demo
        </button></Link>
      </div>

      <div className="">
        <span className="text-[0.675rem] text-white font-normal">
          Small team? 
        </span>
        <a
          href="/smalltrainingpage"
          className=" underline ml-1 text-[0.675rem] text-white font-normal
       " >
          Start with Team Plan.
        </a>
      </div>
      </div>
    </section>
  );
}
