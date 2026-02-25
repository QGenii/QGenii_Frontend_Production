import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'AI-powered data analysis',
  'Excel automation with ChatGPT',
  'Advanced formula and macro generation    ',
  'Data cleaning and transformation',
  'Exploratory and predictive analytics',
  'SQL query generation and debugging',
  'Data visualization with generative AI',
  'Natural language processing for insights',
  'Natural language processing for insights',
  'Data privacy and security best practices'
 
  


  
  

];


const DataAnalysisWithChatGpt = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>Data Analysis with ChatGPT</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path teaches how to leverage ChatGPT for data analysis and visualization, focusing on Excel integration, advanced formula generation, data cleaning, exploratory and predictive analytics, SQL query creation, and security best practices. Learners will explore generative AI tools, automate workflows, and gain practical experience in transforming, analyzing, and visualizing data using ChatGPT while understanding privacy and data protection considerations.</h5>
          
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for data analysts, business and IT professionals, and Excel users seeking to enhance their data analysis and visualization skills with AI-powered tools. It is also suitable for those interested in automating data workflows, generating insights from complex datasets, and understanding the security implications of using ChatGPT in business environments.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Utilize ChatGPT to automate and enhance data analysis and visualization tasks in Microsoft Excel, including formula generation, data cleaning, and transformation.</li>
              <li className='text-[0.875rem] font-normal '>Apply generative AI techniques for exploratory, predictive, and sentiment analysis across diverse datasets using ChatGPT.</li>
              <li className='text-[0.875rem] font-normal '>Generate, debug, and optimize SQL queries and Excel VBA macros with ChatGPT to streamline data workflows.</li>
              <li className='text-[0.875rem] font-normal  '>Integrate ChatGPT with various data platforms and understand its capabilities and limitations in supervised, unsupervised, and NLP-driven analytics.</li>
              <li className='text-[0.875rem] font-normal  '>Implement best practices for data privacy and security when using ChatGPT, including risk mitigation and safe data handling procedures.</li>
              

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

export default  DataAnalysisWithChatGpt;
