import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'Agentic AI design patterns',
    'Multi-agent system engineering',
    'LLM orchestration and integration',
    'Framework proficiency (OpenAI SDK, Crew AI, LangGraph, AutoGen',
    'Tool and API integration',
    'Persistent memory and state management',
    'Model Context Protocol (MCP) implementation',
    'Autonomous agent deployment',
    'AI system monitoring and visualization',
   
];


const AjenticArchitecture = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>Agentic Architecture</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path provides a starter introduction to designing and engineering agentic AI systems. It covers agentic design patterns, multi-agent collaboration, LLM orchestration, frameworks like OpenAI SDK, Crew AI, LangGraph, and AutoGen, as well as tool integration, asynchronous workflows, persistent memory, and Model Context Protocol (MCP) for advanced tool and data connectivity.</h5>

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
                        <h5 className='text-[0.875rem] font-normal  '>This path is designed for AI engineers, software developers, and technical professionals seeking to master agentic AI architectures. It is ideal for those with foundational programming knowledge who want to build, orchestrate, and deploy advanced AI agents and multi-agent systems in real-world scenarios.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Apply Agentic Design Patterns: Identify and implement core agentic AI design patterns such as Reflection, Tool Use, Planning (ReAct), and Multi-Agent Collaboration using frameworks like Ollama and OpenAI.</li>
                            <li className='text-[0.875rem] font-normal '>Engineer Multi-Agent Systems: Develop, orchestrate, and deploy collaborative AI agents using Crew AI, LangGraph, and AutoGen, integrating multiple LLMs and tools for robust workflows.</li>
                            <li className='text-[0.875rem] font-normal '>Integrate and Orchestrate LLMs: Build workflows that leverage multiple LLM APIs (OpenAI, Anthropic, Gemini, DeepSeek) and frameworks for advanced orchestration, evaluation, and feedback loops.</li>
                            <li className='text-[0.875rem] font-normal  '>Implement Tool and Memory Integration: Connect AI agents to external tools, APIs, persistent memory, and databases using MCP, LangChain, and Gradio for enhanced autonomy and real-world applications..</li>
                            <li className='text-[0.875rem] font-normal  '>Deploy and Monitor Agentic Applications: Create, deploy, and monitor autonomous AI agents and trading systems with error handling, visualization dashboards, and real-world tool integrations.</li>



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

export default AjenticArchitecture;
