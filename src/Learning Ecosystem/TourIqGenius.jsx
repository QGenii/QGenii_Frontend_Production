import React from 'react'

import Img3 from '../assets/WhatWedo/Enterpriseimage/Img3.png';
import '../LearningEcoSystemStyle/TourIqGenius.css';
import featureImg1 from "../assets/WhatWedo/Enterpriseimage/featureImg1.png";
import featureImg2 from "../assets/WhatWedo/Enterpriseimage/featureImg2.png";
import { Link } from 'react-router-dom';


const TourIqGenius = () => {
  return (
    <div>
      <div className="learning-eco-system-container4">
        <div className="learning-eco-system-container4-content">
          <div className="learning-eco-system-container4-content-left">
            <h2>Tour the CodeIQGenius Business platform</h2>
            <div>
              Take the interactive tour to see how our platform can transform
              the way your team learns and grows.
            </div>
            <button>Start Tour</button>
          </div>

          <div className="learning-eco-system-container4-content-right">
            <img src={Img3} alt="" />
          </div>
        </div>
      </div>



      <div className="learning-eco-system-container3">
        <h2 className="learning-eco-system-title">
          We’ll help you cultivate a culture of learning
        </h2>


        <div className="learning-eco-system-grid  flex">
          {/* Card 1 */}
          <div className="learning-eco-system-card ">
            <img
              src={featureImg1}
              alt="Boost employee engagement"
              className="learning-eco-system-img1"
            />
            <div>Boost impact with a customer success partner</div>
            <p>
              With the Enterprise Plan, your strategic partner can help you build a roadmap to ensure your learning programs are aligned to your business goals.
            </p>
            {/* button */}
            <div className='rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]' >
              <span>Learn More</span>
            </div>
          </div>

          {/* Card 2 */}

          <div className="learning-eco-system-card ">
            <img
              src={featureImg2}
              alt="Boost employee engagement"
              className="learning-eco-system-img2"
            />
            <div className='mt-[2rem]'> <div>Drive learning with impactful data</div>
              <p>
                Gain actionable insights from analytics and industry benchmarks to help you quickly adjust learning programs to meet changing needs.
              </p></div>
            {/* button */}
            <div className='mt-[3rem] rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]' >
              <span><Link to='/learningecosystemdrivelearning' className='text-brand text-[0.75rem] font-normal'>  Learn More</Link></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TourIqGenius