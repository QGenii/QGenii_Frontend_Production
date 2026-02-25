import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'Audience research and analysis',
  'Data-driven content creation',
  'SEO mastery',
  'Strategic marketing campaigns',
  'Lead generation and conversion',
  'Video creation and editing',
  'Market research and data analysis'
  

];


const AiSkillForMarketing = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Business Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI Skills for Marketing Professionals</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This learning path is designed for marketing professionals to harness AI for audience targeting, data-driven content creation, SEO mastery, AI-powered market research, and more.</h5>
          
        </div>

        {/* section 2 */}
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


          <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

            <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

            {/* Top Tabs */}
            <div className=" flex gap-6 flex-wrap justify-center   w-[69.25rem]  ">
              {tabs.map((tab) => (
                <span
                  key={tab}

                  className="px-[1.5375rem] py-[1.5rem] rounded-full border transition shadow-sm text-[0.873rem] cursor-pointer bg-[lightgray] bg-center bg-cover " style={{ backgroundImage: `url(${bgimg}) `, }}
                >
                  {tab}
                </span>
              ))}
            </div>

          </div>







        </div>

        {/* section 3 */}
        <div >
          <div className='w-[71.871rem]  flex flex-col justify-center item-start  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Target audience:</h4>
            <h5 className='text-[0.875rem] font-normal  '>This learning path is designed for marketing professionals who want to explore AI in marketing, upskill, and stay updated with the latest AI advancements in the field.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className=''>
              <li className='text-[0.875rem] font-normal  '>Use AI-powered audience research to understand your ideal customers and attract the right audience.</li>
              <li className='text-[0.875rem] font-normal '>Enhance content marketing strategies, including writing blog posts and emails that are optimized for SEO.</li>
              <li className='text-[0.875rem] font-normal '>Learn how to attract more leads and optimize lead nurturing and conversion.</li>
              <li className='text-[0.875rem] font-normal  '>Apply AI-powered video creation techniques.</li>
              <li className='text-[0.875rem] font-normal  '>Understand how to use AI to conduct market research to find deeper insights, predict trends, outsmart competition, and make data-driven decisions.</li>

            </div>
          </div>


        </div>
        


      </div>
      {/* section 4 */}
        <div className=" mt-[8rem]  bg-[lightgray] bg-gradient-to-r from-[#1E1E1E] to-[#000080]">
          {/* <div className=' '> */}
          <div className="flex flex-col justify-center items-center h-[19rem] gap-[2.5rem] w-full">
            <h2 className=' w-full text-[2rem]  text-center text-white'>
              Make AI your ally with an AI Starter Path
            </h2>
            <button className="learn-more-btn"><Link to='/requestdemo'>Contact now</Link></button>
          </div>

        </div>

    </div>
  )
}

export default  AiSkillForMarketing;
