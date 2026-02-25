import React, { useState } from 'react'
import Header from '../../../../../Components/Header'
import bgimg4 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/bgimg4.jpg';
import { Link } from 'react-router-dom'


const PartnerWithUs = () => {

    const [EnterCompanyName, setEnterCompanyName] = useState('')
  return (
    <div className='w-full h-[71.4rem]'>
<Header/>

    {/* section 1 */}
            <div
                style={{
                    backgroundImage: `url(${bgimg4}) `,
                }}
                className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
            >
                <div className="learning-eco-system-content flex items-center gap-2 justify-center  ">
                    {/* Left Side */}
                    <div className="learning-eco-system-left-side font-poppins flex flex-col  w-[57.4rem] items-center   ">
                      
                        <h2 className="text-white font-poppins text-[2.25rem] font-medium capitalize  mb-1">

                            Partner Sign Up
                        </h2>
                        <div
                            style={{ fontSize: "0.875rem" }}
                            className="text-white font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[49rem] text-center "
                        >
                            Please enter a valid company e-mail in order to be routed to the registration form. To increase the likelihood of acceptance, please refrain from using a queue or shared address. By signing up, you are agreeing to our Privacy Policy and Terms of Use</div>

                         <div className='flex flex-col'>
                            <label className='text-[0.625rem] text-white  w-full text-center' >Work Email<span className='text-red-600'>*</span></label>
                            <input type="text" placeholder='Enter your Company Name' value={EnterCompanyName} onChange={(e) => setEnterCompanyName(e.target.value)} className=' rounded-sm outline-none w-[45rem] text-[0.73rem] h-[2.37rem] px-[1.0296rem] py-[0.64rem]'/>
                         </div>

                        <div className="flex items-center justify-center w-[30rem]  gap-3 mt-2">

                            <button className="px-[2.5rem] py-3 bg-[#2800AE] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                                <Link to='/' className='px-3'>Next</Link>
                            </button>

                        </div>
                    </div>

                    
                </div>
            </div>


    </div>
  )
}

export default PartnerWithUs