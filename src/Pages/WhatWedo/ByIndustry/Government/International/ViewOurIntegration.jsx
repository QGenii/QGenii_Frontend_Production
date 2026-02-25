import React from 'react'
import Header from '../../../../../Components/Header'
import { Link } from 'react-router-dom'
import { useState } from 'react';

import Logo3 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Logo3.png';
import bgimg3 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/bgimg3.jpg';

const integrations = new Array(12).fill({
    name: "Name Of The Record",
    category: "Category Name",
    button: "Learn More"
});
const ViewOurIntegration = () => {

    const [search, setSearch] = useState("");

    return (
        <div className='w-full h-[282rem] bg-[#fff]'>

            <Header />

            {/* section 1 */}
            <div
                style={{
                    backgroundImage: `url(${bgimg3}) `,
                }}
                className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
            >
                <div className="learning-eco-system-content flex items-center  justify-center  ">
                    {/* Left Side */}
                    <div className="learning-eco-system-left-side font-poppins flex flex-col  w-[57.4rem] items-center   ">
                        <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
                            Qgenii Integrations Directory              </h4>
                        <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize  mb-1">

                            Connect your tech to drive learning faster
                        </h2>
                        <div
                            style={{ fontSize: "0.875rem" }}
                            className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[49rem] text-center "
                        >
                            No matter what your company's learning objectives are, our integration partners are here to help you achieve them — in a simple and seamless way. See our list of current partners below.  </div>
                        <div className="flex items-center justify-center w-[30rem]  gap-3">

                            <button className="px-[2.5rem] py-3 bg-[#2800AE] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                                <Link to='/partnerwithus' className='px-3'>Partner with us</Link>
                            </button>

                        </div>
                    </div>

                    {/* Right Side */}
                    <div className=" w-[26.15625rem] h-[25.4rem]  aspect-[195/188] flex-shrink-0  overflow-hidden mr-3 ">
                        <img
                            src={Logo3}
                            alt=""
                            className="object-cover rounded-lg shadow"
                        />
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className="min-h-screen bg-white text-[#1A1A1A] p-6">
                {/* Header Search Bar */}
                <div className="flex justify-center mb-3 gap-3">
                    <div className="flex items-center w-full max-w-2xl border border-gray-300 rounded-lg  shadow-sm">
                        <input
                            type="text"
                            placeholder="Search integrations"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-6 py-3 rounded-full focus:outline-none"
                        />
                       
                    </div>
                     <button className="bg-[#3E00FF] text-white font-medium px-6 py-3 rounded">
                            Search
                        </button>
                </div>

                {/* Top Filter */}
                <div className=''>
                    <div className='w-[90%]   mx-auto underline'>
                        <a href="#" className="text-sm text-[#2800AE]">
                            Clear Filters
                        </a>
                    </div>
                    <div className=' w-[90%] mx-auto py-2'>
                        <h4 className="font-semibold mb-2">Technology Integrations</h4>
                        <div className="flex flex-wrap gap-4 justify-center mb-8 text-sm">
                            {[
                                "Communication",
                                "LMS/LXP",
                                "Marketplace",
                                "Performance Management",
                                "Reporting",
                                "Skills Management",
                                "SSO/SCIM",
                                "Reports",
                                "Talent Experience",
                            ].map((filter) => (
                                <label key={filter} className="flex items-center gap-2">
                                    <input type="radio" name="tech" className="accent-[#3E00FF]" />
                                    {filter}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex  justify-between w-[80%]  mx-auto ">
                    {/* Left Sidebar Filters */}
                    <div className=" md:col-span-1">




                        <div>
                            <h4 className="font-semibold mb-2">Strategic Partnerships</h4>
                            <div className="flex flex-col gap-2 text-sm">
                                {["Content Endorsement", "Marketplace", "Management"].map((item) => (
                                    <label key={item} className="flex items-center gap-2">
                                        <input type="radio" name="partnership" className="accent-[#3E00FF]" />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3  w-[50.3rem]">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-semibold">
                                Explore All Partnerships & Integrations
                            </h2>
                            <span className="text-sm text-[#3E00FF] cursor-pointer">
                                60 Results Found
                            </span>
                        </div>

                     
                        <div className="mt-[1rem]  text-center ">
                            <div className="flex flex-col justify-between items-center w-[50.375rem]  mx-auto gap-[1.875rem]">



                                {/* Course Cards */}
                                <div className="flex flex-wrap justify-center gap-x-[1.88rem] gap-y-[2.25rem] mb-10 ">
                                    {integrations.map((course) => (
                                        <div
                                            //   key={course.id}
                                            className="flex w-[14.3875rem] p-[0.5625rem_0.5075rem] flex-col justify-center items-start gap-[0.46138rem] rounded-[0.46138rem] border-[0.738px] border-[#8686A1] bg-white shadow-[-0.738px_2.953px_8.858px_0_rgba(12,49,110,0.10)] "
                                        >
                                            {/* Image Placeholder */}
                                            <div className="w-full h-[5rem] bg-gray-200 mb-4 rounded-md"></div>

                                            <div className="flex flex-col items-start justify-start gap-[0.28363rem] w-full ">
                                                {/* Title */}
                                                <h4 className="text-start text-[0.713rem] font-medium ">
                                                    {course.name}
                                                </h4>

                                                {/* category */}
                                                <div className="bg-[#ECEEF6] text-start flex items-center justify-center">

                                                    <h4 className="text-[0.55rem] py-[0.08706rem] px-[0.21763rem] text-gray-600  ">{course.category}</h4>
                                                </div>

                                                <div className="flex justify-end w-[100%] ">

                                                    <span className="py-[0.3125rem] px-[0.625rem] bg-[#2800AE] text-white font-poppins font-semibold text-[0.625rem] rounded-md shadow-md transition">
                                                        {course.button}
                                                    </span>
                                                </div>



                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewOurIntegration

