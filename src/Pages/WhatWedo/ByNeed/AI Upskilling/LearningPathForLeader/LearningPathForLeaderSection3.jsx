import React from 'react'
import { Link } from 'react-router-dom'

const LearningPathForLeaderSection3 = () => {
  return (
    <>
    <div className=" mt-[3rem]  bg-[lightgray] bg-gradient-to-r from-[#1E1E1E] to-[#000080]">
        {/* <div className=' '> */}
          <div className="flex flex-col justify-center items-center h-[19rem] gap-[2.5rem] w-full">
            <h2 className=' w-full text-[2rem]  text-center text-white'>
            Make AI your ally with an AI Starter Path
            </h2>
            <button className="learn-more-btn"><Link to='/requestdemo'>Contact now</Link></button>
          </div>

          </div>
        {/* </div> */}
    </>
  )
}

export default LearningPathForLeaderSection3