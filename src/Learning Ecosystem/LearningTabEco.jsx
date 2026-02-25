



import { useState } from "react";

export default function LearningTabEco() {
  const [activeTab, setActiveTab] = useState("Learning Ecosystem");

  const tabs = [
    {
      name: "Learning Ecosystem",
      title: "Learning Ecosystem",
      description:
        "We’re the only learning partner you need to deliver impactful skills development to your entire organization.",
      footer: "Learning Ecosystem (100%)",
      color: "text-white", // no special bg for bar
    },
    {
      name: "On-Demand Learning",
      title: "On-Demand Learning for Everyone",
      description:
        "Offer anytime access to current, relevant courses on business, tech, leadership, and more.",
      footer:
        "Curated Course collection, Learning paths and custom course creation",
      color: "bg-[#f59e0b] text-white", // orange
    },
    {
      name: "Immersive Learning",
      title: "Immersive Learning for Tech Teams",
      description:
        "Accelerate technical skills acquisition with learn-by-doing learning experiences.",
      footer:
        "Technology training with workspaces, labs, assessments, and certification prep courses",
      color: "bg-[#000080] text-white", // navy
    },
    {
      name: "Cohort Learning",
      title: "Cohort Learning for Leaders",
      description: "Develop leaders at scale through guided, paced programs.",
      footer:
        "Leadership development programs with live interactive sessions, asynchronous learning, and discussion forums",
      color: "bg-[#ec4899] text-white", // pink
    },
  ];

  return (
    <div className="w-full flex flex-col items-center py-12">
      {/* Title */}
      <div className="text-center max-w-2xl">
        <h2 className="text-black font-poppins text-2xl font-medium">
          A comprehensive learning experience
        </h2>
        <div className="text-black font-poppins mb-2 font-normal w-[44.125rem]">
          Develop everyone at your organization with the right skills through
          the right modalities, and an extensive partner ecosystem.
        </div>
      </div>

      {/* Top Tabs */}
      <div className="mt-6 flex gap-6 flex-wrap justify-center w-[69.25rem]">
        {tabs.map((tab) => (
          <span
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-8 py-3 rounded-full border transition shadow-sm text-sm cursor-pointer ${
              activeTab === tab.name
                ? "bg-brand text-white"
                : "bg-white text-gray-800 border-gray-200"
            }`}
          >
            {tab.name}
          </span>
        ))}
      </div>

      {/* Active Content */}
      <div className="mt-10 text-center">
        <h4 className="text-[1.25rem] font-semibold">
          {tabs.find((t) => t.name === activeTab)?.title}
        </h4>
        <span className="mt-2 text-gray-700 text-[0.875rem] font-normal block">
          {tabs.find((t) => t.name === activeTab)?.description}
        </span>
        <div className="w-full flex justify-center">
          <button className="mt-4 px-6 py-2 bg-[#0c316e] text-white rounded-md w-[12.25rem] text-[0.75rem]">
            Learn More
          </button>
        </div>
      </div>


      {/* Colored Progress Bar */}
<span className="mt-10 flex w-[69.25rem] rounded-full overflow-hidden  text-sm font-[1.25rem] text-center text-[#fff]">
  {tabs
    .filter((tab) => tab.name !== "Learning Ecosystem")
    .map((tab) => {
      const isActive = activeTab === tab.name;
      const showBaseColors = activeTab === "Learning Ecosystem";
      return (
        <span
          key={tab.name}
          className={`flex-1 py-5 text-white ${
            showBaseColors
              ? tab.color // all keep their original colors
              : isActive
              ? tab.color // active one keeps its color
              : "bg-gray-300 text-white" // inactive → gray bg but white text
          }`}
        >
          {tab.name}
        </span>
      );
    })}
</span>

      {/* Footer */}
      <div className="mt-4 text-sm text-center max-w-2xl">
        <h4
          className={`${
            activeTab === "On-Demand Learning"
              ? "text-orange-500"
              : activeTab === "Immersive Learning"
              ? "text-blue-800"
              : activeTab === "Cohort Learning"
              ? "text-pink-500"
              : "text-gray-800"
          }`}
        >
          {tabs.find((t) => t.name === activeTab)?.footer}
        </h4>
      </div>
    </div>
  );
}

