import React from 'react'
import Header from '../../../../../Components/Header'
import { Link} from 'react-router-dom'

import Logo1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Logo1.png';
import bgimg1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/bgimg1.jpg';


//import from component

import TestimonialSection from '../../../../../Components/TestimonialSection'


import Img2 from "../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img2.png";
import Img3 from "../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img3.png";
import Img4 from "../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img4.png";
import Img5 from "../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img5.png";

// ?import from learning and developement
import Section7 from '../../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'


const features = [
    {
      title: "Simplify user and group management at scale",
      description:<div className=' px-4'>
        <ul className='list-disc list w-[19.73rem]  '><li>View and manage all of your groups on one centralized page.</li>
      <li>Save time by performing multiple actions in bulk.</li>
      <li>Structure groups by team, department, or project.</li>
      </ul>
      </div>,
       
     
      image: Img2,
      reverse: true,
      width: "18.75rem",
      height: "18.76669rem",
      aspectratio: "400.00/266.67",
    },

    {
      title: "Save time through seamless automation",
      description:<div className=' px-4'>
        <ul className='list-disc list w-[19.73rem]  '>
      <li>Get your employees learning faster by automating user and group management with SSO and SCIM.</li>
      <li>Easily provision and deprovision Udemy Business access, update user details, and make changes to groups.</li>
      </ul>
      </div>,
      
      image: Img3,
      reverse: false,
      width: "18.75rem",
      height: "18.75rem",
      aspectratio: "1/1",
    },
    {
      title: "Empower managers to guide their teams' learning",
    description:<div className=' px-4'>
        <ul className='list-disc list w-[19.73rem]  '>
      <li>Control license allocation and distribution while still delegating responsibilities.</li>
      <li>Assign Group Admin roles so that leaders closest to employees can assign courses and learning paths.</li>
      </ul>
      </div>,
      
      image: Img4,
      reverse: true,
      width: "18.75rem",
      height: "12.15rem",

      aspectratio: "1/1",
    },
    {
      title: "Tighten data privacy across your organization",
     description:<div className=' px-4'>
        <ul className='list-disc list w-[19.73rem]  '>
      <li>Manage permissions for Group Admins and keep visibility limited to the groups that they manage.</li>
      <li>Easily remove users' personal information to help you comply with global data privacy regulations and GDPR.</li>
      </ul>
      </div>,
      
      image: Img5,
      reverse: false,
      width: "18.75rem",
      height: "14.51rem",

      aspectratio: "1/1",
    },
  ];

const ReadAboutUserManageMent = () => {
  return (
    <div className='h-[282rem] w-full bg-white'>

    <Header/>

    {/* section 1 */}
      <div
            style={{
                backgroundImage: `url(${bgimg1}) `,
            }}
            className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
        >
            <div className="learning-eco-system-content flex items-center justify-evenly gap-[5rem]   ">
                {/* Left Side */}
                <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
                    <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
                    FLEXIBLE USER MANAGEMENT               </h4>
                    <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[33.75rem] mb-1">

                     Scale learning to suit your needs
                    </h2>
                    <div
                        style={{ fontSize: "0.875rem" }}
                        className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[40.4rem]"
                    >
                   Flexible controls empower admins, protect user privacy, and get your team learning faster.     </div>
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
                        src={Logo1}
                        alt=""
                        className="object-cover rounded-lg shadow"
                    />
                </div>
            </div>
        </div>

        {/* import from component */}
        <TestimonialSection/>

{/* section2 */}
        <div className="flex flex-col justify-center items-center mt-5  w-[64.0625rem] mx-auto">
    <h4 className=" text-[1.875rem] font-semibold font-poppins leading-[normal]">More learning, less management</h4>
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
            <Section7/>
          </div>

    </div>
  )
}

export default ReadAboutUserManageMent