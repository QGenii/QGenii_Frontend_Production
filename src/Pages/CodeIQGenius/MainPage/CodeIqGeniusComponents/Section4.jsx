import React from "react";
import { FiArrowRight } from "react-icons/fi";
import {useNavigate} from 'react-router-dom'

export default function LearningApproachCards() {
    const navigate = useNavigate()
  const cards = [
    {
      title: "On-Demand Learning",
      description:
        "Provide anytime access to the latest business, tech, leadership, and soft skills courses all in one learning platform.",
        link: "/ondemandcourse",
    },
    {
      title: "Hands-On Learning",
      description:
        "Boost tech skills faster with IQ Business Pro learn-by-doing technical projects.",
        link:'/CodeIQGenius',
    },
    {
      title: "Cohort Learning",
      description:
        "Grow your leaders with the CodeIQGenius Business Leadership Academy guided, self-paced programs.",
        link:"/CodeIQGenius",
    },
    {
      title: "Professional Services",
      description:
        "Get the expertise and support you need to achieve your goals faster.",
    },
  ];

  return (
    <section className=" ">
      <div className="flex flex-wrap justify-center gap-[1.25rem] ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="  w-[17.5rem] px-[1.40675rem] py-[1.74438rem] rounded-[1.12538rem]  border-[0.45px] border-[#919DB1] 
            bg-white 
            shadow-[ -0.9px_3.601px_10.804px_0_rgba(12,49,110,0.10) ] "
          >
            <div className=" flex w-[14.63025rem] flex-col items-end justify-center gap-[0.46875rem] rounded-[0.46875rem] ">
  <div className="flex flex-col items-center justify-center gap-[0.46875rem]">
            {/* Title */}
            <h4 className="text-[1.25rem] font-normal text-gray-800">
              {card.title}
            </h4>
            {/* Description */}
            <h4 className="text-gray-600 mt-2 text-[0.93rem]">{card.description}</h4>
            {/* Arrow button */}
            </div>
         <div className="flex  items-end justify-end px-2 py-2  cursor-pointer" onClick={()=>navigate(card.link)}><FiArrowRight size={12} /></div>
              
            
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
