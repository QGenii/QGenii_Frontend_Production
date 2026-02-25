import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'Autonomous AI agent development',
  'Multi-agent system design',
  'Agent memory architectures',
  'Retrieval-augmented generation (RAG) ',
  'Vector database integration',
  'Agentic design patterns',
  'AI integration in applications using Semantic Kernerl SDK',
  'Open-source and cloud AI tool proficiency',
  'Prompt engineering',
  


  
  

];


const AjenticAi = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>Agentic AI</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path introduces the foundations and advanced techniques for building autonomous AI agents. Learners will explore key frameworks such as LangChain, LangGraph, AutoGen, CrewAI, and Semantic Kernel SDK, while mastering agentic design patterns, multi-agent systems, memory architectures, RAG, vector databases, and production deployment. The curriculum emphasizes hands-on projects, real-world use cases, and the integration of open-source and cloud-based AI tools.</h5>
          
        </div>

        {/* section 2 */}
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


          <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

            <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

            {/* Top Tabs */}
            <div className=" flex gap-[2rem] flex-wrap justify-center items-center  w-[71.15rem]  ">
              {tabs.map((tab) => (
                <span
                  key={tab}

                  className="px-[1.5375rem] py-[1.5rem] rounded-full border transition shadow-sm text-[0.75rem] cursor-pointer bg-[lightgray] bg-center bg-cover max-w-[20rem] text-center" style={{ backgroundImage: `url(${bgimg1}) `, }}
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for software engineers, AI developers, data scientists, and technical professionals seeking to build, deploy, and scale autonomous AI agents. It is suitable for those with foundational programming experience who want hands-on exposure to state-of-the-art agentic frameworks and real-world AI solutions.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Develop Autonomous AI Agents: Build, configure, and deploy AI agents using frameworks like LangChain, LangGraph, CrewAI, and Semantic Kernel SDK.</li>
              <li className='text-[0.875rem] font-normal '>Implement Multi-Agent Systems: Design and orchestrate collaborative agent workflows with AutoGen and advanced conversation patterns for real-world applications.</li>
              <li className='text-[0.875rem] font-normal '>Integrate Memory and Retrieval: Equip agents with memory and retrieval-augmented generation (RAG) using vector databases, embeddings, and memory management techniques.</li>
              <li className='text-[0.875rem] font-normal  '>Apply Agentic Design Patterns: Utilize reflection, tool use, planning, and collaboration patterns to architect robust, scalable, and adaptive agentic solutions.</li>
              <li className='text-[0.875rem] font-normal  '>Integrate AI-Driven Plugins in business applications using the Semantic Kernel SDK</li>
              

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

export default  AjenticAi;
