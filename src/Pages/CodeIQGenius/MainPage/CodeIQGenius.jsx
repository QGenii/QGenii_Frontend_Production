import React from 'react'
import  bgimg from '../../../assets/CodeIQGenius/MainPage/bgimg.jpg';
import Logo from '../../../assets/CodeIQGenius/MainPage/Logo.png';

import Header from "../../../Components/Header";
import Section2 from './CodeIqGeniusComponents/Section2.jsx';
import Testimonial from '../../../Components/TestimonialSection.jsx';
import Section3 from './CodeIqGeniusComponents/Section3.jsx';
import Section4 from './CodeIqGeniusComponents/Section4.jsx';
import Section5 from './CodeIqGeniusComponents/Section5.jsx';
import Section6 from './CodeIqGeniusComponents/Section6.jsx';
import Section7 from './CodeIqGeniusComponents/Section7.jsx';
import Section8 from './CodeIqGeniusComponents/Section8.jsx';
import Section9 from './CodeIqGeniusComponents/Section9.jsx';



const CodeIQGenius = () => {
  return (
    <div className='h-[383.68rem] w-full' >


         <div className="learningEcoSystemDriveLearningPage  w-full  ">
          <div className=" mb-8">
            <Header />
          </div>

          {/* section 1 */}

          <div
            style={{
              backgroundImage: `url(${bgimg}) `,
            }}
            className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
          >
            <div className="learning-eco-system-content flex items-center justify-evenly gap-[20rem]   ">
              {/* Left Side */}
              <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
                <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
                 
                </h4>
                <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[50.8125rem] mb-1">
                  
                  The AI-powered skills development platform that accelerates transformation
                </h2>
                <div
                  style={{ fontSize: "0.875rem" }}
                  className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[36.4rem]"
                >
                  Whatever your goal, the path starts here
                </div>

                <div className="flex w-[30rem]  gap-3">
                  <button className="px-2 py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                   Get Started
                  </button>
                  <input
                    type="button"
                    className=" px-5 py-3 text-[#0c316e] border-1 font-poppins font-semibold text-center rounded-md shadow-md transition"
                    value="  Compare Plans"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="learning-eco-system-right-side w-[24.34rem] h-[23.4rem]  aspect-[195/188] flex-shrink-0 ml-6 overflow-hidden ">
                <img
                  src={Logo}
                  alt="Enterprise Training"
                  className="object-cover rounded-lg shadow"
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <Section2/>

          {/* testimonial import from component */}

          <Testimonial/>

          {/* section 3*/}
          <Section3/>

          {/* section 4*/}
          <Section4/>

          {/* Section 5 */}
          <Section5/>

{/* section 6 */}

           <Section6/>

          {/* Section 7 */}
          <Section7/>

          {/* Section 8 */}
          <Section8/>

          {/* Section 9  */}

<Section9/>

          
        </div>
    </div>
  )
}

export default CodeIQGenius