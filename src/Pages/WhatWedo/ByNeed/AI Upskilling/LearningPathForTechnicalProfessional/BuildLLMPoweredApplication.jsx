import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'LLM application development',
    'LangChain and LangGraph proficiency',
    'IOpenAI API integration',
    'Retrieval-Augmented Generation (RAG)',
    'Vector database implementation (Chroma, Pinecone)',

    'Prompt engineering',
    'Fine-tuning and LoRA techniques',
    'Model Context Protocol (MCP) integration',
    'On-device AI application development',
    'Agentic workflow orchestration',
    'Cybersecurity risk management in GenAI'


];


const BuildLLMPoweredApplication = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>Build LLM-Powered Applications & Agents for Developers</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path guides developers through building and deploying LLM-powered applications and agents using technologies such as OpenAI API, LangChain, LangGraph, Fine-Tuning, Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), vector databases (Chroma, Pinecone), on-device AI applications, and cybersecurity risk management in GenAI. Learners gain hands-on experience with real-world projects, agentic workflows, prompt engineering, and securing AI systems.</h5>

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
                        <h5 className='text-[0.875rem] font-normal  '>This path is designed for software developers, machine learning engineers, and technical professionals seeking to build, deploy, and secure LLM-powered applications and agents. It is ideal for those with foundational programming skills who want hands-on experience with state-of-the-art GenAI technologies, vector databases, and AI security best practices.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Implement LLM Applications: Build, integrate, and deploy LLM-powered applications using OpenAI API, LangChain, and LangGraph, including hands-on projects like ChatGPT clones and AI agents.</li>
                            <li className='text-[0.875rem] font-normal '>Master Retrieval-Augmented Generation and Vector Databases: Design and optimize RAG workflows, leverage vector databases (Chroma, Pinecone), and enhance information retrieval in AI systems.</li>
                            <li className='text-[0.875rem] font-normal '>Fine-Tune and Customize LLMs: Apply fine-tuning techniques, including LoRA, to adapt LLMs for specific tasks and create tailored AI solutions.</li>
                            <li className='text-[0.875rem] font-normal  '>Develop On-Device and Secure AI Applications: Construct on-device AI applications with modern frameworks, implement robust design patterns, and address cybersecurity risks in generative AI systems.</li>
                            <li className='text-[0.875rem] font-normal  '>Utilize Model Context Protocol and Agentic Workflows: Integrate MCP for tool interoperability, orchestrate agent-to-agent communication, and build scalable, production-ready agentic workflows.</li>



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

export default BuildLLMPoweredApplication;
