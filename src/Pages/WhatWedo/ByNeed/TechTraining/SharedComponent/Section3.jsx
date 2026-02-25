import React from 'react'
import featureImg4 from "../../../../../assets/assets/WhatWedo/TechTraining/featureImg4.png";

const Section3 = () => {
  return (
    <div className="learning-container">
      {/* Top Box */}
      <div className="learning-box">
        <h2 className="learning-heading">Provide tech training for your entire workforce</h2>

        <div className="learning-content">
          <div className=" flex flex-col gap-[1.875rem] w-[33.875rem]">
            <div className="">
              <h5 className='text-[1.25rem] font-medium'>Increase revenue through innovation</h5>
              <h4 className='text-[.875rem] font-normal'>
                Create an environment where innovation thrives by keeping skills development in sync with technological advancements and emerging trends.
              </h4>

            </div>

            <div className='text-[1.25rem] font-medium'>
              <h5 className='text-[1.25rem] font-medium'>Build, engage, and retain the best talent</h5>
              <h4 className='text-[.875rem] font-normal'>
                Expand opportunities to learn with hands-on training and real-world projects that keep employees motivated to meet their career progression goals.
              </h4>
            </div>

            <div className="text-[1.25rem] font-medium">
              <h5 className='text-[1.25rem] font-medium' >Boost impact with a customer success partner</h5>
              <h4 className='text-[.875rem] font-normal'>
                With the Enterprise Plan, your strategic partner can help you build a roadmap to ensure your learning programs are aligned to your business goals.
              </h4>
            </div>
          </div>

          <div className="learning-image">
            <img src={featureImg4} alt="Learning Illustration" />
          </div>
        </div>
      </div>
    </div>
  )
}



export default Section3