import React, { useState } from "react";
import Clock from "../assets/MyStuding/overview/Clock.svg";


function SectionList() {
  const [openIndex, setOpenIndex] = useState(null); // Keeps track of the dropdown state

  const sections = [
    { id: 1, title: "Section 1: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 2, title: "Section 2: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 3, title: "Section 3: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 4, title: "Section 4: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 5, title: "Section 5: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 6, title: "Section 6: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 7, title: "Section 7: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 8, title: "Section 8: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 9, title: "Section 9: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
    { id: 10, title: "Section 10: Program Presentation", total: "1 Hr 8 Min", Course: "17/17" },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle dropdown open/close
  };

  return (
    <div className="">
      {sections.map((section, index) => (
        <div key={section.id} className="bg-white   rounded-lg ">
          <div className="flex justify-between items-center  self-stretch border px-[1.4375rem] py-[0.6875rem] border-[rgba(0,0,0,0.25)]  ">
            <div className=" ">
              <h4 className="text-[0.75rem] font-medium text-gray-800">{section.title}</h4>

              <div className="flex items-center justify-first gap-3 mt-[0.31rem]">
                <h4 className=" px-[0.221rem]  py-[0.088rem] bg-[#ECEEF6] rounded-[0.3125rem] text-[0.5rem]">Total:{section.Course}</h4>
                <h4 className=" px-[0.221rem]  py-[0.088rem] bg-[#ECEEF6] rounded-[0.3125rem] text-[0.5rem] flex items-center justify-center text-gray-600"><img className="w-[0.88444rem] h-[0.88444rem] aspect-[14.15/14.15]" src={Clock} alt="" />: {section.total}</h4>
              </div>
            </div>

            <div
              onClick={() => toggleDropdown(index)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {openIndex === index && (
            <div className="mt-4 text-gray-700">
              {/* Additional details can go here */}
              More details about {section.title}.
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SectionList;
