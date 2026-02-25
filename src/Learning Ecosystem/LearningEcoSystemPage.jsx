import React from "react";
import Logo from "../assets/LearningEcoSystem/Logo.png";
import Img1 from "../assets/LearningEcoSystem/LearningEcoImg1.png";

import Header from "../Components/Header";
import LearningTabEco from "./LearningTabEco";
import TourIqGenius from "./TourIqGenius";
import LearningEcoFeatures from "./LearningEcoFeatures";
import Testimonial from "./Testimonial";
import Gardient from "./Gardient";

const LearningEcoSystemPage = () => {
  return (
    <>
      <div className="learning-eco-system-page w-full h-[312.75rem] bg-white">
        <div className=" ">
          <div className=" ">
            <Header />
          </div>

          <div
            style={{
              backgroundImage: `url(${Img1}) `,
            }}
            className="learning-eco-system-container w-full h-[441px]  bg-cover bg-center mb-10"
          >
            <div className="learning-eco-system-content flex items-center justify-evenly gap-[2.275rem] ">
              {/* Left Side */}
              <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start ">
                <h4 className="text-[#0c316e] font-poppins text-base font-semibold uppercase mb-1">
                  Learning EcoSystem
                </h4>
                <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[36.625rem] mb-1">
                  Power the future with learning for everyone
                </h2>
                <div
                  style={{ fontSize: "0.875rem" }}
                  className="text-black font-poppins mb-2 not-italic text-sm font-normal leading-normal capitalize w-[36.4rem]"
                >
                  We've got everything you need to deliver flexible and
                  effective skills development for your entire workforce.
                </div>

                <button className="px-10 py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                  Request a Demo
                </button>
              </div>

              {/* Right Side */}
              <div className="learning-eco-system-right-side w-[618.75px] h-[412.5px] aspect-[3/2] flex-shrink-0 ml-6">
                <img
                  src={Logo}
                  alt="learning ecosystem"
                  className="w-full h-full object-cover rounded-lg shadow"
                />
              </div>
            </div>
          </div>

          {/* learning tabs   Eco */}
          <div className="learning-eco-system-tabs">
            <LearningTabEco />
          </div>

          {/* tour and one other component here */}
          <div className="mt-15">
            <TourIqGenius />
          </div>

          {/* features */}
          <div>
            <LearningEcoFeatures />
          </div>

          <div>
            <Testimonial />
          </div>

          <div >
            <Gardient/>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningEcoSystemPage;
