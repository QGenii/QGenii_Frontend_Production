import React from "react";
import bgimg1 from "../../../../assets/CodeIQGenius/MainPage/ProfessionalService/bgimg1.jpg";

const Section2 = () => {
  const services = [
    "Build leaders who inspire innovation and lead through change",
    "Develop leaders who foster strong and loyal employee relationships",
    "Align leadership teams to drive positive transformation",
    "Empower leaders with the tools they need to be resilient and adept at problem-solving",
  ];

  return (
    <div className="w-full px-6 py-12 text-center">
      {/* Heading */}
      <h2 className="text-[1.5rem] font-normal text-gray-800 mb-10">
      Here’s what cohort learning can do for your organization
      </h2>

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
