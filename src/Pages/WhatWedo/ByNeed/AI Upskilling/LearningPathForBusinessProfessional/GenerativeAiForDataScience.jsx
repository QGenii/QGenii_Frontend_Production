import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'Prompt engineering with ChatGPT',
    'Data wrangling and EDA automation',
    'Machine learning and deep learning with Python',
    'LLM application development',
    'Fine-tuning and quantization of LLMs',
    'Hugging Face model deployment',
    'Retrieval-Augmented Generation (RAG)',
    'Vector embeddings and vector databases',
    'Multi-agent AI system design',
    'AI and data ethics'


];


const GenerativeAiForDataScience = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>Generative AI for Data Science</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path equips data scientists with practical skills in leveraging ChatGPT for data analysis, machine learning, and advanced data wrangling. It covers foundational and advanced concepts in generative AI, deep learning, LLM-powered application development, fine-tuning with Hugging Face, RAG, vector embeddings, multi-agent systems, and ethical considerations in AI and data science.</h5>

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
                        <h5 className='text-[0.875rem] font-normal  '>This path is designed for data scientists, machine learning engineers, and analytics professionals seeking to integrate generative AI and LLMs into their workflows. It is also suitable for Python developers and technical practitioners interested in building, fine-tuning, and deploying advanced AI solutions with a strong ethical foundation.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Apply ChatGPT and generative AI tools to accelerate data exploration, cleaning, feature engineering, and machine learning workflows in Python.</li>
                            <li className='text-[0.875rem] font-normal '>Develop, fine-tune, and deploy LLM-powered applications using frameworks such as Hugging Face, LangChain, and OpenAI APIs.</li>
                            <li className='text-[0.875rem] font-normal '>Master advanced techniques in deep learning, including neural networks, transformers, and multimodal LLMs for diverse data science tasks.</li>
                            <li className='text-[0.875rem] font-normal  '>Implement Retrieval-Augmented Generation (RAG) systems and utilize vector embeddings and databases to enhance LLM application performance.</li>
                            <li className='text-[0.875rem] font-normal  '>Evaluate and address ethical challenges in data science and AI, including data stewardship, algorithmic bias, and responsible use of generative models.</li>



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

export default GenerativeAiForDataScience;
