import React from "react";
import Img3 from "../../assets/LearningEcoSystemDriveLearning/Img3.png";
import Img2 from "../../assets/LearningEcoSystemDriveLearning/Img2.png";
import Img4 from "../../assets/LearningEcoSystemDriveLearning/Img4.png";

const Section3 = () => {
  const features = [
    {
      title: "Monitor learning with at-a-glance dashboards ",
      description:
        "User-friendly dashboards surface critical metrics and trends. You can drive engagement with our Adoption Dashboard or discover popular content through Course Insights.",
      image: Img2,
      reverse: false,
      width: "25rem",
      height: "311.111px",
      aspectratio: "9/7",
    },
    {
      title: "Get granular data to analyze learning behavior ",
      description:
        "Our reports enable you to track and measure learning results. Segment enrollment and engagement data by group or individual for a granular view of learning activity.",
      image: Img3,
      reverse: true,
      width: "500px",
      height: "291.923px",
      aspectratio: "8/5",
    },
    {
      title: "Go beyond engagement metrics to see what’s really working",
      description:
        "Employee sentiment reports will tell you what’s resonating with your team and reveals the impact of learning. Only Udemy offers ratings and reviews data to help fuel your learning strategy.",
      image: Img4,
      reverse: false,
      width: "400px",
      height: "400px",

      aspectratio: "1/1",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-3 ">
    <h4 className=" text-[2rem] font-medium font-poppins leading-[normal]">Use learning data to drive business outcomes</h4>
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
