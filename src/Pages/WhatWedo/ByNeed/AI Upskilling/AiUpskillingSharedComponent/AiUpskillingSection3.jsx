import React from "react";

const paths = [
  {
    title: "Deep Dive: Agentic AI",
    description:
      "Your teams will learn how to create and deploy AI-powered agents and multi-agent systems to enhance automation, efficiency, and innovation.",
  },
  {
    title: "AI for Sales Professionals",
    description:
      "Your sales teams will discover how to use AI to drive sales strategies, build sales funnels, segment leads, improve outreach, and boost productivity.",
  },
  {
    title: "AI for Finance Professionals",
    description:
      "With this path, your finance teams can unlock new levels of efficiency, insight, and impact using AI.",
  },
  
];

const path =[
    {
    title: "AI for Marketers",
    description:
      "Your marketing teams will find out how to harness AI for audience targeting, data-driven content creation, SEO mastery, AI-powered market research, and more.",
  },

]

export default function AIStarterPaths() {
  return (
    <section className="py-12 px-6 bg-white w-[71rem] mx-auto flex flex-col gap-[1.88rem] ">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-10">
        AI Starter Paths for key roles and goals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2  place-items-center ">
        {paths.map((path, index) => (
          <div
            key={index}
            className="w-full max-w-xs py-[2.875rem] bg-emerald-300   rounded-[1.9375rem] border border-[#919DB1] bg-[linear-gradient(90deg,#FFF_0%,#FFD5B4_100%)] shadow-[ -1px_4px_12px_0_rgba(40,0,174,0.10)] "
          >
            <h4 className="font-semibold text-gray-900 text-center mb-2">
              {path.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed text-[0.874rem]">
              {path.description}
            </p>
          </div>
        ))}
      </div>

      <div
  className={`grid gap-2 justify-center justify-items-center 
  ${path.length === 1 ? "grid-cols-1 place-items-center" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}
>
  {path.map((path, index) => (
    <div
      key={index}
      className="w-[22.25rem] max-w-xs py-[2.875rem] px-2 bg-emerald-300  border  rounded-[1.9375rem]  border-[#919DB1] bg-[linear-gradient(90deg,#FFF_0%,#FFD5B4_100%)] shadow-[ -1px_4px_12px_0_rgba(40,0,174,0.10)]"
    >
      <h4 className="font-semibold text-gray-900 text-center mb-2">
        {path.title}
      </h4>
      <h4 className="text-sm text-gray-600 leading-relaxed text-[0.874rem] font-normal">
        {path.description}
      </h4>
    </div>
  ))}
</div>



    </section>
  );
}
