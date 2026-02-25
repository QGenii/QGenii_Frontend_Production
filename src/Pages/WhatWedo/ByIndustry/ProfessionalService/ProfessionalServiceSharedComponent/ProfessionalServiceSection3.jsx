




import { useState } from "react";
import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Technology/Img1.png'

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />, 
    title: "Flexible learning",
    description:
      "The Udemy platform integrates seamlessly into your teams' workflow, delivering on-demand skills training without disrupting client engagements.",
  },
  {
    id:2,
      icon: <img  src={Img1} alt="" />,
    title: "Courses on in-demand IT skills",
    description:
      "Access thousands of courses on technologies like AI, DevOps, and cybersecurity to ensure your team is always at the ready in a competitive landscape.",
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
    title: "Actionable learner insights",
    description:
      "Use data-driven insights to identify skills gaps, track learning progress, and deliver consistent client value.",
  },

 
];

export default function FinancialSection3() {

   

  return (
    <section className=" mt-[3rem]  mx-auto  w-[67.185rem]  flex items-center justify-center flex-col gap-7">
        <div className=" flex flex-col items-center justify-center"><h2 className="text-[1.875rem]  font-semibold text-center  ">
    A learning platform that powers your professional services success
      </h2>
      <h4 className="text-[1.25rem] text-center font-normal w-[56.3rem]"> 64% of IT executives cite talent shortages as a barrier to adopting new technologies. Upskill your teams to stay competitive and meet client expectations.</h4></div>
    

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
