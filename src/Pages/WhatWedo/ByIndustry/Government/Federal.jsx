import React from 'react'
import Header from '../../../../Components/Header'
import FederalSection1 from './FederalSharedComponent/FederalSection1'
import FederalSection2 from './FederalSharedComponent/FederalSection2'

//import from component

import TestimonialSection from '../../../../Components/TestimonialSection'


// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'
// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'
 

const Federal = () => {
  return (
    <div className='w-full h-[282rem]'>

        <Header/>

        {/* Federal Section 1 */}
        <FederalSection1/>

        {/* import from component */}
            <TestimonialSection />
            {/* Federal Section 2 */}
            <FederalSection2/>

                  {/* import from mainpage in codeiqgenius components */}
      <CodeIqGeniusPlatform />


       {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>


    </div>

  )
}

export default Federal