import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
    'LLM fine-tuning (OpenAI, Hugging Face)',
    'Model compression techniques',
    'Knowledge distillation',
    'Parallel and distributed training (data/model/hybrid/tensor/pipeline parallelism)',
    'GPU architecture and optimization',
    'Domain adaptation and data augmentation',
    'PEFT, LoRA, QLoRA techniques',
    'Model evaluation and benchmarking',
    'Fundamentals for AI and LLMs',
   









];


const LlmPerformance = () => {
    return (
        <div className='w-full h-[295rem]'>
            {/* header */}
            <Header />

            <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
                <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
                {/* section 1 */}
                <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
                    <h4 className='text-[1.5rem] font-medium '>LLM Performance Optimization</h4>
                    <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path explores advanced LLM performance optimization, covering fine-tuning (OpenAI, Hugging Face), model compression (quantization, pruning, distillation), parallelization strategies (data/model/hybrid/tensor/pipeline), and the latest techniques in efficient LLM deployment. Learners gain hands-on experience with tools like PyTorch, DeepSpeed, Megatron-LM, and practical workflows for scalable, accurate, and efficient GenAI model training and inference.</h5>

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
                        <h5 className='text-[0.875rem] font-normal  '>This path is designed for machine learning engineers, data scientists, and AI practitioners seeking to optimize LLM performance for production-scale applications. It is ideal for professionals with foundational knowledge of deep learning and Python who want to deepen their expertise in fine-tuning, compression, and distributed training of GenAI models.</h5>
                    </div>

                    <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
                        <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
                        <div className='list-numbered'>
                            <li className='text-[0.875rem] font-normal  '>Apply Fine-Tuning Techniques: Learn to fine-tune LLMs using OpenAI and Hugging Face Transformers for various NLP and vision tasks, including sentiment analysis, NER, summarization, and custom data adaptation.</li>
                            <li className='text-[0.875rem] font-normal '>Implement Model Compression: Master quantization, pruning, and knowledge distillation to reduce model size and improve inference speed while maintaining accuracy.</li>
                            <li className='text-[0.875rem] font-normal '>Leverage Parallelization Strategies: Understand and apply data, model, hybrid, pipeline, and tensor parallelism to train and deploy LLMs efficiently on multi-GPU and distributed systems</li>
                            <li className='text-[0.875rem] font-normal  '>Utilize Advanced Optimization Methods: Explore domain adaptation, data augmentation, PEFT, LoRA, QLoRA, and the latest fine-tuning updates to further enhance LLM performance and scalability.</li>
                            <li className='text-[0.875rem] font-normal  '>Benchmark and Evaluate Optimized Models: Develop skills in evaluating, benchmarking, and comparing base versus optimized models to ensure robust, scalable, and accurate GenAI solutions.</li>



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

export default LlmPerformance;
