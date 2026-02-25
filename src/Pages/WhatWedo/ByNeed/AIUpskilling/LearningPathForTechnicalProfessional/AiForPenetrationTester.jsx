import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'AI-driven penetration testing',
  'Prompt engineering for security',
  'LLM vulnerability assessment',
  'Red teaming generative AI',
  'MITRE ATT&CK/ATLAS mapping',
  'OWASP Top 10 LLM risk mitigation',
  'Phishing and social engineering with AI',
  'Improper output handling',
  'Hands-on lab and CTF challenge proficiency',
  'Tooling with Garak, Promptmap, Agentic Radar, MCP scan'
 
  


  
  

];


const AiForPenetrationTester = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI for Penetration Testers & Ethical Hackers</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path introduces AI-driven penetration testing and ethical hacking, focusing on leveraging ChatGPT and LLMs for cybersecurity. It covers prompt engineering, jailbreaking, phishing, brute-force attacks, LLM-specific penetration testing, MITRE ATT&CK/ATLAS frameworks, OWASP Top 10 LLM vulnerabilities, red teaming, and hands-on labs for exploiting and defending generative AI systems.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for cybersecurity professionals, penetration testers, and ethical hackers seeking to expand their expertise into AI and LLM security. It is also suitable for IT security teams, red teamers, and learners interested in the intersection of generative AI and offensive security.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Apply ChatGPT and LLMs in ethical hacking: Utilize AI tools for vulnerability analysis, prompt engineering, and automating penetration testing tasks.</li>
              <li className='text-[0.875rem] font-normal '>Conduct penetration testing on LLMs: Follow structured methodologies to identify, exploit, and report vulnerabilities unique to generative AI systems.</li>
              <li className='text-[0.875rem] font-normal '>Map and mitigate AI threats using MITRE frameworks: Leverage MITRE ATT&CK and ATLAS to understand, detect, and defend against adversarial AI tactics.</li>
              <li className='text-[0.875rem] font-normal  '>Perform LLM red teaming: Simulate real-world attacks on generative AI, focusing on OWASP Top 10 risks, including prompt injection, data poisoning, and excessive agency.</li>
              <li className='text-[0.875rem] font-normal  '>Utilize specialized tools and labs: Gain hands-on experience with tools like Garak, Promptmap, and MCP scan, and participate in CTF challenges and mock exams to reinforce practical skills.</li>
              

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

export default  AiForPenetrationTester;
