import React from "react";
import Img1 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img1.png";
import Img2 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img2.png";
import Img3 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img3.png";

const Section2 = () => {
  const features = [
    {
      title: "Upgrade skills at the pace of technology",
      description:
        "Our model delivers the most up-to-date tech training that allows your organization to keep up with the speed of innovation and deliver on key business initiatives.",
     
      image: Img1,
      reverse: false,
      width: "25rem",
      height: "16.66669rem",
      aspectratio: "400.00/266.67",
    },
    {
      title: "Drive digital transformation without disruption",
      description:
        "Embrace automation, leverage the cloud, and adopt key technologies at the speed of change—all while minimizing disruption to the business.",
      
      image: Img2,
      reverse: true,
      width: "18.75rem",
      height: "18.75rem",
      aspectratio: "1/1",
    },
    {
      title: "Go beyond tech, build character",
      description:
        "Turn your engineers into leaders. Ensure they have the foundational skills it takes to move with change, collaborate and spark innovation.",
      
      image: Img3,
      reverse: false,
      width: "400px",
      height: "400px",

      aspectratio: "1/1",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-3  w-[64.0625rem] mx-auto">
    <h4 className=" text-[1.875rem] font-semibold font-poppins leading-[normal]">Train your team with CodeIQ Genius Business</h4>
      <div className="features-container ">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${item.reverse ? "reverse" : ""}`}
          >
            <div className="feature-text">
              <h4 className="w-[34.75rem]  text-[1.5rem]">{item.title}</h4>
              <div>{item.description}</div>
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
