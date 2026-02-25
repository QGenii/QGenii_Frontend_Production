import React, { useState } from "react";
import bgimg from '../../../../../assets/assets/WhatWedo/CertificatePrepAndBadges/bgimg.jpg';


export default function ProductDemoSection() {

    const [form, setform] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        jobTitle: "",
    })

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };


    const handleSumbit = (e) => {
        e.preventDefault();

        const data = new FormData()

        data.append("firstName", form.firstName);
        data.append("lastName", form.lastName);
        data.append("email", form.email);
        data.append("companyName", form.companyName);
        data.append("jobTitle", form.jobTitle);
        data.append("companySize", form.companySize);


        console.log(form);


    }


    return (
        <section className="px-6 py-12 max-w-6xl mx-auto  flex flex-col gap-[1.25rem] ">
            {/* Heading */}
            <div>
                <h4 className="text-[1rem] font-semibold text-[#2800AE] w-[69.1875rem] text-center">COMPANY-WIDE AI TRANSFORMATION</h4>
            <h2 className="text-black font-[Poppins] text-[1.875rem] not-italic font-semibold leading-normal text-center mb-3">
               Outlearn, outpace, and outperform the rest
            </h2>
            <h4 className="text-[1.25rem] font-normal w-[69.1875rem]">Join Genpact, Capital One, and thousands more who already partner with Udemy to close AI skills gaps and drive measurable business results. Get started with our infographic: The 10 Fastest Growing AI Workplace Skills.</h4>
            </div>

            <div className="flex justify-center">



                <div className=" flex flex-col gap-4">
                    <div className=" text-white px-[4.8125rem]  py-[1.875rem] rounded-lg shadow-lg w-[44.25rem] h-[36.25rem]  bg-transparent flex flex-col gap-[1.25rem] "
                        style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                            <div className="text-white text-[1.5rem] font-medium">Get the 10 Fastest-Growing AI Workplace Skills Infographic</div>
                        <form className="flex flex-col gap-[2rem]" onSubmit={handleSumbit}>
                            <div className="grid grid-cols-2 gap-[1.25rem] ">
                                {/* First Name */}
                                <div>
                                    <label className="text-[0.75rem] font-medium text-white">
                                        First Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="firstName"
                                        type="text"
                                        placeholder="Enter Your First Name"
                                        className="w-full px-[1.02969rem] h-[2.37269rem] text-[0.71rem] font-normal rounded text-gray-900 bg-white"
                                    />
                                </div>
                                {/* Last Name */}
                                <div>
                                    <label className="text-[0.75rem] font-medium text-white">
                                        Last Name<span className="text-red-500">*</span>
                                    </label>
                                    <input

                                        onChange={handleChange}
                                        name="lastName"

                                        type="text"
                                        placeholder="Enter Your Last Name"
                                        className="w-full px-[1.02969rem] h-[2.37269rem] text-[0.71rem] font-normal rounded text-gray-900 bg-white"
                                    />
                                </div>
                                {/* Work Email */}
                                <div>
                                    <label className="text-[0.75rem] font-medium text-white">
                                        Work Email<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="email"
                                        type="email"
                                        placeholder="Enter Your Work Email Address"
                                        className="w-full px-[1.02969rem] h-[2.37269rem] text-[0.71rem] font-normal rounded text-gray-900 bg-white"
                                    />
                                </div>
                                {/* Company Name */}
                                <div>
                                    <label className="text-[0.75rem] font-medium text-white ">
                                        Company Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        name="companyName"
                                        type="text"
                                        placeholder="Enter Your Company Name"
                                        className="w-full px-[1.02969rem] h-[2.37269rem] text-[0.71rem] font-normal rounded text-gray-900 bg-white"
                                    />
                                </div>
                                {/* Job Title */}
                                <div>
                                    <label className="text-[0.75rem] font-medium text-white">
                                        Job Title<span className="text-red-500">*</span>
                                    </label>
                                    <input

                                        onChange={handleChange}
                                        name="jobTitle"
                                        type="text"
                                        placeholder="Enter Your Job Title"
                                        className="w-full px-[1.02969rem] h-[2.37269rem] text-[0.71rem] font-normal rounded text-gray-900 bg-white"
                                    />
                                </div>

                                {/* company size */}
                                <div>
                                    <label className="text-[0.75rem] font-medium text-white">
                                        Company Size<span className="text-red-500">*</span>
                                    </label>


                                    <select name="companySize" onChange={handleChange} placeholder="Select Company Size"
                                        className="w-full px-[1.02969rem] h-[2.37269rem] text-[0.71rem] font-normal rounded text-gray-900 bg-white ouline-none">
                                        <option value="" className="outline-none ">Select Company Size</option>
                                        <option value="1-199">1-199</option>
                                        <option value="200-299">200-299</option>
                                        <option value="300-399">300-399</option>
                                        <option value="1000-5000">1000-5000</option>
                                        <option value="1000-5000">5001+</option>
                                    </select>



                                </div>
                            </div>

                            {/* Toggle */}
                            <div className="flex items-center justify-between  gap-[1rem]  ">
                                <label className="text-[0.75rem] text-white ">
                                    Send me special offers, event updates, and learning tips.
                                </label>
                                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                            </div>

                            {/* CTA */}
                            <div className="flex justify-center">
                                <button >
                                   Submit
                                </button>
                            </div>

                        </form>
                            <p className="text-white">By signing up, you agree to our <span className="underline">Terms of Service</span> and  <span className="underline">Privacy Policy</span>.</p>

                        {/* Bottom Thumbnails */}


                    </div>
                    {/* Bottom Thumbnails */}
                    {/* <div className="rounded-[1.25rem] bg-[#fff] 
            shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)] 
            w-[30.25rem] h-[15.25rem] 
            shrink-0 flex justify-evenly r gap-[1.25rem] py-4 ">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">Logo</span>
        </div>
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">Logo</span>
        </div>
      </div> */}
                </div>
            </div>


        </section>
    );
}
