import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'AI risk assessment and mitigation',
  'NIST AI RMF implementation',
  'AI-driven threat detection',
  'Malware and anomaly detection using ML',
  'Social engineering defense with GenAI',
  'Threat modeling for GenAI',
  'Secure deployment of AI systems',
  'Regulatory compliance for AI security',
  'Hands-on experience with Microsoft Security Copilot and Defender for Cloud'
 
  


  
  

];


const AiForCyberSecurity = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI for Cybersecurity Professionals</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path equips cybersecurity professionals with foundational and advanced knowledge to leverage generative AI for security, covering GenAI risks, NIST AI Risk Management Framework, AI-driven threat detection, social engineering, malware detection, and secure deployment practices. Learners gain hands-on experience with tools like ChatGPT, Microsoft Security Copilot, and Defender for Cloud, while exploring AI vulnerabilities, threat modeling, and regulatory compliance.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for cybersecurity professionals, SOC analysts, and IT security managers seeking to integrate generative AI into their security operations. It is also suitable for technical leaders and compliance officers aiming to understand AI risks and mitigation strategies within enterprise environments.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Identify and assess cybersecurity risks associated with generative AI, including data poisoning, prompt injection, and model bias.</li>
              <li className='text-[0.875rem] font-normal '>Apply the NIST AI Risk Management Framework to implement trustworthy and secure AI systems in organizational environments.</li>
              <li className='text-[0.875rem] font-normal '>Utilize AI and machine learning techniques for network anomaly detection, malware identification, and social engineering defense.</li>
              <li className='text-[0.875rem] font-normal  '>Deploy and manage AI-powered security tools such as Microsoft Security Copilot and Defender for Cloud to enhance threat detection and response.</li>
              <li className='text-[0.875rem] font-normal  '>Develop and implement threat modeling strategies for GenAI applications, ensuring compliance with regulatory and ethical standards.</li>
              

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

export default  AiForCyberSecurity;
