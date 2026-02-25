import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-[#1E1E1E] to-[#000080] py-16 px-6 text-center mt-7  ">
      {/* <div className="flex flex-col gap-4 py-[5.5625rem]"> */}
      <div className="flex flex-col items-center h-full  gap-[1.375rem]">
        <h5 className="text-[2rem] font-medium   text-white w-[37.6875rem]  ">
        We’re your strategic learning partner.
        <br />Let's move skills forward together.
        </h5>
       

       <Link to='/requestdemo'> <button className=" ">
          Request a Demo
        </button></Link>
      </div>

    
      {/* </div> */}
    </section>
  );
}
