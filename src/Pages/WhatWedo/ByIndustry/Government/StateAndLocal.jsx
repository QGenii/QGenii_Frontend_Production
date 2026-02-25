import React from 'react'
import Header from '../../../../Components/Header'

import StateAndLocalSection1 from './StateAndLocalSharedComponent/StateAndLocalSection1'
import StateAndLocalSection2 from './StateAndLocalSharedComponent/StateAndLocalSection2'
import StateAndLocalSection3 from './StateAndLocalSharedComponent/StateAndLocalSection3'
import StateAndLocalSection4 from './StateAndLocalSharedComponent/StateAndLocalSection4'



//import from component

import TestimonialSection from '../../../../Components/TestimonialSection'

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'
// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const StateAndLocal = () => {
    return (
        <div className='w-full h-[282rem]'>


            <Header />

            {/* Section 1    */}
            <StateAndLocalSection1 />

            {/* import from component */}
            <TestimonialSection />
            {/* StateAndLocalSection2 */}
            <StateAndLocalSection2 />
            {/* StateAndLocalSection3 */}
            <StateAndLocalSection3 />

            {/* StateAndLocalSection4 */}
            <StateAndLocalSection4 />

             {/* import from mainpage in codeiqgenius components */}
      <CodeIqGeniusPlatform />


       {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>











        </div>
    )
}

export default StateAndLocal