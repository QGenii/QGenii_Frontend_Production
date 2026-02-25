



import React from 'react'
import Logo from '../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Logo.png';
import bgimg from '../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/bgimg.jpg';
const Section1 = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgimg}) `,
      }}
      className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
    >
      <div className="learning-eco-system-content flex items-center justify-evenly gap-[5rem]   ">
        {/* Left Side */}
        <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
          <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
      FOR LEARNING & DEVELOPMENT TEAMS             </h4>
          <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[39.75rem] mb-1">

       When people grow, business does too
          </h2>
          <div
            style={{ fontSize: "0.875rem" }}
            className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[40.4rem]"
          >
Give your people the tools they need to learn and lead
          </div>
          <div className="flex w-[30rem]  gap-3">
            <button className="px-2 py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
              Get Started
            </button>

          </div>
        </div>

        {/* Right Side */}
        <div className="learning-eco-system-right-side w-[32.15625rem] h-[23.4rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
          <img
            src={Logo}
            alt="Enterprise Training"
            className="object-cover rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  )
}


export default Section1