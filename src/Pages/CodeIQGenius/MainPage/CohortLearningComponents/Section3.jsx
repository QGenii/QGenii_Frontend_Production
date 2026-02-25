import React from "react";

import Img1 from "../../../../assets/CodeIQGenius/MainPage/CohortLearning/Img1.png"
import Img2 from "../../../../assets/CodeIQGenius/MainPage/CohortLearning/Img2.png"
import Img3 from "../../../../assets/CodeIQGenius/MainPage/CohortLearning/Img3.png"
import Img4 from "../../../../assets/CodeIQGenius/MainPage/CohortLearning/Img4.png"
const Section3 = () => {
  const features = [
    {
     
      description:
        "Programs offer a mix of self-paced activities, collaborative discussion forums, and expert-led live online events.",
      image: Img1,
      reverse: false,
      width: "26.6875rem",
      height: "17.8125rem",
      aspectratio: " 427/285",
    },
    {
      
      description:
        "Our expert network of faculty, authors, and thought leaders guide learners throughout the program.",
      image: Img2,
      reverse: true,
      width: "21.875rem",
      height: "21.875rem",
      aspectratio: "1/1",
    },
    {
   
      description:
        "Programs can be tailored to provide enterprise context to the learners’ needs.",
      image: Img3,
      reverse: false,
      width: "24rem",
      height: "24rem",

      aspectratio: "1/1",
    },
    {
     
      description:
        "Thanks to AI and machine learning, your organization will be able to better predict behavioral change, provide actionable insights, and drive business impact.",
      image: Img4,
      reverse: true,
      width: "18rem",
      height: "18rem",

      aspectratio: "1/1",
      button:"Learn More AI   "
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-3 ">
    <h4 className=" text-[1.5rem] font-normal font-poppins leading-[normal]">Support your leaders with interactive development programs</h4>
    <h4 className=" text-[1.25rem] text-center font-light font-poppins leading-[normal] w-[66rem]">Foster a sense of community and team alignment with group-based programs and courses, and keep leaders engaged with a variety of learning formats.</h4>
      <div className="">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${item.reverse ? "reverse" : ""}`}
          >
            <div className="feature-text">
              
              <div className="w-[32.1875rem]  ">{item.description}</div>
              {item.button && <input
                type="button"
                value={item.button}
                className="flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem] rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] text-brand font-poppins text-[0.75rem] not-italic font-medium leading-normal"/>
               
            }
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
