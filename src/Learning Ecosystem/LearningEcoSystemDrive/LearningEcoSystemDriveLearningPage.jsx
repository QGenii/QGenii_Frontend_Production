import React from "react";
import Header from "../../Components/Header";

import Img1 from "../../assets//LearningEcoSystemDriveLearning/Img1.jpg";
import Logo from "../../assets/LearningEcoSystemDriveLearning/Logo.png";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Testimonial from "../Testimonial";
import Gardient from "../Gardient";

const LearningEcoSystemDriveLearningPage = () => {
  return (
    <>
      <div className="w-full h-[312.75rem]">
        {/* section1 */}


        <div className="learningEcoSystemDriveLearningPage  w-full  ">
          <div className=" mb-8">
            <Header />
          </div>

          <div
            style={{
              backgroundImage: `url(${Img1}) `,
            }}
            className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
          >
            <div className="learning-eco-system-content flex items-center justify-evenly  ">
              {/* Left Side */}
              <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start px-6 ">
                <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
                  ANALYTICS & INSIGHTS
                </h4>
                <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[36.625rem] mb-1">
                  Gain visibility into how your employees are learning
                </h2>
                <div
                  style={{ fontSize: "0.875rem" }}
                  className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[36.4rem]"
                >
                  Udemy Business gives you comprehensive insights into learning
                  activity, so you can track your employees’ progress, identify
                  trends, and know when to take action.
                </div>

                <div className="flex w-[30rem]  gap-3">
                  <button className="px-2 py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                    Request a Demo
                  </button>
                  <input
                    type="button"
                    className=" px-5 py-3 text-[#0c316e] border-1 font-poppins font-semibold text-center rounded-md shadow-md transition"
                    value="  Compare Plans"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="learning-eco-system-right-side w-[35.156rem] h-[23.478rem] aspect-[3/2] flex-shrink-0 ml-6 overflow-hidden ">
                <img
                  src={Logo}
                  alt="Enterprise Training"
                  className="w-full h-full object-cover rounded-lg shadow"
                />
              </div>
            </div>
          </div>
          
        </div>

        {/* section2 testimonial */}

        <Section2/>

         {/* section 3 */}
         <Section3/>

         {/* section 4 import from learning ecosystem */}

         <Testimonial/>

         {/* section 5  import from learning ecosystem */}


         <Gardient/>



      </div>
    </>
  );
};

export default LearningEcoSystemDriveLearningPage;
