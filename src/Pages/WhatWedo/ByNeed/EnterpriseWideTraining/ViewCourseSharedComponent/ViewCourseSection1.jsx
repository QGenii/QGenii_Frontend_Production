



import React from 'react'
import Logo from '../../../../../assets/assets/WhatWedo/Enterpriseimage/ViewCourse/Logo.png';
import bgimg from '../../../../../assets/assets/WhatWedo/Enterpriseimage/ViewCourse/bgimg.jpg';
import { useState } from 'react';

const ViewCourseSection1 = () => {

    const [email, setEmail] = useState("");
    const [enabled, setEnabled] = useState(true);

    return (
        <div
            style={{
                backgroundImage: `url(${bgimg}) `,
            }}
            className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
        >
            <div className="learning-eco-system-content flex items-center justify-center  ">
                {/* Left Side */}
                <div className="learning-eco-system-left-side  w-[54rem] font-poppins flex flex-col items-start 
          gap-[1.65rem] ">
                    {/* <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
            LEADERSHIP DEVELOPMENT                </h4> */}

                    <div>
                        <h2 className="text-black font-poppins text-[2rem] font-medium capitalize w-[54rem] ">
                            Download the list of CodeIQGenius Business courses
                        </h2>
                        <div
                            style={{ fontSize: "1rem" }}
                            className="text-black font-poppins text-center not-italic font-normal leading-normal capitalize w-[54rem]"
                        >
                            We empower your learners to learn from fresh, high quality content on the skills that matter most.
                        </div>
                    </div>


                    <div className='flex flex-col gap-[1.25rem] '>
                        <div className='flex flex-col justify-center items-center w-[54rem]'>
                            <label className='text-[0.626rem] font-medium w-[45rem]' > Work Email <span className='text-red-600'>*</span></label>
                            <input type="email" placeholder='Enter Your Work Email Address' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[45rem] py-[.626rem] px-[1.029rem] text-[0.71rem] outline-none' />
                        </div>
                        <div className='flex  justify-center items-center w-[54rem] '>
                            <div className='flex  justify-between items-center w-[45rem]'>
                                <h4 className='text-[0.75rem] font-normal'>Send me special offers, event updates, and learning tips.</h4>
                                <button
                                    onClick={() => setEnabled(!enabled)}
                                    className={`relative w-[3.75rem] h-[1.49rem] flex items-center rounded-full transition-colors duration-300 ${enabled ? "bg-indigo-800" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute left-1 text-white text-sm font-medium transition-all duration-300 ${enabled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                                            }`}
                                    >
                                        Yes
                                    </span>
                                    <span
                                        className={`absolute right-1 text-white-700 text-sm font-medium transition-all duration-300 ${enabled ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"
                                            }`}
                                    >
                                        No
                                    </span>
                                    <span
                                        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-[-1.1rem]"
                                            }`}
                                    ></span>
                                </button>
                            </div>
                        </div>
                    </div>



                    <div className="flex  items-center justify-center w-[54rem]  gap-3">
                        <button className="px-[2.5rem] py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                            Get the list
                        </button>

                    </div>

                    <h4 className='text-[0.625rem] font-normal'>By signing up, you agree to our <span className='underline text-[#2800AE]'>Terms of Use</span> and <span className='underline text-[#2800AE]'>Privacy Policy.</span></h4>
                </div>

                {/* Right Side */}
                <div className="learning-eco-system-right-side w-[19.85625rem] h-[17.125rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
                    <img
                        src={Logo}
                        alt="Enterprise Training"
                        className="object-cover rounded-lg shadow"
                    />
                </div>
            </div>
        </div >
    )
}

export default ViewCourseSection1