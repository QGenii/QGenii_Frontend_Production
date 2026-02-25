import React from "react";

import Img1 from '../../../../assets/CodeIQGenius/sharedImg/Img1.png';
import Img2 from '../../../../assets/CodeIQGenius/sharedImg/Img2.png';
import Img3 from '../../../../assets/CodeIQGenius/sharedImg/Img3.png';
import Img4 from '../../../../assets/CodeIQGenius/sharedImg/Img4.png';
import {useNavigate} from "react-router-dom"

const CardSection = () => {
  const navigate = useNavigate()
  const cards = [
    {
      title: "Upskill your entire organisation",
      subtitle: "ENTERPRISE-WIDE TRAINING",
      desc: "Cultivate a learning culture that keeps every team engaged and growing.",
      img: <img src={Img1} alt="Img1" className="w-[18.75rem] h-[12.5rem] aspect-[3/2]" />,

       link: "/enterprisewide",
    },
    {
      title: "Develop and Validate Skills",
      subtitle: "CERTIFICATION PREPARATION",
      desc: "Grow employees skills with certification prep courses and badges to share their accomplishments once they’ve passed their exams.",
      img:  <img src={Img2} alt="Img2" className="w-[12.05rem] h-[12.02rem] aspect-[3/2]"/>,
    },
    {
      title: "Boost Productivity for Gen AI",
      subtitle: "AI UPSKILLING",
      desc: "Use our AI Starter Paths and new AI packages to scale AI fluency across your entire organization.",
      img:  <img src={Img3} alt="Img3" className="w-[11.25rem] h-[11.188rem] aspect-[200.00/192.41]" />,
    },
    {
      title: "Boost Productivity for Gen AI",
      subtitle: "AI UPSKILLING",
      desc: "Use our AI Starter Paths and new AI packages to scale AI fluency across your entire organization.",
      img:  <img src={Img4} alt="Img4" className="w-[12.5rem] h-[12.78rem] aspect-[3/2]" />,
    },
   
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-6 px-[0.9375rem] py-[1.125rem] ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="min-w-[22.9625rem]  h-[21.8125rem] max-w-[350px] bg-white shadow-md rounded-2xl px-[0.9375rem] py-[1.125rem] flex flex-col justify-between hover:shadow-lg transition-all duration-300"
          >
            {/* learn this thing */}
           <div  className="flex justify-center items-center cursor-pointer"   onClick={() => navigate(card.link)}> {card.img}</div>

            <div className="flex flex-col justify-start gap-[0.46875rem]">
            <h4 className="text-[0.75rem] font-semibold text-[#0C316E] uppercase">
              {card.subtitle}
            </h4>
            <h2 className="text-[1.25rem] font-semibold text-gray-900 mb-2 ">
              {card.title}
            </h2>
            <div className="flex flex-col justify-start gap-[0.46875rem]"><h4 className="text-[0.65rem] text-[#1E1E1E]">{card.desc}</h4></div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
