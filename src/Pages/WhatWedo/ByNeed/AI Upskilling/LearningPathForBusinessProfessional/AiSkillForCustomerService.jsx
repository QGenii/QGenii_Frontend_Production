import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'Use generative AI for real-time customer support',
  'Craft effective AI prompts',
  'Deploy generative AI tools to handle FAQs',
  'Personalize customer interactions',
  'Optimize support efficiency with AI-driven tools',
  'Analyze and select AI tools for customer service'
  
  

];


const AiSkillForCustomerService = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Business Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI Skills for Customer Service Professionals</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>Master the power of AI in customer service with this learning path, equipping you with essential skills to automate responses, personalize interactions, and enhance customer satisfaction through AI-driven tools and strategies.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>Customer Service Professionals</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Develop the skills to use AI tools like ChatGPT to deliver fast, accurate, and empathetic customer support responses.</li>
              <li className='text-[0.875rem] font-normal '>Learn how to craft effective prompts for a wide range of service scenarios, from simple inquiries to complex issue resolution.</li>
              <li className='text-[0.875rem] font-normal '>Explore how AI can streamline and optimize every phase of the product launch process, from ideation to market introduction.</li>
              <li className='text-[0.875rem] font-normal  '>Learn how to automate support workflows using tools to reduce manual work, save time, and streamline operations.</li>
              <li className='text-[0.875rem] font-normal  '>Master personalization strategies using AI to tailor responses, boost customer satisfaction, and drive long-term loyalty.</li>
              <li className='text-[0.875rem] font-normal  '>Learn best practices for using AI ethically in customer service, ensuring transparency, reliability, and trust in automated interactions.</li>

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

export default  AiSkillForCustomerService;
