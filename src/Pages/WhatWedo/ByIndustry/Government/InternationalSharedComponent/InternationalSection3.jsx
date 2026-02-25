// src/components/Features.js
import { Link } from 'react-router-dom';
import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Technology/Img1.png'

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />,
    title: "Empower admins with enhanced capabilities",
    description:
      "Quickly set up user groups, add and remove users, assign courses, and monitor progress as learners engage.",
      Link:<Link to='/readaboutusermanagement' className='px-3'> Read about User Management </Link>
  },

  {
    id:2,
      icon: <img  src={Img1} alt="" />,
    title: "Drive learning outcomes with reporting and insights",
    description:
      "Understand and take action on how people in your organization learn with our robust adoption and learner activity dashboards.",
      Link:<Link to='/learnaboutmorereporting' className='px-3'> Learn about More Reporting  </Link>
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
    title: "Optimize business process with integrations",
    description:
      "Make your tech stack do the work for you. Centralize learning management or integrate with existing systems to drive more impactful learning.",
      Link:<Link to='/viewourintegration' className='px-3'> View Our Integration </Link>
  },

 
];

export default function InternationalSection3() {

   

  return (
    <section className=" mt-[3rem]  mx-auto  w-[67.185rem]  flex items-center justify-center flex-col gap-7 rounded-[1.25rem] border-[0.5px] border-[#919DB1] bg-white shadow-[ -1px_4px_12px_0_rgba(40,0,174,0.10)] py-[2rem]">
        <div className=" flex flex-col items-center justify-center"><h2 className="text-[1.875rem]  font-semibold text-center  ">
   A learning platform for government agencies
      </h2>
      </div>
    

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]   p-[3.125rem]">
        {features.map((feature) => (
        <div  key={feature.id} className="flex w-[17.875rem] flex-col items-start gap-[1.875rem] self-stretch  ">
          <div  className="flex flex-col items-start gap-2  ">
           <div className="w-[3.125rem] h-[3.125rem] aspect-square text-black"> {feature.icon}</div> 
            <span className="font-normal text-[ 0.9375rem] w-[16.875rem]">{feature.title}</span>
            <span className="text-[0.65625rem] font-normal w-[18rem] ">{feature.description}</span>
            <span className="text-[1rem] font-normal text-[#2800AE] font-poppins   not-italic leading-normal text-nowrap  ">{feature.Link} &gt;&gt;&gt;</span>

            
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}