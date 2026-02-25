import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'Generative AI model development',
  'Prompt engineering',
  'Embeddings and vector representations',
  'Multimodal AI processing',
  'Batch data processing with GCP',
  'Vertex AI and AutoML proficiency',
  'Google Cloud API integration (Vision, Language, Speech)',
  'Responsible AI implementation'
 
  


  
  

];


const AiOnGoogleCloud = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>AI on Google Cloud: LLMs and Foundational Models</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path provides a starter introduction to generative AI on Google Cloud, focusing on Google Gemini and Vertex AI. Learners explore foundational concepts, prompt engineering, embeddings, multimodal processing, and hands-on implementation using Google Cloud services such as Vertex AI, AutoML, and various Google APIs for vision, language, and speech. The path emphasizes responsible AI practices and practical deployment of generative AI solutions.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for developers, data scientists, and technology professionals seeking to build generative AI solutions on Google Cloud. It is suitable for those new to Google Gemini, Vertex AI, or generative AI in general, as well as practitioners looking to deepen their hands-on skills with Google Cloud’s AI ecosystem.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Understand Generative AI Fundamentals: Grasp the core principles of generative AI, including the distinctions between AI, ML, and generative AI, and the data requirements for building effective models.</li>
              <li className='text-[0.875rem] font-normal '>Develop and Deploy with Google Gemini and Vertex AI: Gain hands-on experience in building, tuning, and deploying generative AI models using Google Gemini, Vertex AI, and related Google Cloud services.</li>
              <li className='text-[0.875rem] font-normal '>Apply Prompt Engineering and Embeddings: Master prompt design techniques, and utilize embeddings for advanced AI tasks.</li>
              <li className='text-[0.875rem] font-normal  '>Implement Multimodal and Batch Processing: Explore multimodal AI capabilities such as image, video, and document processing, and perform batch data processing using Google Cloud Storage and BigQuery.</li>
              <li className='text-[0.875rem] font-normal  '>Utilize Responsible AI and Best Practices: Learn Google’s AI principles, responsible AI practices, and cloud resource management to ensure ethical and efficient AI development.</li>
              

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

export default  AiOnGoogleCloud;
