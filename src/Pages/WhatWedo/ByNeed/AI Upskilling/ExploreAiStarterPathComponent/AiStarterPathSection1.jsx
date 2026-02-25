import React from 'react'
import Logo from '../../../../../assets/assets/WhatWedo/AiUpskilling/Logo.png';
import bgimg from '../../../../../assets/assets/WhatWedo/AiUpskilling/AiStarterPath/bgimg.jpg';
import { Link } from 'react-router-dom';

const AiStarterPathSection1 = () => {
  return (  
              
    
              <div
                style={{
                  backgroundImage: `url(${bgimg}) `, backgroundPosition: 'cover',
                }}
                className="learning-eco-system-container w-full h-[27.5rem] grid items-center   bg-center mb-10 "
              >
                <div className="learning-eco-system-content flex items-center justify-end gap-[10rem] w-[85%]  ">
                  {/* Left Side */}
                  <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
                    <h4 className="text-white font-poppins text-[1rem] font-semibold uppercase mb-1">
                     AI Starter Paths
                    </h4>
                    <h2 className="text-white font-poppins text-[2.25rem] font-medium capitalize w-[39.8125rem] mb-1">
                      
                   Make AI your ally with an AI Starter Path
                    </h2>
                    <div
                      style={{ fontSize: "0.875rem" }}
                      className="text-white font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[36.4rem]"
                    >
                    Upskill everyone at your organization with curated learning paths focused on the specific AI skills they need for their roles
                    </div>
    
                    <div className="flex w-[30rem]  gap-3">
                      <button className="px-[2rem] py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                     <Link to='/home1'>   Request a demo</Link>
                      </button>
                      <Link to='/teamsuccesspage'>
                      {/*  14 day free trail button*/}
                      <input
                        type="button"
                        className=" px-[2.5rem] py-3 text-white border-1 font-poppins font-semibold text-center rounded-md shadow-md transition cursor-pointer border border-white"
                        value="14 Day Free- Trail"
                      />
                      </Link>
                    </div>
                  </div>
    
                  {/* Right Side */}
                  {/* <div className="learning-eco-system-right-side w-[26.375rem] h-[25.97919rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
                    <img
                      src={Logo}
                      alt="Enterprise Training"
                      className="object-cover rounded-lg shadow"
                    />
                  </div> */}
                </div>
              </div>
  )
}

export default AiStarterPathSection1