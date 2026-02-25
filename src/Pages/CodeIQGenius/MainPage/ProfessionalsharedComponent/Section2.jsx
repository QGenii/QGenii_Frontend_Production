import React from "react";
import bgimg1 from "../../../../assets/CodeIQGenius/MainPage/ProfessionalService/bgimg1.jpg";

const ProfessionalServices = () => {
  const services = [
    "Strategic collaboration with learning and development experts",
    "Simplification of expanding your learning program",
    "End-to-end support to address limited people resources",
    "Solutions that scale to meet your current needs",
  ];

  return (
    <div className="w-full px-6 py-12 text-center">
      {/* Heading */}
      <h2 className="text-[1.5rem] font-normal text-gray-800 mb-10">
        Here’s how Professional Services can accelerate results
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

export default ProfessionalServices;
