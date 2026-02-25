import React from 'react'
import Header from '../../../../../Components/Header'
import { Link } from 'react-router-dom'

import Logo2 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Logo2.png';
import bgimg2 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/bgimg2.jpg';


//import from component

import TestimonialSection from '../../../../../Components/TestimonialSection'


import Img6 from "../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img6.png";
import Img7 from "../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img7.png";
import Img8 from "../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img8.png";


// ?import from learning and developement
import Section7 from '../../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'


const features = [
  {
    title: "Monitor learning with at-a-glance dashboards ",
    description: <div className=' px-4'>
      <ul className='list-disc list w-[19.73rem]  '><li>User-friendly dashboards surface critical metrics and trends. You can drive engagement with our Adoption Dashboard or discover popular content through Course Insights.</li>

      </ul>
    </div>,


    image: Img6,
    reverse: true,
    width: "18.75rem",
    height: "18.76669rem",
    aspectratio: "400.00/266.67",
  },

  {
    title: "Get granular data to analyze learning behavior ",
    description: <div className=' px-4'>
      <ul className='list-disc list w-[19.73rem]  '>
        <li>Our reports enable you to track and measure learning results. Segment enrollment and engagement data by group or individual for a granular view of learning activity.</li>

      </ul>
    </div>,

    image: Img7,
    reverse: false,
    width: "18.75rem",
    height: "12.75rem",
    aspectratio: "1/1",
  },
  {
    title: "Go beyond engagement metrics to see what's really working",
    description: <div className=' px-4'>
      <ul className='list-disc list w-[19.73rem]  '>
        <li>Employee sentiment reports will tell you what's resonating with your team and reveals the impact of learning. Only Udemy offers ratings and reviews data to help fuel your learning strategy.</li>

      </ul>
    </div>,

    image: Img8,
    reverse: true,
    width: "18.75rem",
    height: "12.15rem",

    aspectratio: "1/1",
  },

];

const ReadAboutUserManageMent = () => {
  return (
    <div className='h-[282rem] w-full bg-white'>

      <Header />

      {/* section 1 */}
      <div
        style={{
          backgroundImage: `url(${bgimg2}) `,
        }}
        className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
      >
        <div className="learning-eco-system-content flex items-center justify-evenly gap-[5rem]   ">
          {/* Left Side */}
          <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
            <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
              ANALYTICS & INSIGHTS             </h4>
            <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[35.75rem] mb-1">

              Gain visibility into how your employees are learning
            </h2>
            <div
              style={{ fontSize: "0.875rem" }}
              className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[35.4rem]"
            >
              Qgenii Business gives you comprehensive insights into learning activity, so you can track your employees'progress, identify trends, and know when to take action.     </div>
            <div className="flex w-[30rem]  gap-3">
              <span className="px-2 py-3 text-[#2800AE] border-[#2800AE] bg-white border font-poppins font-semibold text-base rounded-md ">
                <Link to='/compareplan' className='px-3'>Compare Plans</Link>
              </span>
              <button className="px-[2.5rem] py-3 bg-[#2800AE] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                <Link to='/' className='px-3'>Request a demo</Link>
              </button>

            </div>
          </div>

          {/* Right Side */}
          <div className="learning-eco-system-right-side w-[26.15625rem] h-[25.4rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
            <img
              src={Logo2}
              alt=""
              className="object-cover rounded-lg shadow"
            />
          </div>
        </div>
      </div>

      {/* import from component */}
      <TestimonialSection />

      {/* section2 */}
      <div className="flex flex-col justify-center items-center mt-5  w-[89.7625rem] h-[84.125rem] mx-auto">
        <h4 className=" text-[1.875rem] font-semibold font-poppins leading-[normal]">Use learning data to drive business outcomes</h4>
        <div className="features-container ">
          {features.map((item, index) => (
            <div
              key={index}
              className={` flex gap-[9.44rem]  feature-item ${item.reverse ? "reverse" : ""}`}
            >
              <div className="feature-text">
                <h4 className="w-[27.75rem]  text-[1.25rem] font-semibold">{item.title}</h4>
                <div className="">{item.description}</div>
                <h4 className="text-[#0c316e] underline font-semibold">{item.conclusion}</h4>
              </div>

              <div className="feature-image">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: item.width,
                    height: item.height,
                    aspectRatio: item.aspectratio,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* import from learning and developement */}
      <div className='mt-[10rem]'>
        <Section7 />
      </div>

    </div>
  )
}

export default ReadAboutUserManageMent