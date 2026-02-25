import React from 'react'
import Header from '../../../Components/Header'

import  bgImg from '../../../assets/CodeIQGenius/MainPage/ProfessionalService/bgImg.jpg';
import Logo from '../../../assets/CodeIQGenius/MainPage/ProfessionalService/Logo.png';
import Section2 from './ProfessionalsharedComponent/Section2';
import Section3 from './ProfessionalsharedComponent/Section3';
import Section4 from './ProfessionalsharedComponent/Section4';
import Testimonial from '../../../Components/TestimonialSection';
import Testimonial1 from '../../../Learning Ecosystem/Testimonial';
import Section5 from './ProfessionalsharedComponent/Section5';

// import Section5 from '';


const ProffessionService = () => {
  return (
    <div className='h-[383.6875rem] w-full bg-white'>
      <div className="learningEcoSystemDriveLearningPage  w-full  ">
          <div className=" mb-8">
            <Header />
          </div>

          {/* section 1 */}

          <div
            style={{
              backgroundImage: `url(${bgImg}) `,
            }}
            className="learning-eco-system-container w-full h-[441px] grid items-center  bg-cover bg-center mb-10 "
          >
            <div className="learning-eco-system-content flex items-center justify-evenly gap-[20rem]   ">
              {/* Left Side */}
              <div className="learning-eco-system-left-side max-w-md font-poppins flex flex-col items-start   ">
                <h4  className='text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1'>PROFESSIONAL SERVICES</h4>
                <h4 className="text-[#0c316e] font-poppins text-[1rem] font-semibold uppercase mb-1">
                 
                </h4>
                <h2 className="text-black font-poppins text-[2.25rem] font-medium capitalize w-[50.8125rem] mb-1">
                  
                  Maximize your organization’s potential
                </h2>
                <div
                  style={{ fontSize: "0.875rem" }}
                  className="text-black font-poppins mb-2 not-italic font-normal leading-normal capitalize w-[36.4rem]"
                >
                 Get the expertise and support you need to achieve your goals faster.
                </div>

                <div className="flex w-[30rem]  gap-3">
                  <button className="px-2 py-3 bg-[#0c316e] text-white font-poppins font-semibold text-base rounded-md shadow-md transition">
                   Get in touch
                  </button>
                  
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

       

          
        </div>


{/* Section2 */}
<Section2/> 
{/* section 3 */}
<Section3/>
{/* section 4 */}
<Section4/>
{/* import from component */}
<Testimonial/>

{/* import from Learning Ecosystem */}
<Testimonial1/>
{/* section 5 */}
<Section5/>


    </div>
  )
}

export default ProffessionService

