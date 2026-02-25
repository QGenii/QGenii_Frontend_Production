// src/components/Features.js

import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Technology/Img1.png'

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />,
    title: "Seamless integrations",
    description:
      "Our course collection automatically syncs with your LMS, streamlining access and progress tracking for your teams.",
  },
  {
    id:2,
      icon: <img  src={Img1} alt="" />,
    title: "Skills Certification",
    description:
      "Empower your teams with certification prep courses in essential technical skills to validate their expertise.",
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
    title: "Secure learning platform",
    description:
      "With AICPA SOC 2 Type II compliance, our platform ensures that your data remains safe and secure.",
  },

 
];

export default function ProfessionalServiceSection3() {

   

  return (
    <section className=" mt-[3rem]  mx-auto  w-[67.185rem]  flex items-center justify-center flex-col gap-7">
        <div className=" flex flex-col items-center justify-center"><h2 className="text-[1.875rem]  font-semibold text-center  ">
    Tailored learning for financial services success
      </h2>
      <h4 className="text-[1.25rem] text-center font-normal w-[56.3rem]"> Equip your teams with essential skills in cloud, cyber, AI, data, and programming to successfully navigate complex challenges and drive growth.</h4></div>
    

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