import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'AI Literacy & AI Basics',
  'Ethics for AI',
  'Prompt Engineering Basics',
  'Business Applications',
  
  
  

];


const AiIntroductionForAllEmployee = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Business Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI Introduction for All Employees</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>Equip your workforce with essential AI skills that increase productivity through this practice course covering AI fundamentals, prompt engineering, and ethics. Your employees will learn to confidently use AI tools to solve problems and streamline tasks across all departments, regardless of their technical background.</h5>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>Equip your workforce with a basic understanding of AI and how to responsibly use it to enhance productivity across your business.</h5>
          
        </div>

        {/* section 2 */}
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


          <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

            <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

            {/* Top Tabs */}
            <div className=" flex gap-[1.5rem] flex-wrap justify-center   w-[74.25rem]  ">
              {tabs.map((tab) => (
                <span
                  key={tab}

                  className="px-[1.5375rem] py-[1.5rem] rounded-full border transition shadow-sm text-[0.75rem] cursor-pointer bg-[lightgray] bg-center bg-cover " style={{ backgroundImage: `url(${bgimg}) `, }}
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
            <h5 className='text-[0.875rem] font-normal  '>Organizations who want to develop a common understanding of AI across all employees. This includes individuals from different departments who will be using or interacting with AI in their daily work. The ideal learners are curious, eager to learn, and interested in maximizing the benefits of AI while aligning their understanding and expectations.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Gain an understanding of the foundational concepts and principles of AI.</li>
              <li className='text-[0.875rem] font-normal '>Develop proficiency in prompt engineering, enabling learners to effectively communicate with AI models and enhance productivity.</li>
              <li className='text-[0.875rem] font-normal '>Explore practical applications of AI tools, equipping learners with actionable insights to integrate AI into their daily operations.</li>
              <li className='text-[0.875rem] font-normal  '>Understand the ethical and responsible use of AI within the organization.</li>
             

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

export default  AiIntroductionForAllEmployee;
