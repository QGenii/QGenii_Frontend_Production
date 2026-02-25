import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'GitHub Copilot',
    'Building & fine-tuning LLM applications',
    'Generative AI on the cloud   ',
    'Security risks & mitigation',









];


const AiSkillForSoftware = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>AI Skills for Software Engineers</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This learning path shows how Software Engineers can use GitHub Copilot to increase their productivity; build LLM-powered applications, including using custom data and fine-tuning models; and understand how to secure Generative AI Systems.</h5>

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

                                    className="px-[1.5375rem] py-[1.5rem] rounded-full border transition shadow-sm text-[0.75rem] cursor-pointer bg-[lightgray] bg-center bg-cover max-w-[18rem] text-center" style={{ backgroundImage: `url(${bgimg1}) `, }}
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
                        <h5 className='text-[0.875rem] font-normal  '>Software Developers, Software Engineers</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Improve developer productivity by using GitHub Copilot.</li>
                            <li className='text-[0.875rem] font-normal '>Build LLM-powered applications using ChatGPT, OpenAPI, LangChain, and LLaMA, as well as cloud-based GenAI services..</li>
                            <li className='text-[0.875rem] font-normal '>Fine-tune models and use custom training data.</li>
                            <li className='text-[0.875rem] font-normal  '>Understand how to secure Generative AI Systems.</li>



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

export default AiSkillForSoftware;
