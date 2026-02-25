import React from 'react'
import Header from '../../../../Components/Header'
import GovernmentSection1 from './GovernementShareComponent/GovernmentSection1'
import GovernmentSection2 from './GovernementShareComponent/GovernmentSection2'
import GovernmentSection3 from './GovernementShareComponent/GovernmentSection3'
import GovernmentSection4 from './GovernementShareComponent/GovernmentSection4'

//import from component

import TestimonialSection from '../../../../Components/TestimonialSection'

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'
// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const Government = () => {
  return (
    <div className='w-full h-[253rem] bg-[#FAFAFA]'>

<Header/>

<GovernmentSection1/>

 {/* import from component */}
        <TestimonialSection/>

        {/* import from government section 2 */}
        <GovernmentSection2/>

        {/* import from government section 3 */
        <GovernmentSection3/>}
        {/* import from government section 4 */
        <GovernmentSection4/>}

          {/* import from mainpage in codeiqgenius components */}
      <CodeIqGeniusPlatform />


      {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>


    </div>
  )




}

export default Government