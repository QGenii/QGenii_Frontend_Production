import React from 'react'
import Img3 from '../../../../assets/assets/WhatWedo/Enterpriseimage/Img3.png';
import Img4 from '../../../../assets/assets/WhatWedo/Enterpriseimage/Img3.jpg';

const Section7 = () => {
  return (
    <div className='mt-[6rem]'>
      <div className="enterprise-wide-container4 mt-6 " style={{ backgroundImage: `url(${Img4})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="enterprise-wide-container4-content">


          <div className="enterprise-wide-container4-content-right">
            <img src={Img3} alt="" />
          </div>

          <div className="enterprise-wide-container4-content-left">
            <h2>Tour the CodeIQGenius Business platform</h2>
            <div>
              Take the interactive tour to see how our platform can transform
              the way your team learns and grows.
            </div>
            <button>Start Tour</button>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Section7