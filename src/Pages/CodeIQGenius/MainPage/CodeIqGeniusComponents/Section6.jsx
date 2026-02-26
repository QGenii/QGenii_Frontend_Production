import React, { useState } from "react";

import Img5 from '../../../../assets/CodeIQGenius/sharedImg/Img5.png';
import Img6 from '../../../../assets/CodeIQGenius/sharedImg/Img6.png';
import Img7 from '../../../../assets/CodeIQGenius/sharedImg/Img7.png';
import Img8 from '../../../../assets/CodeIQGenius/sharedImg/Img8.png';
import bgImg from '../../../../assets/CodeIQGenius/sharedImg/bgimg.jpg';
import bgImg1 from '../../../../assets/CodeIQGenius/sharedImg/bgImg1.jpg';
import bgimg2 from '../../../../assets/CodeIQGenius/sharedImg/bgimg2.jpg';
import bgimg3 from '../../../../assets/CodeIQGenius/sharedImg/bgimg3.jpg';

export default function IndustrySection() {


  const [activeTab, setactiveTab] = useState("Professional Services");
  const industries = [
    "Professional Services",
    "Manufacturing",
    "Technology",
    "Financial Services",
  ];

  return (
    <section className="px-6 py-12 ">
      {/* Heading */}

      <div className="flex flex-col items-center justify-center h-full  gap-[1.25rem] ">
      <h4 className="text-center text-[1.5rem] font-poppins font-normal md:text-3xl  mb-6">
        Transforming organizations in every industry
      </h4>

      {/* Tabs / Pills */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {industries.map((item, idx) => (
          <input
          type="button"
            key={idx}
            value={item}
            className={` px-[2rem] py-[0.75rem] text-[0.875rem] text-center rounded-full shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]  transition ${
              activeTab === item
                ? "bg-[#0C316E] text-white active"
                : "bg-white text-gray-700  "
            }`}

            onClick={() => setactiveTab(item)}
          />
           
        ))}
      </div>

      </div>

      {/* Two-column layout */}
      {/* Professional Services */}
      {activeTab === "Professional Services" && (
        <div className="flex items-center  justify-center p-[1.25rem] g-[3.125rem]">
        {/* Left illustration */}
        <div className="flex justify-center">
          <img
            src={Img5}
            alt="Industry Illustration"
            className="w-[29.625rem] h-[20.625rem] aspect-[79/55]"
          />
        </div>

        {/* Right content */}
        <div className="flex items-center flex-col justify-center w-[32.5rem]  g-[1.5rem] ">
          <h4 className="text-[1.5rem] font-medium w-[28.57rem]  mb-6">
            Driving profitability through faster staffing and cost optimization
          </h4>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 " >
            <div className="rounded-[3.32813rem] 
              bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]"  style={{backgroundImage:`url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">66%</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2">faster new talent onboarding</h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
            <div className="rounded-[3.32813rem] 
             bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]" style={{backgroundImage:`url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">93%</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2 text-center w-[14.23rem]">
                retention rate for learning program graduates
              </h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
            Explore Professional Services solutions
          </button>
        </div>
      </div>
      )}

      {/* Manufacturing */}
      {activeTab === "Manufacturing" && (
        <div className="flex items-center  justify-center p-[1.25rem] g-[3.125rem]">
        {/* Left illustration */}
        <div className="flex justify-center">
          <img
            src={Img6}
            alt="Industry Illustration"
            className="w-[29.625rem] h-[20.625rem] aspect-[79/55]"
          />
        </div>

        {/* Right content */}
        <div className="flex items-center flex-col justify-center w-[32.5rem]  g-[1.5rem] ">
          <h4 className="text-[1.5rem] font-medium w-[28.57rem]  mb-6">
           Achieve end-to-end supply chain excellence
          </h4>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 " >
            <div className="rounded-[3.32813rem] 
              bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]"  style={{backgroundImage:`url(${bgImg1})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">5,000+ hours</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2">AWS training completed in 12 months  </h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
            <div className="rounded-[3.32813rem] 
             bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]" style={{backgroundImage:`url(${bgImg1})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">$220K saved</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2 text-center w-[14.23rem]">
               by reducing training costs with IQ Business
              </h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
            Explore Professional Services solutions
          </button>
        </div>
      </div>
      )}

      {/* Technology */}
       
       {activeTab === "Technology" && (
        <div className="flex items-center  justify-center p-[1.25rem] g-[3.125rem]">
        {/* Left illustration */}
        <div className="flex justify-center">
          <img
            src={Img7}
            alt="Industry Illustration"
            className="w-[29.625rem] h-[20.625rem] aspect-[79/55]"
          />
        </div>

        {/* Right content */}
        <div className="flex items-center flex-col justify-center w-[32.5rem]  g-[1.5rem] ">
          <h4 className="text-[1.5rem] font-medium w-[28.57rem]  mb-6">
           Innovate faster with employees certified on in-demand skills
          </h4>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 " >
            <div className="rounded-[3.32813rem] 
              bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]"  style={{backgroundImage:`url(${bgimg2})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">50%</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2">faster technical upskilling of critical talent</h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
            <div className="rounded-[3.32813rem] 
             bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]" style={{backgroundImage:`url(${bgimg2})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">20%</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2 text-center w-[14.23rem]">
                reduction in time to train and onboard employees
              </h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
            Explore Professional Services solutions
          </button>
        </div>
      </div>
       )
        }

        {/* Financial Services */}

        {activeTab === "Financial Services" && (
        <div className="flex items-center  justify-center p-[1.25rem] g-[3.125rem]">
        {/* Left illustration */}
        <div className="flex justify-center">
          <img
            src={Img8}
            alt="Industry Illustration"
            className="w-[29.625rem] h-[20.625rem] aspect-[79/55]"
          />
        </div>

        {/* Right content */}
        <div className="flex items-center flex-col justify-center w-[32.5rem]  g-[1.5rem] ">
          <h4 className="text-[1.5rem] font-medium w-[28.57rem]  mb-6">
           Grow the bottom line with investments in employee skills
          </h4>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 " >
            <div className="rounded-[3.32813rem] 
              bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]"  style={{backgroundImage:`url(${bgimg3})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">67%</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2">faster onboarding of product engineers</h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
            <div className="rounded-[3.32813rem] 
             bg-[50%] bg-cover bg-no-repeat 
            shadow-[-0.75px_3px_9px_0_rgba(12,49,110,0.10)] 
            flex w-[15.60938rem] 
            py-[2.25rem] px-[2.29688rem] 
            flex-col justify-center items-center 
            gap-[0.46875rem]" style={{backgroundImage:`url(${bgimg3})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h4 className="text-[1.125rem] font-semibold text-black">12%</h4>
              <h4 className="text-[.73rem] font-normal text-gray-700 mb-2 text-center w-[14.23rem]">
               Retention increase of in-demand tech roles
              </h4>
              <a href="#" className="text-[#0C316E] text-[.73rem] font-normal underline">
                XYZ Name
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
            Explore Professional Services solutions
          </button>
        </div>
      </div>
       )
        }


    </section>
  );
}
