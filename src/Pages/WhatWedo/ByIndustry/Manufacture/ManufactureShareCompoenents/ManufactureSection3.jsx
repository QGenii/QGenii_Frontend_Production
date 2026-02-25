// src/components/Features.js

import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Technology/Img1.png'

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />,
    title: "Flexible, on-demand learning",
    description:
      "Train your teams without interrupting operations. Our courses led by real-world experts are available anytime, anywhere — supporting continuous learning on the floor and beyond.",
  },
  {
    id:2,
      icon: <img  src={Img1} alt="" />,
    title: "Personalized learning, powered by AI",
    description:
      "Deliver tailored course recommendations for every learner using AI-driven insights—helping your teams build in-demand skills faster, from the factory floor to the front office.",
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
    title: "Data-driven insights",
    description:
      "Track team progress, uncover skill gaps, and measure ROI with built-in learning analytics and usage dashboards.",
  },

 
];

export default function ManufactureSection3() {

   

  return (
    <section className=" mt-[3rem]  mx-auto  w-[67.185rem]  flex items-center justify-center flex-col gap-7 rounded-[1.25rem] border-[0.5px] border-[#919DB1] bg-white shadow-[ -1px_4px_12px_0_rgba(40,0,174,0.10)] py-[2rem]">
        <div className=" flex flex-col items-center justify-center"><h2 className="text-[1.875rem]  font-semibold text-center  ">
   A learning platform built for modern manufacturing
      </h2>
      <h4 className="text-[1.25rem] text-center font-normal w-[56.3rem]">Upskill teams in AI, frontline operations, supply chain, and leadership to drive productivity, agility, and workforce readiness.</h4></div>
    

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]   p-[3.125rem]">
        {features.map((feature) => (
        <div  key={feature.id} className="flex w-[17.875rem] flex-col items-start gap-[1.875rem] self-stretch  ">
          <div  className="flex flex-col items-start gap-2  ">
           <div className="w-[3.125rem] h-[3.125rem] aspect-square text-black"> {feature.icon}</div> 
            <span className="font-normal text-[ 0.9375rem] w-[16.875rem]">{feature.title}</span>
            <span className="text-[0.65625rem] font-normal w-[18rem] ">{feature.description}</span>
            
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}