import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'Agentic AI system design',
    'LLM application development',
    'Multi-agent orchestration',
    'RAG pipeline implementation',
    'Vector database integration',

    'LLM fine-tuning (LoRA/QLoRA)',
    'Open-source AI tool proficiency (Hugging Face, LangChain)',
    'Multimodal AI integration',
    'Production AI deployment',
    'Structured output engineering',
    'Persistent AI memory management',
    'Advanced prompt engineering'


];


const AiEngineering = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>AI Engineering</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path covers Agentic AI and LLM Engineering, including autonomous agent frameworks (OpenAI SDK, Crew AI, LangGraph, AutoGen), multi-agent orchestration, LLM application development, RAG pipelines, fine-tuning with LoRA/QLoRA, vector databases, multimodal AI, and advanced deployment strategies. Learners gain hands-on experience with leading models (GPT-4, Claude, Gemini, LLAMA), open-source tools (Hugging Face, LangChain), and real-world AI system integration.</h5>

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
                        <h5 className='text-[0.875rem] font-normal  '>This path is ideal for software engineers, data scientists, and AI practitioners seeking to master agentic AI, LLM engineering, and advanced AI system deployment. It is also suitable for technical professionals aiming to build, fine-tune, and deploy state-of-the-art AI solutions in business or research settings.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Design and implement autonomous AI agents using frameworks such as OpenAI SDK, Crew AI, LangGraph, and AutoGen for real-world applications.</li>
                            <li className='text-[0.875rem] font-normal '>Develop, evaluate, and deploy LLM-powered applications, including chatbots, RAG systems, and multimodal assistants, leveraging both proprietary and open-source models.</li>
                            <li className='text-[0.875rem] font-normal '>Master retrieval-augmented generation (RAG) pipelines, vector embeddings, and vector database integration to enhance LLM performance and knowledge retrieval.</li>
                            <li className='text-[0.875rem] font-normal  '>Fine-tune large language models using parameter-efficient techniques like LoRA and QLoRA, and optimize model performance for specific business tasks.</li>
                            <li className='text-[0.875rem] font-normal  '>Build, orchestrate, and deploy multi-agent systems with advanced workflows, persistent memory, structured outputs, and robust UI integrations for production environments</li>



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

export default AiEngineering;
