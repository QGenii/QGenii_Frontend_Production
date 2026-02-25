import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'AI-powered test planning and case generation',
    'Automation code generation with AI (Selenium, Playwright, Cypress)',
    'Integration of AI assistants (ChatGPT, GitHub Copilot) in testing',
    'Low-code and AI-driven test automation tools',
    'Low-code and AI-driven test automation tools',

    'Machine learning model testing (supervised, unsupervised, reinforcement learning)',
    'LLM and RAG-LLM evaluation using RAGAS and Langchain',
    'API and performance testing with K6 and AI',
    'Responsible AI testing (fairness, transparency, privacy, security)',
    'Prompt engineering for test automation',
    'Test data generation and SQL query automation with AI'


];


const AiForQaSoftware = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>AI for QA/Software Testers</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path empowers QA and software testers to leverage AI for enhanced productivity and robust model testing. Covering generative AI, AI agents, automation tools like Selenium, Playwright, Cypress, GitHub Copilot, K6, and ChatGPT, it also delves into AI model evaluation, RAG-LLM testing, responsible AI, and integration of AI into manual and automated testing workflows.</h5>

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
                        <h5 className='text-[0.875rem] font-normal  '>This path is designed for QA professionals, software testers, and automation engineers seeking to enhance their productivity and skill set with AI-driven tools and methodologies. It is also suitable for those interested in testing AI/ML models and integrating AI into manual and automated testing frameworks. Prior experience in software testing or automation is beneficial but not required.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Apply Generative AI and AI Agents: Utilize AI to automate test planning, case generation, test data creation, and code development for various automation frameworks.</li>
                            <li className='text-[0.875rem] font-normal '>Integrate AI Tools in Test Automation: Seamlessly incorporate tools like GitHub Copilot, ChatGPT, and low-code AI-powered platforms into existing manual and automated testing processes.</li>
                            <li className='text-[0.875rem] font-normal '>Conduct AI Model Testing and Evaluation: Master techniques for testing machine learning models, including supervised, unsupervised, and reinforcement learning, and evaluate LLMs using frameworks like RAGAS and Langchain.</li>
                            <li className='text-[0.875rem] font-normal  '>Implement Responsible and Secure AI Testing: Ensure fairness, transparency, privacy, and security in AI model testing and deployment, adhering to industry best practices.</li>
                            <li className='text-[0.875rem] font-normal  '>Optimize API and Performance Testing with AI: Enhance API and performance testing using ChatGPT with K6, and AI-driven prompt engineering to streamline workflows and improve test coverage.</li>



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

export default AiForQaSoftware;
