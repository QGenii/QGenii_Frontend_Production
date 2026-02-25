import React from 'react'
import Img4 from '../../../../assets/assets/WhatWedo/Enterpriseimage/Img4.png';
import { Link } from 'react-router-dom'

const Section5 = () => {
  return (
    <div>



      <div className="enterprise-wide-container5">
        <div className="enterprise-wide-container5-content">
          <div className="enterprise-wide-container5-content-left">
            <h2>Scale AI fluency across your organization</h2>
            <p>
              Our new AI Packages help employees at all levels understand,
              communicate about, and implement AI solutions with confidence
              and ethical awareness.
            </p>
            <button><Link to='/aicontact'> Contact  Us</Link></button>
          </div>

          <div className="enterprise-wide-container5-content-right">
            <img src={Img4} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section5