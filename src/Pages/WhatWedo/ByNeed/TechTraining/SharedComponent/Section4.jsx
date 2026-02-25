import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-[#1E1E1E] to-[#000080] py-16 px-6 text-center mt-7">
      <div className="flex flex-col gap-4 py-[5.5625rem]">
      <div className="flex flex-col items-center justify-center h-full  gap-[1.375rem] ">
        <h5 className="text-2xl md:text-3xl font-semibold text-white">
      Fast-track tech development at your company
        </h5>
        <h4 className=" text-[0.675rem] text-white font-normal">
         Advance technical skills growth with our on-demand learning solution.
        </h4>

       <Link to='/requestdemo'> <button className="bg-white ">
          Learn more
        </button></Link>
      </div>

      <div className="">
        <span className="text-[0.675rem] text-white font-normal">
          Find out what our Enterprise Plan can do for your business.
        </span>
        <br />
        <a
          href="/smalltrainingpage"
          className=" underline ml-1 text-[0.675rem] text-white font-normal
       " >
         Request Demo
        </a>
      </div>
      </div>
    </section>
  );
}
