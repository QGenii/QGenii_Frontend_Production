import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'MidJourney',
  'Canva',
  'Adobe Firefly',
  'Photoshop',
  

];


const AiSkillForDesign = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Business Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI Skills for Design & Creative Professionals</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This learning path equips designers with the skills to harness AI tools like Canva, Adobe Firefly, and MidJourney, transforming creative workflows and unlocking innovative design possibilities.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>Design and creative professionals seeking to leverage AI tools to enhance and revolutionize their creative workflows.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className=''>
              <li className='text-[0.875rem] font-normal  '>Learn to use MidJourney's AI capabilities to generate imaginative and unique designs, pushing the boundaries of creativity in visual arts.</li>
              <li className='text-[0.875rem] font-normal '>Explore how Canva's AI-driven features can streamline your design process and enable you to create stunning visuals quickly and effortlessly.</li>
              <li className='text-[0.875rem] font-normal '>Discover how Adobe Firefly leverages AI to transform your design process, allowing for rapid ideation and sophisticated visual experimentation.</li>
              <li className='text-[0.875rem] font-normal  '>Master the integration of AI in Photoshop to enhance image editing, automate tasks, and elevate your creative projects with cutting-edge tools.</li>

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

export default AiSkillForDesign;
