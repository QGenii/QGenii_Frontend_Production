import React from 'react'

import Header from '../../../../Components/Header'
import ProfessionalServiceSection1 from './ProfessionalServiceSharedComponent/ProfessionalServiceSection1';
import ProfessionalServiceSection2 from './ProfessionalServiceSharedComponent/ProfessionalServiceSection2';
import ProfessionalServiceSection3 from './ProfessionalServiceSharedComponent/ProfessionalServiceSection3';
import ProfessionalServiceSection4 from './ProfessionalServiceSharedComponent/ProfessionalServiceSection4';
import ProfessionalServiceSection5 from './ProfessionalServiceSharedComponent/ProfessionalServiceSection5';

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'

//import from component

import TestimonialSection from '../../../../Components/TestimonialSection'

// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const ProfessionalService = () => {
  return (
    <div className='h-[331.75rem] w-full bg-white'>

        <Header/>
        {/* ProfessionalService section 1 */}
        <ProfessionalServiceSection1/>
        {/* ProfessionalService section 2 */}
        <ProfessionalServiceSection2/>

        {/* import from component */}
        <TestimonialSection/>
        {/* ProfessionalService section 3 */}
        <ProfessionalServiceSection3/>

        {/* ProfessionalService section 4 */}
        <ProfessionalServiceSection4/>
        {/* ProfessionalService section 5 */}
        <ProfessionalServiceSection5/>

         {/* import from mainpage in codeiqgenius components */}
            <CodeIqGeniusPlatform />
      
      {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>

    </div>
  )
}

export default ProfessionalService