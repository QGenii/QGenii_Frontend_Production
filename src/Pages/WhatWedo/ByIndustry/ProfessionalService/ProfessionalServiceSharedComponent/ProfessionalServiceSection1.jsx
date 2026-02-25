



import React from 'react'
import Logo from '../../../../../assets/assets/WhatWedo/ByIndustry/ProfessionalService/Logo.png';
import bgimg from '../../../../../assets/assets/WhatWedo/ByIndustry/ProfessionalService/bgimg.jpg';
import { Link } from 'react-router-dom';
const TechnologySection1 = () => {
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
                        PROFESSIONAL SERVICES                 </h4>
                    <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[39.75rem] mb-1">

                       Empowering your IT professional services firm to drive revenue and reduce costs
                    </h2>
                    <div
                        style={{ fontSize: "0.875rem" }}
                        className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[40.4rem]"
                    >
                      Upskill your consultants with cutting-edge skills in AI, cloud computing, and DevOps. Deliver results, reduce non-billable hours, and increase project efficiency.        </div>
                    <div className="flex w-[30rem]  gap-3">
                        <button className="px-2 py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                            <Link to='/requestdemo'>Request a demo</Link>
                        </button>

                    </div>
                </div>

                {/* Right Side */}
                <div className="learning-eco-system-right-side w-[31.15625rem] h-[22.4rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
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


export default TechnologySection1