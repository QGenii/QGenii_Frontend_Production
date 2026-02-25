import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'ChatGPT',
  'Microsoft Copilot',
  'NotebookLM',
  'Claude',
  'Perplexity',
  'Midjourney'

];


const AiToolForAllEmployee = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Business Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI Tools for All Employees</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>Empower your workforce with hands-on training in today’s most popular AI tools, including ChatGPT, Copilot, Claude, NotebookLM, Midjourney, and Gemini. This practical introductory learning path is designed to build the confidence and skills of your employees in effectively using large language models.</h5>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>Equip your workforce with a basic understanding of AI and how to responsibly use it to enhance productivity across your business.</h5>
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
            <h5 className='text-[0.875rem] font-normal  '>All employees interested in a deeper dive into AI technologies.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className=''>
              <li className='text-[0.875rem] font-normal  '>Discover and understand AI and machine learning platforms like ChatGPT, Midjourney, DALL-E 2, AutoGPT, Google Bard, and other GenAI models.</li>
              <li className='text-[0.875rem] font-normal '>Learn how to use and optimize large language models for different business needs.</li>
              <li className='text-[0.875rem] font-normal '>Explore creative ways to use AI tools for developing groundbreaking products and solutions.</li>
              <li className='text-[0.875rem] font-normal  '>Explore creative ways to use AI tools for developing groundbreaking products and solutions.</li>

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

export default AiToolForAllEmployee;
