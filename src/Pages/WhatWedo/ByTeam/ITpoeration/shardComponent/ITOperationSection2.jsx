import React from "react";
import Img1 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img1.png";
import Img2 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img2.png";
import Img3 from "../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/Img3.png";

const Section2 = () => {
  const features = [
    {
      title: "Keep up-to-date on the newest technologies",
      description:
        "Build and reskill your talent from within to proactively address the competencies needed to drive business outcomes and stay ahead of the competition.",
     
      image: Img1,
      reverse: false,
      width: "25rem",
      height: "16.66669rem",
      aspectratio: "400.00/266.67",
    },
    {
      title: "Elevate your team’s cloud skills",
      description:
        "From AWS to Microsoft Azure and Google Cloud Platform we offer thousands of hours of content to ensure your team is at the top of their game.",
      
      image: Img2,
      reverse: true,
      width: "18.75rem",
      height: "18.75rem",
      aspectratio: "1/1",
    },
    {
      title: "Help your team with both technical & soft skills",
      description:
        "Prepare your team with leading network security certifications.Ensure company wide communications are clear, direct, and drive the desired results.From coding exercises to practice tests, get your team an effective hands-on learning solution.",
      
      image: Img3,
      reverse: false,
      width: "34rem",
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
              <h2>{item.title}</h2>
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
