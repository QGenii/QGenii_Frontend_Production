import React from 'react'
import Header from '../../../../Components/Header'
import HigherEducationSection1 from './HigherEducationSharedComponent/HigherEducationSection1'
import HigherEducationSection2 from './HigherEducationSharedComponent/HigherEducationSection2'
import HigherEducationSection3 from './HigherEducationSharedComponent/HigherEducationSection3'
//import from component

import TestimonialSection from '../../../../Components/TestimonialSection'

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'
// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const HigherEducation = () => {
    return (
        <div className='w-full h-[282rem] bg-white'>
            <Header />
            {/* HigherEducation section 1 */}
            <HigherEducationSection1/>

             {/* import from component */}
        <TestimonialSection/>
        {/* import from HigherEducation section 2 */}
        <HigherEducationSection2/>
        {/* import from HigherEducation section 3 */}
        <HigherEducationSection3/>

           {/* import from mainpage in codeiqgenius components */}
      <CodeIqGeniusPlatform />


      {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>




        </div>
    )
}

export default HigherEducation