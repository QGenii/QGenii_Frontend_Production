import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className=" py-[5.5625rem] text-center mt-[4rem] bg-[linear-gradient(90deg,#1E1E1E_0%,#000080_100%)] ">
      {/* <div className="flex flex-col gap-4 py-[5.5625rem]"> */}
      <div className="flex flex-col items-center h-full  gap-[1.375rem]">
        <h5 className="text-[2rem] font-medium   text-white w-[44.6875rem]  ">
      Discover what CodeIQGenius Business Pro can do for your organization
        </h5>
       

       <Link to='/cohortlearningrequestdemo'> <button className="bg-white ">
          Request a Demo
        </button></Link>
      </div>

    
      {/* </div> */}
    </section>
  );
}
