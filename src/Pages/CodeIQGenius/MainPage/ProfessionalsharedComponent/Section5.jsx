import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="   text-center mt-[5rem] bg-[linear-gradient(90deg,#1E1E1E_0%,#000080_100%)] py-[5.5625rem]">
      {/* <div className="flex flex-col gap-4 py-[5.5625rem]"> */}
      <div className="flex flex-col items-center h-full  gap-[1.375rem]">
        <h5 className="text-[2rem] font-medium   text-white w-[37.6875rem]  ">
       Professional Services are here to put you ahead
        </h5>
       
       {/* click go to professionalService get in touch */}
       <Link to='/requestdemo'> <button className="bg-white  cursor-pointer">
          Get in touch
        </button></Link>
      </div>

    
      {/* </div> */}
    </section>
  );
}
