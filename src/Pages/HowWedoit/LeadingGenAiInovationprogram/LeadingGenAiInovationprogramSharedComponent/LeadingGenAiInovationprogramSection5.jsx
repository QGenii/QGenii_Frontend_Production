// src/components/Features.js

import Img1 from '../../../../assets/assets/HowDoWeIt/LeadingGenAiInovationprogram/Img1.png';

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />,
    
    description:
      "Develop knowledge about how AI works and how to use it",
  },
  {
    id:2,
      icon: <img  src={Img1} alt="" />,
   
    description:
      "Build a ranked pipeline of AI innovation opportunities with financial and feasibility estimates",
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
  
    description:
      "Create messaging and communications plans to guide transformational change through AI",
  },
  {
    id:4,
      icon: <img  src={Img1} alt="" />,
  
    description:
      "Discover strategies for nurturing innovation in their organization",
  },
  
 
];

export default function LeadingGenAiInovationprogramSection5() {

    

  return (
    <section className=" mt-[4rem]  mx-auto  w-[67.185rem]  flex items-center justify-center flex-col gap-7">
        <div><h2 className="text-[1.875rem]  font-semibold text-center ">
     {/* A learning platform for tech companies */}
      </h2>
      <h4 className="text-[1.25rem] text-center font-normal w-[56.3rem]"> What learners will learn</h4></div>
    

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]   p-[3.125rem]">
        {features.map((feature) => (
        <div  key={feature.id} className="flex w-[17.875rem] flex-col items-start gap-x-[1.875rem] gap-y-[1.88rem] self-stretch  ">
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
