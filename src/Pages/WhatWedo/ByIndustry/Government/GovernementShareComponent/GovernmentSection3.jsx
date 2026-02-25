
import React from "react";

export default function GovernmentSection3() {
  const sections = [
    {
      title: "State & Local",
      description:
        "Get your team ready to take on the future. Fresh and relevant online courses prepare your agency to keep pace with change.",
    },
    {
      title: "Federal",
      description:
        "Navigate digital transformation and retain top talent. Dynamic online training helps your workforce meet mission-critical objectives.",
    },
    {
      title: "International",
      description:
        "Give your agency the skills they need to stay ahead. Courses taught by real-world experts from around the world make it easy to upskill and reskill your public servants.",
    },
  ];

  return (
    <section className="  text-center bg-white shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)] mt-[3rem] py-[1.62rem]">
      <div className="max-w-5xl mx-auto">
        <h4 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Training for every government agency
        </h4>
        <h4 className="text-gray-600 mb-12">
          With <span className="font-medium">CodeIQGenius Government</span> all public servants have access
          to the crucial skills training they need to stay ahead of global
          transformation.
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[7.38rem] ">
          {sections.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center w-[18rem] "
            >
              <h4 className="text-[0.75rem] font-semibold mb-3">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-6">{item.description}</p>
              <input
                type="button"
                value="Learn More"
                className="flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem] rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] text-brand font-poppins text-[0.75rem] not-italic font-medium leading-normal"/>
               
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


