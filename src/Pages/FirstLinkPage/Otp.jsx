import React, { useState, useEffect } from "react";

// import Signup_page from "../../../public/Signup_page.png";
import { useLocation } from "react-router-dom";

export default function Otp() {
  const location = useLocation();
  const email = location.state?.email || "your email";

  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  return (
   

     <div className="w-full py-16 px-6 flex flex-col items-center ">
          {/* Heading */}
          <h4 className="text-[1.875rem] md:text-3xl font-semibold text-center mb-10">
            Start Your premium Learning Journey
          </h4>
    
          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-[15rem] items-center max-w-5xl w-full ">
            {/* otp Form */}

         
      <div className="shadow-lg rounded-2xl  h-[30.75rem] w-[30.75rem]   ">
<div className="flex flex-col justify-center items-center h-full">
<div className="py-[3rem] px-[1rem]  flex flex-col justify-center items-center gap-[1rem]">

  <div className="w-[21.3125rem]   text-center  ">
        <h4 className="text-[1rem] font-normal ">
          Enter the 6 digit code that sent to
        </h4>
        <span className="font-semibold mb-6 text-[1.25rem]">{email}</span>
</div>
        {/* OTP Inputs */}
        <div className="flex justify-between  gap-[1.25rem]">
          {Array(6)
            .fill("")
            .map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className="w-10 h-12 border rounded-md text-center text-lg"
              />
            ))}
        </div>

        <button className="  text-white  rounded px-3">
         <span className="bg-[#0C316E] px-[2.625rem] py-[0.1rem]"> Enter</span> 
        </button>

        <div className="flex flex-col justify-center items-center gap-[0.5rem]">

        <h4 className="text-[#1AA639] text-[0.625rem] text-center ">
          {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer} Sec` : ""}
        </h4>

        <p className="text-black text-[0.75rem]">
          Didn't get Code?{" "}
          <input type="button"
          value="Resend Code"
            disabled={timer > 0}
            onClick={() => setTimer(15)}
            className={`ml-1 text-[0.75rem] font-semibold ${
              timer > 0
                ? "text-gray-500 cursor-not-allowed"
                : "text-[#0C316E] underline"
            }`}
          />
            
        </p>
        </div>
  </div>    

  </div>  
      </div>


            
    
            {/* Illustration (replace with your image) */}
            <div className="flex  h-[33.5rem] w-[33.5rem] aspect-square ">
              <img
                src="../../Signup_page.png"
                alt="Learning signup"
                className="w-80 md:w-[400px]"
              />
            </div>
    
    
          </div>
    
    
         
    
    
    
    
        </div>
  );
}
