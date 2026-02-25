import React from 'react'
import Logo from '../../../../../assets/assets/WhatWedo/AiUpskilling/Logo.png';
import bgimg from '../../../../../assets/assets/WhatWedo/AiUpskilling/bgimg.jpg';
import { Link } from 'react-router-dom';

const AiUpskillingSection1 = () => {
  return (  
              
    
              <div
                style={{
                  backgroundImage: `url(${bgimg}) `,
                }}
                className="learning-eco-system-container w-full h-[441px] grid items-center   bg-center mb-10 "
              >
                <div className="learning-eco-system-content flex items-center justify-evenly gap-[10rem]   ">
                  {/* Left Side */}
                  <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
                    <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
                     AI UPSKILLING
                    </h4>
                    <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[39.8125rem] mb-1">
                      
                    AI is rewriting the rules of business
                    </h2>
                    <div
                      style={{ fontSize: "0.875rem" }}
                      className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[36.4rem]"
                    >
                    Equip your workforce with all levels of AI training, including role-specific use cases.
                    </div>
    
                    <div className="flex w-[30rem]  gap-3">
                      <button className="px-[2rem] py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                     <Link to='/home1'>   Request a demo</Link>
                      </button>
                      <Link to='/aistarterpath'>
                      {/*  14 day free trail button*/}
                      <input
                        type="button"
                        className=" px-[2.5rem] py-3 text-[#0c316e] border-1 font-poppins font-semibold text-center rounded-md shadow-md transition cursor-pointer border border-brand"
                        value="Explore AI starter Paths"
                      />
                      </Link>
                    </div>
                  </div>
    
                  {/* Right Side */}
                  <div className="learning-eco-system-right-side w-[26.375rem] h-[25.97919rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
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

export default AiUpskillingSection1