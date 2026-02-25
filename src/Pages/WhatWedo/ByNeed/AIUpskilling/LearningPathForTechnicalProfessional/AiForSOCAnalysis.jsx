import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'AI-driven threat intelligence',
  'Prompt engineering for cybersecurity',
  'Automated incident investigation',
  'SIEM and cloud security integration',
  'Microsoft Security Copilot deployment',
  'Custom AI agent development',
  'Responsible AI and privacy management',

 
  


  
  

];


const AiForSOCAnalysis = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI for SOC Analysts</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path introduces SOC analysts to AI-driven cybersecurity using ChatGPT and Microsoft Security Copilot. It covers AI model selection, advanced prompt engineering, threat intelligence automation, cloud security with Azure, SIEM integration, and Microsoft Copilot’s architecture, plugins, and incident investigation features. Learners gain hands-on experience with AI tools to enhance threat detection, automate incident response, and streamline security operations.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for SOC analysts, cybersecurity professionals, and IT security teams seeking to integrate AI tools into their daily workflows. It is suitable for both entry-level and experienced analysts aiming to automate threat detection, incident response, and security operations using ChatGPT and Microsoft Security Copilot.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Leverage ChatGPT and other AI models to automate and enhance cybersecurity investigations, incident analysis, and threat intelligence for SOC operations.</li>
              <li className='text-[0.875rem] font-normal '>Apply advanced prompt engineering techniques to optimize AI-driven workflows for malware analysis, phishing detection, and vulnerability assessment.</li>
              <li className='text-[0.875rem] font-normal '>Integrate ChatGPT with SIEM solutions and cloud environments like Azure to automate incident response and security event management.</li>
              <li className='text-[0.875rem] font-normal  '>Utilize Microsoft Security Copilot to integrate plugins, and promptbooks, to streamline security operations and threat detection.</li>
              <li className='text-[0.875rem] font-normal  '>Understand responsible AI practices, privacy implications, and shared responsibility models when deploying generative AI in cybersecurity contexts.</li>
              

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

export default  AiForSOCAnalysis;
