import React from "react";
import bgimg1 from "../../../../assets/CodeIQGenius/MainPage/ProfessionalService/bgimg1.jpg";

const Section2 = () => {
  const services = [
    "Asynchronous learning with self-paced micro-learning modules is easy to complete and apply.",
    "Discussion forums foster community with peers, experts, and moderators.",
    "Breakout groups promote team building and collective problem solving.",
    "Live expert-led sessions allow for deep-dive discussions into topic areas based on learners’ interests.",
  ];

  return (
    <div className="w-[73.75rem]  px-6 py-12  mx-auto flex flex-col items-center">
      {/* Heading */}
      <div>
      <h2 className="text-[1.5rem] font-normal text-gray-800 mb-3 text-center">
Here’s what cohort learning can do for your organization      </h2>
      <h2 className="text-[1rem] font-normal  text-gray-800 mb-10 w-[50.375rem] text-center   ">
      Leaders learn in many ways throughout the program for increased engagement,efficiency, and impact.
      </h2>
</div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map((text, i) => (
          <div
            key={i}
            className="rounded-xl p-6 text-gray-800 shadow-md border   "
            style={{backgroundImage:`url(${bgimg1})`,backgroundSize: "cover", backgroundPosition: "50%",backgroundRepeat: "no-repeat" }}>
           <h4 className="  text-start text-[0.9375rem] font-normal"> {text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;
