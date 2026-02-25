


import React from 'react'
import Img1 from "../../../../../assets/assets/WhatWedo/RemoteAndHybrid/Img1.png";
import Img2 from "../../../../../assets/assets/WhatWedo/RemoteAndHybrid/Img2.jpg";
import Img3 from "../../../../../assets/assets/WhatWedo/RemoteAndHybrid/Img3.png";
import { Link } from 'react-router-dom';

const Section2 = () => {
  return (
    <div className="enterprise-wide-container3">
      <h2 className="enterprise-wide-title">
        Upskill everyone — from anywhere
      </h2>
      <p className="enterprise-wide-subtitle">
        With our extensive collection of on-demand courses, hands-on training for tech teams, and interactive cohort programs for leaders, we’ve got you covered.
      </p>

      <div className="enterprise-wide-grid">
        {/* Card 1 */}
        <div className="enterprise-wide-card">
          <img
            src={Img1}
            alt="Boost employee engagement"
            className="enterprise-wide-img1"
          />
          <div>Unlimited learning, on-demand</div>
          <p>
            Rapid change means evolving skills requirements. Give employees 24/7 access to learn what they need, so they can keep up and keep growing.
          </p>
          {/* button */}
          <div className='rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]' >
            <Link to='/enterprisewide'>
              {/* view courses open */}
              <span className='cursor-pointer'>Learn More</span></Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="enterprise-wide-card2">
          <img
            src={Img2}
            alt="Support growth with on-demand courses"
            className="enterprise-wide-img2"
          />
          <div>Build a culture of learning</div>
          <p>
            Help your employees successfully navigate the new world of work and boost skill development across your organization.
          </p>
          {/*   on demand course page open */}

          <button> <Link to='/ondemandcourse' >Learn More</Link> </button>
        </div>

        {/* Card 3 */}
        <div className="enterprise-wide-card3">
          <img
            src={Img3}
            alt="Build next-level programs"
            className="enterprise-wide-img3"
          />
          <div>Lead through change</div>
          <p>
            Scale leadership development with live remote team learning experiences that drive positive business results.
          </p>


          {/* button */}
          <div className='rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]' >
            <Link to='/cohortlearning'>
              {/* dedicated customer success team page open */}
              <span className='cursor-pointer'>Learn More</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section2