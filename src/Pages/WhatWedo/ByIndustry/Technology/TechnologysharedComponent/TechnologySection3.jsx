// src/components/Features.js

import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Technology/Img1.png'

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />,
    title: "Immersive learning",
    description:
      "Labs and assessments accelerate skill-building by giving your learners the opportunity to apply their knowledge.",
  },
  {
    id:2,
      icon: <img  src={Img1} alt="" />,
    title: "Certifications prep",
    description:
      "Get your employees up to speed faster with effective prep courses and practice tests that prepare them to pass their certification exams.",
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
    title: "Fresh, updated courses",
    description:
      "Courses are updated at market speed, so your learners always have access to fresh, relevant content.",
  },

 
];

export default function TechnologySection3() {

    

  return (
    <section className=" mt-15  mx-auto  w-[67.185rem]  flex items-center justify-center flex-col gap-7">
        <div><h2 className="text-[1.875rem]  font-semibold text-center ">
     A learning platform for tech companies
      </h2>
      <h4 className="text-[1.25rem] text-center font-normal w-[56.3rem]">   CodeIQGenius Business helps you keep pace with constantly evolving technology and priorities.</h4></div>
    

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
