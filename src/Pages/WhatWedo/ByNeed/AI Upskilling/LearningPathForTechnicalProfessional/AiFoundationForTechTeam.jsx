import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'Generative AI fundamentals',
  'Prompt engineering',
  'ChatGPT and Google Gemini proficiency',
  'AI security and data protection ',
  'Risk assessment in generative AI',
  'AI ethics and regulatory compliance',
 
  


  
  

];


const AiFoundationForTechTeam = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI Foundations for Tech Teams</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path provides a foundation in generative AI, covering the basics of GenAI, hands-on experience with ChatGPT and Google Gemini, prompt engineering techniques, security and privacy risks, and the ethical considerations of AI. Learners will gain practical skills in using leading AI tools, safeguarding data, understanding AI risks, and applying ethical frameworks to responsible AI development and deployment.</h5>
          
        </div>

        {/* section 2 */}
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


          <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

            <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

            {/* Top Tabs */}
            <div className=" flex gap-[2rem] flex-wrap justify-center   w-[71.15rem]  ">
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for technology teams, business professionals, and individuals seeking foundational knowledge in generative AI and its practical applications. It is ideal for those who want to responsibly leverage AI tools like ChatGPT and Google Gemini, understand associated risks, and ensure ethical and secure AI adoption within their organizations.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Explain the core concepts of artificial intelligence, machine learning, and generative AI, including the distinctions between them and the fundamentals of large language models.</li>
              <li className='text-[0.875rem] font-normal '>Demonstrate proficiency in using ChatGPT and Google Gemini for a variety of tasks, leveraging advanced prompt engineering techniques to optimize outputs.</li>
              <li className='text-[0.875rem] font-normal '>Identify and mitigate security and privacy risks associated with generative AI tools, applying best practices for data protection in real-world scenarios.</li>
              <li className='text-[0.875rem] font-normal  '>Analyze the risks and vulnerabilities inherent in generative AI systems, including data leakage, prompt injection, model bias, and other cybersecurity threats.</li>
              <li className='text-[0.875rem] font-normal  '>Apply ethical principles and regulatory frameworks to the development, deployment, and use of AI, ensuring responsible and fair AI practices in business and individual contexts.</li>
              

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

export default  AiFoundationForTechTeam;
