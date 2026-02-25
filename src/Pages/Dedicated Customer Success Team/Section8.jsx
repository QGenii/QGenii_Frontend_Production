import React from 'react'
import { Link } from 'react-router-dom'
import Img6 from "../../assets/assets/DedicatedCustomerSuccessTeam/Img6.png";
const Gardient = () => {
  return (
    <>
      <div className="gradient-section mt-15  bg-[lightgray] bg-[position:50%] bg-cover bg-no-repeat shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]" style={{ backgroundImage: `url(${Img6}) ` }}>
        {/* <div className=' '> */}
        <div className="flex flex-col justify-center items-center h-96  w-full">
          <h2 className=' w-full text-[1rem]  text-center'>
            Let's unlock the potential in your people
          </h2>
          <button className="learn-more-btn"><Link to='/requestdemo'>Learn More</Link></button>
        </div>

      </div>
      {/* </div> */}
    </>
  )
}

export default Gardient