import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'LLMOps deployment and management',
    'Model evaluation and optimization',
    'MLflow proficiency  ',
    'Batching and quantization techniques',
    'Cluster and distributed computing management',
    'Real-time API development for LLMs',
    'LLM production monitoring with WhyLabs and Langkit'









];


const Llmops = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>LLMOps</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path provides a starter introduction to LLMOps, focusing on deploying, managing, and monitoring LLM-powered applications in production. Learners will explore pre-deployment strategies, advanced model management with MLflow, efficient deployment techniques, cost optimization, cluster management, real-time API development, and production monitoring using platforms like WhyLabs and Langkit.</h5>

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
                        <h5 className='text-[0.875rem] font-normal  '>This path is designed for machine learning engineers, data scientists, and DevOps professionals seeking to deploy, manage, and monitor large language models in production. It is also suitable for AI practitioners and technical leads aiming to optimize LLM operations and ensure robust, scalable AI solutions.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Implement Pre-Deployment and Optimization Strategies: Apply evaluation, performance optimization, and best practices to ensure model correctness and efficiency before deployment.</li>
                            <li className='text-[0.875rem] font-normal '>Master Advanced Model Management: Utilize ML-Ops frameworks such as MLflow for model training, inference, and extending model functionality in production environments.</li>
                            <li className='text-[0.875rem] font-normal '>Deploy and Scale LLMs Efficiently: Employ batching, quantization, parallelism, and advanced scaling techniques like LoRa and ZeRO to optimize deployment and resource utilization.</li>
                            <li className='text-[0.875rem] font-normal  '>Manage Large-Scale Deployments: Set up and manage distributed clusters using tools like RabbitMQ and Ray, and enable efficient data access and scaling for LLM applications.</li>
                            <li className='text-[0.875rem] font-normal  '>Monitor and Maintain LLMs in Production: Leverage platforms like WhyLabs and Langkit to monitor, analyze, and ensure the reliability of LLM models in real-world scenarios.</li>



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

export default Llmops;
