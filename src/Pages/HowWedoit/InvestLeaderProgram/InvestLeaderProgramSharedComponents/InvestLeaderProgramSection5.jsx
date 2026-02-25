// src/components/Features.js

import Img1 from '../../../../assets/assets/HowDoWeIt/LeadingGenAiInovationprogram/Img1.png';

const features = [
  {
    id:1,
    icon: <img  src={Img1} alt="" />,
    
    description:
      "Explore the impacts of a distributed workforce on employees' well-being",
  },
  {
    id:2,
      icon: <img  src={Img1} alt="" />,
   
    description:
      "Discover techniques for coaching and creating accountability in a distributed work environment",
  },
  {
    id:3,
      icon: <img  src={Img1} alt="" />,
  
    description:
      "Personalize employee work experiences by taking care of an employee as a person",
  },
  {
    id:4,
      icon: <img  src={Img1} alt="" />,
  
    description:
      "Enhance team culture by connecting company values to inclusive behaviors",
  },
  {
    id:5,
      icon: <img  src={Img1} alt="" />,
  
    description:
      `Use strategies such as “stay interviews" to retain top talent`,
  },
  {
    id:6,
      icon: <img  src={Img1} alt="" />,
  
    description:
      "Balance asynchronous and synchronous team connections to address location inclusivity",
  },

 
];

export default function InvestLeaderProgramSection5() {

    

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
