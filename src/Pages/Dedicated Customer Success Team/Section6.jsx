import { useState } from "react";

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState("Project Management");

  const tabs = [
    {
      name: "Project Management",
      content:
        "Navigate every phase of your implementation seamlessly—from planning to launch and beyond with project management support.",
    },
    {
      name: "Learning Architecture",
      content:
        "Unlock learning strategies and maximize business outcomes with the expertise of a learning consultant.",
    },
    {
      name: "Content Curation",
      content:
        "Strengthen your organization’s skills and training strategy with carefully curated content recommendations.",
    },
    {
      name: "Learning Program Management",
      content:
        "Expand your team’s capabilities with additional resources to maximize the potential and increase execution of your learning program.",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        {tabs.map((tab) => (
          <span
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-6 py-2 rounded-full font-medium transition text-[0.875rem] ${
              activeTab === tab.name
                ? "bg-[#0C316E] text-white "
                : "bg-white text-black border border-gray-200 shadow-sm"
            }`}
          >
            {tab.name}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="text-center max-w-2xl">
        <h2 className="text-[1.25rem] font-medium mb-3">{activeTab}</h2>
        <h4 className="text-black text-[1rem] font-normal">{tabs.find((t) => t.name === activeTab).content}</h4>
      </div>
    </div>
  );
}
