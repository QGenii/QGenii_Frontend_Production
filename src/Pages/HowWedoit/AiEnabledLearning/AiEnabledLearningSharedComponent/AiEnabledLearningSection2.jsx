import React from "react";
import bgimg1 from "../../../../assets/assets/HowDoWeIt/AiEnabledLearning/bgimg1.jpg";

const AiEnabledLearningSection2 = () => {
  const services = [
    {
      title: "Accelerate skill building",
      desc: "AI-optimized learning paths help employees gain skills 40% faster",
    },
    {
      title: "Scale excellence",
      desc: "Deploy consistent, high-quality learning experiences across your organization",
    },
    {
      title: "Increase engagement",
      desc: "Interactive AI-powered learning keeps employees motivated and focused",
    },
    {
      title: "Future-proof your workforce",
      desc: "Continuously updated skills frameworks adapt to evolving business needs",
    },
    {
      title: "Deliver measurable ROI",
      desc: "Precise insights link learning directly to business outcomes",
    },

    
  ];

  return (
    <div className="w-[75rem]  text-center flex flex-col gap-[1.88rem]   mx-auto">
      {/* Heading */}
      <h2 className="text-[1.5rem] font-normal text-gray-800 mb-10">
      Transform your organization's learning approach
      </h2>

      {/* Cards */}
      <div className="flex  items-center justify-center gap-[1.1rem] ">
        {services.map((text, i) => (
          <div
            key={i}
            className="rounded-xl py-[1.533rem] px-[1.23rem] text-gray-800 shadow-md border  w-[14.12rem] h-[10.16rem] flex flex-col justify-center items-center     "
            style={{backgroundImage:`url(${bgimg1})`,backgroundSize: "cover", backgroundPosition: "50%",backgroundRepeat: "no-repeat" }}>
              <h4 className=" w-[12.8rem]  text-center text-[0.875rem] font-normal"> {text.title}</h4>
           <h4 className=" w-[12.8rem] text-start text-[0.75rem] font-normal"> {text.desc}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiEnabledLearningSection2;
