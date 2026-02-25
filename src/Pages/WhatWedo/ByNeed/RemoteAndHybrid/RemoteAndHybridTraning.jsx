import React from 'react'
import Header from '../../../../Components/Header'
import Section1 from './SharedComponent/Section1'
import Section2 from './SharedComponent/Section2'
import Section7 from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'
import Section3 from './SharedComponent/Section3'
import Section4 from '../TechTraining/SharedComponent/Section4'

const RemoteAndHybridTraning = () => {
  return (
    <div className='w-full h-[273rem] bg-white'>
        <Header/>

        {/* section 1 */}
        <Section1/>

        {/* testimonials */}

        <div className="enterprise-wide-container2 ">
          <div className="enterprise-wide-container2-content">
            <h1>Testimonials</h1>
          </div>
        </div>

        {/* section 2 */}
        <Section2/>

       
      
       {/*  import from mainpage in mainpagesharedcomponents */}
          <Section7/>

          {/* section 3 */}
          <Section3/>
          {/* import section4 from techtraining in shared component */}

          <Section4/>

    </div>
  )
}

export default RemoteAndHybridTraning