import React from "react";


import Img1 from '../../../../assets/assets/HowDoWeIt/MultiLanguageCollection/Img1.png';
import Img2 from '../../../../assets/assets/HowDoWeIt/MultiLanguageCollection/Img2.png';
import Img3 from '../../../../assets/assets/HowDoWeIt/MultiLanguageCollection/Img3.png';
const Section3 = () => {
  const features = [
    {
     title:"Experience genuine instruction, not just translations.",
      description:
        "Our real-world experts teach in their native language, delivering courses on in-demand topics with cultural context and nuances that resonate.",
      image: Img1,
      reverse: false,
      width: "26.6875rem",
      height: "17.8125rem",
      aspectratio: " 427/285",
    },
    {
      title:"Content tailored to regional workplace needs",
      description:
        "Skills and etiquette vary by region. Our marketplace offers culturally relevant courses to boost engagement and retention.",
      image: Img2,
      reverse: true,
      width: "21.875rem",
      height: "21.875rem",
      aspectratio: "1/1",
    },
    {
   title:"Learning in your preferred language",
      description:
        "The Multi-Language Collection includes over 17,000+ courses in Arabic, French, German, Hindi, Indonesian, Italian, Japanese*, Korean*, Mandarin, Polish, Portuguese, Russian, Spanish, Turkish, and Vietnamese.</br>*Note: Available only with the Premium collection add on.",
      image: Img3,
      reverse: false,
      width: "24rem",
      height: "24rem",

      aspectratio: "1/1",
    },
   
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-3 ">
    <h4 className=" text-[1.5rem] font-normal font-poppins leading-[normal]">Empower your whole organization to drive learning</h4>
    <h4 className=" text-[1.25rem] text-center font-light font-poppins leading-[normal] w-[66rem]">Foster a sense of community and team alignment with group-based programs and courses, and keep leaders engaged with a variety of learning formats..</h4>
      <div className="">
        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${item.reverse ? "reverse" : ""}`}
          >
            <div className="feature-text">
              <h4 className="w-[32.1875rem]  text-[1.25rem] font-medium text-[#1E1E1E] ">{item.title}</h4>
              <h4 className="w-[32.1875rem]  font-normal text-[1rem] ">{item.description}</h4>
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
