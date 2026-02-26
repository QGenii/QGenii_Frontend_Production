import React from "react";
import Header from "../../../../Components/Header";
import Logo from "../../../../assets/assets/SmallTrainingTeam/Logo.png";
import { Link } from "react-router-dom";
import bgimg from "../../../../assets/assets/SmallTrainingTeam/bgimg.jpg";

import img1 from "../../../../assets/assets/SmallTrainingTeam/Man.svg";
import img2 from "../../../../assets/assets/SmallTrainingTeam/bag.svg";
import img3 from "../../../../assets/assets/SmallTrainingTeam/cap.svg";

import Section2 from "./sharedComponent/Section2";
import Section3 from "./sharedComponent/Section3";
import Section4 from "./sharedComponent/Section4";
import Section5 from "./sharedComponent/Section5";
import Section6 from "./sharedComponent/Section6";

const SmallTrainingPage1 = () => {
  const steps = [
    {
      id: 1,
      icon: (<img src={img1} alt="Icon 1" />),
      title: "Step 1 ",
      subtitle: "Sign UP",
    },
    {
      id: 2,
      icon: (<img src={img2} alt="Icon 1" />),
      title: "Step 2",
      subtitle: "Invite team",
    },
    {
      id: 3,
      icon: (<img src={img3} alt="Icon 1" />),
      title: "Step 3",
      subtitle: "Start team learning",
    },
  ];









  return (
    <div className="bg-[var(--bg-Color,#FAFAFA)] w-full h-[299.0625rem]">
      <div>
        <Header />
      </div>

      {/* section  1 */}

      <div
        style={{
          backgroundImage: `url(${bgimg}) `,
        }}
        className="learning-eco-system-container w-full h-[27.565rem]  bg-cover bg-center mb-10"
      >
        <div className="learning-eco-system-content flex items-center justify-evenly ">
          {/* Left Side */}
          <div className="w-[43rem] learning-eco-system-left-side px-[7.5rem] font-poppins flex flex-col items-start text-[1rem]  ">
            <h4 className="text-[#0c316e] font-poppins text-base font-semibold uppercase mb-1">
              Small team training{" "}
            </h4>
            <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[43rem] mb-1 ">
              Get your team learning in minutes
            </h2>
            <div
              style={{ fontSize: "0.875rem" }}
              className="text-black font-poppins mb-2 not-italic text-sm font-normal leading-normalcapitalize w-[38.4rem]"
            >
              Build applied skills in everything from public speaking to Python
            </div>

            <button className="px-10 py-3 capitalize bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
              <Link to="/teamsuccesspage">Start free trail</Link>
            </button>

            <div className="flex mt-3 w-full justify-center items-center  gap-2 p-3 bg-gradient-to-br  rounded-md">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center  ">
                  {/* Step block */}
                  <div className="flex  items-center text-center gap-[0.46875rem]">
                    <div className="rounded-[0.46875rem_0.46875rem_0.46875rem_0] bg-[linear-gradient(319deg,#0C316E_48.28%,#0288E7_106.13%)] text-white text-2xl w-12 h-12  flex items-center justify-center mb-2">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[0.75rem] text-nowrap">{step.title}</h4>
                      <h4 className="text-[0.5625rem] text-gray-600 text-nowrap  font-normal">
                        {step.subtitle}
                      </h4>
                    </div>
                  </div>

                  {/* Arrow (not after the last step) */}
                  <div>
                    {index !== steps.length - 1 && (
                      <div className="mx-4 text-xl">➜</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="learning-eco-system-right-side w-[ 38.625rem] h-[25.75rem] aspect-[3/2] flex-shrink-0 ml-6 overflow-auto">
            <img
              src={Logo}
              alt="Enterprise Training"
              className="w-full h-full object-cover rounded-lg shadow "
            />
          </div>
        </div>
      </div>


      {/* Section 2 */}

      <div className=" py-3">


        <Section2 />
      </div>


      {/* Section 3 */}
      <div >


        <Section3 />
      </div>

      {/* Section 4 */}
      <div >


        <Section4 />
      </div>

      {/* Section 5*/}
      <div >


        <Section5 />
      </div>


      <div>
        <Section6 />
      </div>

    </div>
  );
};

export default SmallTrainingPage1;
