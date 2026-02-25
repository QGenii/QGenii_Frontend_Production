import React from "react";
import Header from "../../Components/Header";
import Logo from "../../assets/assets/DedicatedCustomerSuccessTeam/Logo.png";
import bgimg from "../../assets/assets/DedicatedCustomerSuccessTeam/bgimg.jpg";
import TestimonialSection from "../../Components/TestimonialSection";
import Section3 from "./Section3";
import { Section } from "lucide-react";
import Section2 from "./Section2";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8"

import { Link } from 'react-router-dom';

const DedicatedCustomerSuccessTeam = () => {
  return (
    <div className="bg-[var(--bg-Color,#FAFAFA)] w-full h-[320.5rem]">
      <div>
        <div className=" ">
          <Header />
        </div>

        {/* first section => container 1 */}

        <div
          style={{
            backgroundImage: `url(${bgimg}) `,
          }}
          className="learning-eco-system-container w-full h-[441px]  bg-cover bg-center mb-10"
        >
          <div className="learning-eco-system-content flex items-center justify-evenly gap-[2.275rem] ">
            {/* Left Side */}
            <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start ">
              <h4 className="text-[#0c316e] font-poppins text-base font-semibold uppercase mb-1">
                DEDICATED CUSTOMER SUCCESS TEAM
              </h4>
              <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[36.625rem] mb-1">
                We’ll help you connect learning to business outcomes
              </h2>
              <div
                style={{ fontSize: "0.875rem" }}
                className="text-black font-poppins mb-2 not-italic text-sm font-normal leading-normal capitalize w-[36.4rem]"
              >
                Acting as an extension of your own team, our customer success
                partner helps your organization shape, execute, and optimize
                learning strategies to achieve business goals.
              </div>

              <button className="px-10 py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                <Link to='/requestdemo'>Request a Demo</Link>

              </button>
            </div>

            {/* Right Side */}
            <div className="learning-eco-system-right-side w-[35rem] h-[23rem] aspect-[3/2] flex-shrink-0 ml-6 overflow-hidden">
              <img
                src={Logo}
                alt="Enterprise Training"
                className="w-full h-full object-cover rounded-lg shadow"
              />
            </div>
          </div>
        </div>

        {/*  import from components   */}
        <div >
          <TestimonialSection />
        </div>

        {/* section=>container 2 */}
        <div>
          <Section2 />
        </div>
        {/* section =>container 3 */}

        <div>
          <Section3 />
        </div>

        {/* section =>container 4  */}

        <div>
          <Section4 />
        </div>

        {/* section =>container 5  */}

        <div>
          <Section5 />
        </div>

        {/* section =>container 6 */}

        <div>
          <Section6 />
        </div>

        {/* section =>container 7 */}

        <div>
          <Section7 />
        </div>

        {/* section =>container 7 */}

        <div className="mt-[6rem]">
          <Section8 />
        </div>



      </div>
    </div>
  );
};

export default DedicatedCustomerSuccessTeam;
