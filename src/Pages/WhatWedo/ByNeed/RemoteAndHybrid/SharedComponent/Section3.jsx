import React from 'react'
import Img4 from "../../../../../assets/assets/WhatWedo/RemoteAndHybrid/Img4.png";

const Section3 = () => {
  return (
     <div className="learning-container">
              {/* Top Box */}
              <div className="learning-box">
                <h2 className="learning-heading">Deliver continuous learning</h2>
    
                <div className="learning-content">
                  <div className=" flex flex-col gap-[1.875rem] w-[33.875rem]">
                    <div className="">
                      <h5 className='text-[1.25rem] font-medium'>Help employees stay current and ready to innovate</h5>
                      <h4 className='text-[.875rem] font-normal'>
               Offer access to comprehensive courses taught by real-world experts. We’re often the first to the market on in-demand topics, making it easier for your teams to be competitively skilled.
                      </h4>

                    </div>
    
    <div className='text-[1.25rem] font-medium'>
                    <h5 className='text-[1.25rem] font-medium'>A new learning culture for everyone</h5>
                    <h4 className='text-[.875rem] font-normal'>
                   Give them anytime access to our diverse and extensive course collection and transform learning from single-event training to continuous development.
                    </h4>
                    </div>

                    <div className="text-[1.25rem] font-medium">
                      <h5 className='text-[1.25rem] font-medium' >Save time and move faster</h5>
                      <h4 className='text-[.875rem] font-normal'>
                    Onboard, develop, and retain talent by delivering the skills-based learning they want, when they need it.
                      </h4>
                    </div>
                  </div>
    
                  <div className="learning-image">
                    <img src={Img4} alt="Learning Illustration" />
                  </div>
                </div>
              </div>
            </div>
  )
}



export default Section3