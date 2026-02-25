import React from 'react'
import featureImg1 from "../../../../../assets/assets/WhatWedo/TechTraining/featureImg1.png";
import featureImg2 from "../../../../../assets/assets/WhatWedo/TechTraining/featureImg2.jpg";
import featureImg3 from "../../../../../assets/assets/WhatWedo/TechTraining/featureImg3.png";
import { Link } from 'react-router-dom';

const Section2 = () => {
  return (
    <div className="enterprise-wide-container3">
      <h2 className="enterprise-wide-title">
        Empower your tech teams to compete, innovate, and lead
      </h2>
      <p className="enterprise-wide-subtitle">
        Choose the best way to learn for your organization.
      </p>

      <div className="enterprise-wide-grid">
        {/* Card 1 */}
        <div className="enterprise-wide-card">
          <img
            src={featureImg1}
            alt="Boost employee engagement"
            className="enterprise-wide-img1"
          />
          <div>Stay competitive with on-demand courses</div>
          <p>
            Keep tech talent skilled up with 24/7 access to the best of our marketplace courses. We’re often the first to market with the latest tech courses on new programs, certification prep, and more. And, with our extensive course collection, they can also brush up on power skills such as leadership and collaboration.
          </p>

          {/* button */}
          <div className='rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]'>

            {/*view courses open */}
            <span><Link to='/enterprisewide' className='text-brand'>  Learn More</Link></span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="enterprise-wide-card2">
          <img
            src={featureImg2}
            alt="Support growth with on-demand courses"
            className="enterprise-wide-img2"
          />
          <div>Drive innovation with hands-on tech training</div>
          <p>
            Support rapid technical skills development and certification prep with pre-built CodeIQGenius paths, assessments for targeted learning recommendations, labs with projects based on real-world scenarios, and workspaces that offer a virtual technical environment for risk-free practice.
          </p>
          {/*   on demand course page open */}

          <button> <Link to='/ondemandcourse' >Learn More</Link> </button>
        </div>

        {/* Card 3 */}
        <div className="enterprise-wide-card3">
          <img
            src={featureImg3}
            alt="Build next-level programs"
            className="enterprise-wide-img3"
          />
          <div>Lead high-performing technical teams</div>
          <p>
            Develop strong technical leaders who inspire teams, influence cultural change, and impact business results. Our dynamic cohort learning programs offer a mix of self-paced activities, collaborative discussion forums, and expert-led live online events.
          </p>

          {/* button */}
          <div className='rounded-[0.23438rem] border border-brand bg-white shadow-[ -0.75px_3px_9px_0_rgba(12,49,110,0.10)] flex justify-center items-center gap-[0.46875rem] px-[4.75rem] py-[0.625rem]'>

            {/* dedicated customer success team page open */}
            <span><Link to='/cohortlearning' className='text-brand'>  Learn More</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section2