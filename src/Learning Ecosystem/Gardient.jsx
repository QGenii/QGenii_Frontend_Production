import React from 'react'
import { Link } from 'react-router-dom'
import Img6 from '../assets/LearningEcoSystem/Img6.png';
const Gardient = () => {
  return (
    <>
    <div className="gradient-section mt-[5rem] bg-[lightgray] bg-[position:50%] bg-cover bg-no-repeat shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]" style={{backgroundImage: `url(${Img6}) `}}>
          <div className=" flex flex-col justify-center items-center h-96 ">
            <h2 className=' w-full text-[1rem] text-nowrap'>
              Find out more about what our integrated learning solution can do for your organization
            </h2>
            <button className="learn-more-btn"><Link to='/'>Request a demo today</Link></button>
          </div>
        </div>
    </>
  )
}

export default Gardient