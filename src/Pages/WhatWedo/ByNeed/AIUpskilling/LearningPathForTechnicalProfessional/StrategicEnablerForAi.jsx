import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'GenAI use case identification and prioritization',
  'AI-driven business decision-making',
  'Data governance and compliance   ',
  'AI security and risk management',
  'Responsible and ethical AI practices',
  'Hallucination detection and mitigation',
  'Prompt engineering and fine-tuning',
  'Regulatory and policy awareness',
  'Transparency and explainability in AI',
  
 
  


  
  

];


const StrategicEnablerForAi = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>Strategic Enablers for AI</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path equips tech leaders with foundational capabilities for successful GenAI adoption, focusing on strategic business use cases, data governance, risk management, responsible AI practices, and hallucination management. Learners explore AI-driven decision-making, project lifecycle phases, security and privacy challenges, ethical considerations, regulatory frameworks, and practical techniques for minimizing model hallucinations and bias.</h5>
          
        </div>

        {/* section 2 */}
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


          <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

            <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

            {/* Top Tabs */}
            <div className=" flex gap-[1.5rem] flex-wrap justify-center items-center  w-[71.15rem]  ">
              {tabs.map((tab) => (
                <span
                  key={tab}

                  className="px-[1.5375rem] py-[1.5rem] rounded-full border transition shadow-sm text-[0.75rem] cursor-pointer bg-[lightgray] bg-center bg-cover max-w-[17rem] text-center" style={{ backgroundImage: `url(${bgimg1}) `, }}
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for technology leaders, business decision-makers, and professionals responsible for driving AI strategy and governance within their organizations. It is ideal for those seeking to understand the enablers, risks, and ethical considerations of GenAI adoption, as well as practical approaches to responsible and secure AI deployment.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Identify and prioritize GenAI use cases aligned with business objectives and evaluate their impact on organizational strategy.</li>
              <li className='text-[0.875rem] font-normal '>Apply best practices in data governance, security, and privacy to ensure compliant and robust GenAI implementations.</li>
              <li className='text-[0.875rem] font-normal '>Assess and mitigate risks associated with generative AI, including data leakage, prompt injection, model bias, and hallucinations.</li>
              <li className='text-[0.875rem] font-normal  '>Implement responsible AI principles by integrating ethical frameworks, transparency, explainability, and regulatory compliance into AI projects.</li>
              <li className='text-[0.875rem] font-normal  '>Develop and deploy strategies for managing and reducing hallucinations in generative models using prompt engineering, RAG, and fine-tuning techniques.</li>
              

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

export default  StrategicEnablerForAi;
