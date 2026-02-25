import React from 'react'
import Img1 from "../../../../../assets/assets/WhatWedo/ByIndustry/Manufacture/Img1.png";
import {Link }  from "react-router-dom"

const TechnologySection4 = () => {
    return (
        <div className="learning-container">
            {/* Top Box */}
            <div className='flex flex-col gap-2'>
                <h2 className='text-[1.875rem] text-center'>Top Manufacturing Workplace Skills for 2025</h2>

                <div className="learning-content">
                    <div className=" flex flex-col gap-[1.875rem] w-[33.875rem]">
                        <div >
                 
                            <h4 className='text-[.875rem] font-normal w-[41.1875rem] '>
                                Discover the most in-demand skills manufacturing teams are learning right now <br /> — including AI, leadership, and digital transformation — based on real learner data.
                            </h4>

                        </div>

                        <div className='text-[1.25rem] font-medium'>
                            <h5 className='text-[1rem] font-medium'>What you’ll learn:</h5>
                            <ul>
                                <li className='text-[.875rem] font-normal list-disc list-inside'>
                                The top 5 skill areas manufacturers are prioritizing in 2025


                            </li>
                             <li className='text-[.875rem] font-normal list-disc list-inside'>
                               How AI is reshaping skill demand across the factory floor and beyond
                            </li>
                             <li className='text-[.875rem] font-normal list-disc list-inside'>
                             Key workforce development trends shaping the industry
                            </li>
                            </ul>
                        </div>

                      
                    </div>

                    <div >
                        <img  className="w-[23.25rem] h-[14.25rem] aspect-square" src={Img1} alt="Learning Illustration" />
                    </div>
                </div>

                <div className='flex justify-center'>
                    <span className='py-[0.75rem] px-[2.5rem] bg-[#0c316e] text-white font-poppins font-semibold text-[1rem] rounded-md shadow-md transition '><Link to='/downloadcertificate'>Discover Top 5 skills</Link></span>
                </div>
            </div>

        </div>
    )
}



export default TechnologySection4