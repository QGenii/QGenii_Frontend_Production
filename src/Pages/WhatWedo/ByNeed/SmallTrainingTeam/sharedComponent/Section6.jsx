import React from 'react'
import bgimg1 from "../../../../../assets/assets/SmallTrainingTeam/bgimg1.png";
import { Link } from 'react-router-dom'
const Section6 = () => {
  return (
    <div>


      <div className="gradient-section mt-15  bg-[lightgray] bg-[position:50%] bg-cover bg-no-repeat shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]" style={{ backgroundImage: `url(${bgimg1}) ` }}>
        {/* <div className=' '> */}
        <div className="flex flex-col justify-center items-center h-96  w-full">
          <h2 className=' w-full text-[1rem]  text-center'>
            Start  your team learning with focus, Planning and goal oriented
          </h2>
          <button className="learn-more-btn"><Link to='/requestdemo'>Learn More</Link></button>
        </div>

      </div>
    </div>
  )
}

export default Section6