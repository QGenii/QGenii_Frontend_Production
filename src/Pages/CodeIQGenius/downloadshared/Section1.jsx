import React, { useState } from "react";
import bgimg from '../../../assets/assets/WhatWedo/CertificatePrepAndBadges/bgimg.jpg';


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


    console.log(form);


  }


  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-black font-[Poppins] text-[2rem] not-italic font-semibold leading-normal text-center mb-3">
        Essential Skills for Managers: Develop Resilient Employees
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div>
          {/* Video/Image Placeholder */}
          <div className="rounded-[0.625rem] bg-[#D9D9D9] 
            w-[33.4375rem] h-[15.5625rem] 
            shrink-0">
            <span className="text-gray-500">Thumbnail</span>
          </div>

          {/* Content */}
          <div className="w-[33.4375rem] flex flex-col  item-flex-start  mt-2 mb-3">
          
            <h4 className="text-[1rem] fort-poppins font-normal text-[#1E1E1E]">
=After years of global change and uncertainty, resilience isn't just a desirable trait for employees — it's a necessity. Managers can help their teams build resilience and thrive amidst constant change by honing their own leadership skills. By building their abilities in key areas, managers can help employees face change head-on.            </h4>

          </div>

          <div className="w-[33.4375rem] flex flex-col  item-flex-start bg ">
            {/* <h4 className="font-semibold text-[1.25rem] mb-2">Watch this webinar to:</h4> */}
            
              <h4 className="text-black font-poppins text-base font-normal leading-normal">
               This collection of three popular Manager Essentials workbooks, offers a toolkit for managers to confidently navigate change, empower their teams, and foster a resilient workplace culture. In Essential Skills for Managers: Develop Resilient Employees, people leaders will get practical guidance on:
              </h4>
              <ul className="list-disc text-black font-poppins text-base font-normal leading-normal ">
               <div className=" px-4 text-black font-poppins text-base font-normal leading-normal">
                 <li>Communicating effectively during times of change</li>
                <li>Growing their empathy skills to develop stronger team relationships</li>
                <li>Building a positive team culture and a workplace employees love</li>
               </div>
              </ul>
             
            
          </div>
        </div>

        {/* Right Column - Form */}
        <div className=" flex flex-col gap-4">
        <div className=" text-white px-[4.8125rem]  py-[1.875rem] rounded-lg shadow-lg w-[30.25rem] h-[36.25rem] bg-transparent "
          style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <form className="flex flex-col gap-[1.25rem]" onSubmit={handleSumbit}>
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

            {/* Toggle */}
            <div className="flex items-center justify-between  gap-[1rem]">
              <label className="text-[0.75rem] text-white ">
                Send me special offers, event updates, and learning tips.
              </label>
              <input type="checkbox" className="w-5 h-5  " />
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <button >
                Watch Now
              </button>
            </div>

          </form>

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
