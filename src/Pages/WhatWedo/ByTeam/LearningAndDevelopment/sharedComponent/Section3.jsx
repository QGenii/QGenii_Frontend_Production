import React from "react";
import Img1 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img1.png";
import Img2 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img2.png";
import Img3 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img3.png";

const Section3 = () => {
  const features = [
    {
      title: "Deliver meaningful results",
      description:
        "Access data and insights to guide your learning curriculum and tailor your programs to align to business outcomes.",
        conclusion: "Analytics & Reports",
      image: Img1,
      reverse: false,
      width: "25rem",
      height: "16.66669rem",
      aspectratio: "400.00/266.67",
    },
    {
      title: "Deliver engaging L&D programs",
      description:
        "With global instructors, dynamic learning formats, and bite-sized lessons you can upskill your entire workforce.",
        conclusion: "On demand learning",
      image: Img2,
      reverse: true,
      width: "18.75rem",
      height: "18.75rem",
      aspectratio: "1/1",
    },
    {
      title: "Scale learning globallys",
      description:
        "Teams of any size can access on-demand learning that helps them learn the skills they need.",
        conclusion: "Enterprise grade Platform",
      image: Img3,
      reverse: false,
      width: "400px",
      height: "400px",

      aspectratio: "1/1",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-3  w-[64.0625rem] mx-auto">
    <h4 className=" text-[1.875rem] font-semibold font-poppins leading-[normal]">Transform your learning programs with Udemy Business</h4>
      <div className="features-container ">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${item.reverse ? "reverse" : ""}`}
          >
            <div className="feature-text">
              <h2>{item.title}</h2>
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

export default Section3;
