import React from "react";
import { FileText, BookOpen, Target, LineChart } from "lucide-react"; // example icons

const services = [
  {
    icon: <FileText size={36} />,
    title: "Project management",
    desc: "Let us sweat the details. Get support from planning to post-launch to set yourself up for success.",
    pdf: "Project manage PDF",
  },
  {
    icon: <BookOpen size={36} />,
    title: "Learning architecture",
    desc: "Assess your plan with a pro. Get guidance and support in creating, designing, and validating your learning strategy.",
    pdf: "Learning Architecture PDF",
  },
  {
    icon: <LineChart size={36} />,
    title: "Content curation",
    desc: "Deliver the impact you desire. Get personalized recommendations to reach your skilling goals.",
    pdf: "Content Curation PDF",
  },
  {
    icon: <Target size={36} />,
    title: "Learning program management",
    desc: "Put time back on your side. Get a dedicated learning program manager to help you with admin tasks, user management and communication, and alignment with best practices.",
    pdf: "Learning Program Management PDF",
  },
];

const ServicesGrid = () => {
  return (
    <div className="px-6 py-12">
      <h4 className="text-center text-2xl font-normal mb-10">
        Learn more about our services
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[8.125rem] max-w-4xl mx-auto">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="py-[1.16131rem] px-[0.96775rem] h-[12.14019rem] border rounded-xl shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between"
          >
            <div className="flex flex-col gap-[0.5625rem]">
              <div className="text-gray-800 ">{service.icon}</div>
              <h4 className="text-lg font-bold ">{service.title}</h4>
              <h4 className="text-gray-600 text-[0.677rem] w-[21.77419rem]">{service.desc}</h4>
            </div>

            <div className="">
              <span className="px-4 py-[0.46875rem] text-[0.5625rem] border border-[#0C316E] text-[#0C316E] rounded-md text-sm font-medium hover:bg-blue-50 transition">
                {service.pdf}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
