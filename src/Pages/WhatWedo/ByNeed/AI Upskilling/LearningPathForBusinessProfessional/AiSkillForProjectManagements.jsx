import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'Project planning',
  'Document and report creation',
  'Communication & meeting management',
  'Problem-solving & creative thinking',
  'Project analysis & Data-driven decision making',
  'Risk management',
  
  

];


const AiSkillForProjectManagement = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Business Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI Skills for Project Management Professionals</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>Unlock the potential of generative AI in project management with this comprehensive learning path, designed to enhance efficiency, decision-making, and innovation. Through practical applications and expert insights, you’ll learn how to integrate AI tools into your workflow, streamline processes, and achieve superior project outcomes.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>Project Management Professionals</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className=''>
              <li className='text-[0.875rem] font-normal  '>Master generative AI to create detailed and dynamic project plans that adapt to evolving needs and goals.</li>
              <li className='text-[0.875rem] font-normal '>Learn how generative AI can streamline the creation of comprehensive documents and reports, saving time and ensuring accuracy.</li>
              <li className='text-[0.875rem] font-normal '>Learn how to enhance meetings and streamline communication using generative AI tools for better collaboration and efficiency.</li>
              <li className='text-[0.875rem] font-normal  '>Enhance your problem-solving and brainstorming sessions with AI-driven insights and creative solutions.</li>
              <li className='text-[0.875rem] font-normal  '>Utilize generative AI tools to analyze project data, measure performance, and make data-driven decisions.</li>
              <li className='text-[0.875rem] font-normal  '>Discover how AI can identify, assess, and mitigate risks to keep your projects on track.</li>
              <li className='text-[0.875rem] font-normal  '>See how AI can assist in crafting detailed and user-focused stories to guide project development and ensure user satisfaction.</li>
              <li className='text-[0.875rem] font-normal  '>Use AI to manage and maintain a robust knowledge base, ensuring easy access to critical information.</li>
              <li className='text-[0.875rem] font-normal  '>Explore emerging trends and future possibilities of AI in transforming project management practices.</li>

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

export default  AiSkillForProjectManagement;
