// src/components/Features.js

import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Technology/Img1.png'

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />,
    title: "Over 6,000 professional courses",
    description:
      "Give your teams access to fresh, relevant courses on all the latest tech, business, and soft skills.",
  },
  {
    id:2,
      icon: <img  src={Img1} alt="" />,
    title: "International content",
    description:
      "Support your workforce with high-quality courses taught by native-speaking instructors.",
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
    title: "Analytics and reporting",
    description:
      "Track learning progress, pay attention to trends, and know when to take action to increase engagement.",
  },

 
];

export default function ManufactureSection3() {

   

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
            
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}