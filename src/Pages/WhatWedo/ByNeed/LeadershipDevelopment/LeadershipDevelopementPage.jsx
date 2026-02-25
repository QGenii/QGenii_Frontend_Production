import React from 'react'
import Header from '../../../../Components/Header'
import Section1 from './sharedComponent/Section1'
import Section2 from './sharedComponent/Section2'

const LeadershipDevelopementPage = () => {
  return (
    <div className='h-[336.75rem] w-full bg-white'>
        <Header/>

        {/* section 1 */}
        <Section1/>

  {/* testimonials */}

        <div className="enterprise-wide-container2 ">
          <div className="enterprise-wide-container2-content">
            <h1>Testimonials</h1>
          </div>
        </div>

        {/*     section 2 */}
        <Section2/>



    </div>
  )
}

export default LeadershipDevelopementPage