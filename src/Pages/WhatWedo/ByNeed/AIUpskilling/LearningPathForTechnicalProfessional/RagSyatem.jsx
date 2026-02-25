import React from 'react'
import Header from '../../../../../Components/Header'
import bgimg1 from '../../../../../assets/assets/WhatWedo/AiToolForEmployee/bgimg1.jpg'
import { Link } from 'react-router-dom';


const tabs = [
  'RAG system design and optimization',
  'Advanced retrieval techniques (query expansion, re-ranking, DPR)',
  'RAG application development using LlamaIndex and JavaScript',
  'Unstructured data preprocessing and chunking',
  'Vector database management',
  'Knowledge graph construction and querying (Neo4j)',
  'Multimodal RAG application development',
  'Full-stack chatbot and AI application deployment',
  
  


  
  

];


const AjenticAi = () => {
  return (
    <div className='w-full h-[295rem]'>
      {/* header */}
      <Header />

      <div className=' w-[71.63rem] mx-auto flex flex-col justify-start mt-[3rem]'>
        <h4 className='text-2xl font-medium text-center text-gray-500'>Learning Paths for Technical Professionals</h4>
        {/* section 1 */}
        <div className='  flex flex-col justify-center   gap-2 mt-[3rem]'>
          <h4 className='text-[1.5rem] font-medium '>RAG System Mastery</h4>
          <h5 className='text-[0.875rem] font-normal  w-[61rem] '>This starter learning path explores Retrieval-Augmented Generation (RAG) systems, covering naive and advanced RAG techniques, LlamaIndex integration with JavaScript, unstructured data preprocessing, knowledge graph-enhanced RAG, and multimodal RAG applications. Learners gain hands-on experience with vector databases, dense passage retrieval, cross-encoder re-ranking, knowledge graph construction using Neo4j, and building production-ready RAG applications with modern frameworks.</h5>
          
        </div>

        {/* section 2 */}
        <div className="w-full flex flex-col items-center justify-between gap-[1.88rem]  mt-[3rem]  ">


          <div className="w-[69.25rem] flex flex-col items-center gap-[1.25rem] ">

            <h4 className="text-[1.875rem] font-semibold text-center  ">Skills</h4>

            {/* Top Tabs */}
            <div className=" flex gap-[2rem] flex-wrap justify-center  items-center w-[71.15rem]  ">
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
            <h5 className='text-[0.875rem] font-normal  '>This path is designed for AI engineers, data scientists, software developers, and technical professionals seeking to master RAG systems for real-world applications. It is suitable for those with foundational programming experience who want to build, optimize, and deploy advanced retrieval-augmented AI solutions using state-of-the-art tools and frameworks.</h5>
          </div>

          <div className='w-[50.871rem]  flex flex-col  gap-2 mt-[3rem]'>
            <h4 className='text-[1rem] font-medium '>Learning objectives:</h4>
            <div className='list-numbered'>
              <li className='text-[0.875rem] font-normal  '>Explain the principles and architecture of Retrieval-Augmented Generation (RAG), distinguishing between naive and advanced RAG techniques.</li>
              <li className='text-[0.875rem] font-normal '>Implement advanced RAG methods such as query expansion, cross-encoder re-ranking, and dense passage retrieval to improve information retrieval and answer generation.</li>
              <li className='text-[0.875rem] font-normal '>Build and deploy RAG applications using LlamaIndex and JavaScript, including full-stack chatbot development and integration with vector databases.</li>
              <li className='text-[0.875rem] font-normal  '>Preprocess and structure unstructured data (PDFs, HTML, PPTX, images) for RAG and LLM applications using specialized frameworks and chunking strategies.</li>
              <li className='text-[0.875rem] font-normal  '>Integrate knowledge graphs and multimodal data into RAG systems, leveraging tools like Neo4j and GPT-4 to enable complex, context-aware retrieval and recommendation workflows.</li>
              

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

export default  AjenticAi;
