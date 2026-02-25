import React from "react";
import Img1 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img1.png";
import Img2 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img2.png";
import Img3 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img3.png";

const Section2 = () => {
  const features = [
    {
      title: "Stay skilled in the latest data science trends",
      description:
        "From popular visualization tools to new analytics platforms, ensure your people get the skills they need to delivering actionable insights..",
     
      image: Img1,
      reverse: false,
      width: "25rem",
      height: "16.66669rem",
      aspectratio: "400.00/266.67",
    },
    {
      title: "Influence your company’s innovation efforts",
      description:
        "Ensure your data and insights fuel innovation by training your team to effectively communicate their observations to the right people, in the right way.",
      
      image: Img2,
      reverse: true,
      width: "18.75rem",
      height: "18.75rem",
      aspectratio: "1/1",
    },
    {
      title: "Define the right problems and drive the right results",
      description:
        "Equip your teams with the skills they need to best understand the business and turn their hypothesis into measurable results.",
      
      image: Img3,
      reverse: false,
      width: "34rem",
      height: "400px",

      aspectratio: "1/1",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-5  w-[64.0625rem] mx-auto">
    <h4 className=" text-[1.875rem] font-semibold font-poppins leading-[normal]">Drive business outcomes with CodeIQGenius Business</h4>
      <div className="features-container ">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${item.reverse ? "reverse" : ""}`}
          >
            <div className="feature-text">
             <h4 className="w-[34.75rem]  text-[1.5rem]">{item.title}</h4>
              <div className="">{item.description}</div>
              <h4 className="text-[#0c316e] underline font-semibold">{item.conclusion}</h4>
            </div>
            <div className="feature-image">
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: item.width,
                  height: item.height,
                  aspectRatio: item.aspectratio,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;
