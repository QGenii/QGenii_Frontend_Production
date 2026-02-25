import React from "react";
import Img1 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img1.png";
import Img2 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img2.png";
import Img3 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img3.png";

const Section3 = () => {
  const features = [
    {
      title: "Be strategic business partners",
      description:
        "Expert instructors will upskill your HR team in onboarding, training and development, conflict management, retention, and more.",
        
      image: Img1,
      reverse: false,
      width: "25rem",
      height: "16.66669rem",
      aspectratio: "400.00/266.67",
    },
    {
      title: "Refine your recruitment & talent acquisition process",
      description:
        "Boost your team’s professionalism, improve their time management and hone their negotiation skills.",
       
      image: Img2,
      reverse: true,
      width: "18.75rem",
      height: "18.75rem",
      aspectratio: "1/1",
    },
    {
      title: "Create an equitable, inclusive, and culturally competent environment",
      description:
        "Train your team on how to expertly communicate your company’s values, build culture and embed inclusive thinking into your recruitment and retention efforts.",
      image: Img3,
      reverse: false,
      width: "400px",
      height: "400px",

      aspectratio: "1/1",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-3  w-[64.0625rem] mx-auto">
    <h4 className=" text-[1.875rem] font-semibold font-poppins leading-[normal]">Drive business outcomes with Udemy Business</h4>
      <div className="features-container ">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${item.reverse ? "reverse" : ""}`}
          >
            <div className="feature-text">
              <h2>{item.title}</h2>
              <div>{item.description}</div>
              
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

export default Section3;
