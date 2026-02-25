import React from "react";

import Img1 from "../../../../assets/assets/HowDoWeIt/AiEnabledLearning/Img1.png"
import Img2 from "../../../../assets/assets/HowDoWeIt/AiEnabledLearning/Img2.png"

const AiEnabledLearningSection4 = () => {
  const features = [
    {
     title: "Accelerated program delivery",
      description:
        "With Skills Mapping and AI-powered learning paths, you can turn business goals into targeted learning paths for your entire organization. This streamlined approach takes just minutes, not months, and helps learners efficiently build the skills that matter most.",
      image: Img1,
      reverse: false,
       width: "27.875rem",
      height: "18.875rem",
      aspectratio: " 427/285",
    },
    {
        title:"Personalized guidance",
      
      description:
        "The Qgenii AI Assistant is your employees’ trusted learning companion. It answers course questions according to instructor content, breaks down complex topics into simple explanations, and even generates quizzes to test knowledge retention – all so you can keep learners engaged and moving forward.",
      image: Img2,
      reverse: true,
      width: "26.875rem",
      height: "26.875rem",
      aspectratio: "1/1",
    },
  
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-3 ">
    
      <div className=" w-[63.5rem] ">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item  ${item.reverse ? "reverse" : ""}`}
          >
            <div className="feature-text">
              
              <div className="">
                <h4 className="w-[28.1875rem]  text-[1.5rem]">{item.title}</h4>
              <div className="w-[26.1875rem]  ">{item.description}</div>
              </div>
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

export default AiEnabledLearningSection4;
