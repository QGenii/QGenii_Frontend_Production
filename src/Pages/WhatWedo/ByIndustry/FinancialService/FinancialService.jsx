import React from 'react'
import Header from '../../../../Components/Header'

import FinancialServiceSection1 from './FinancialServiceComponentshared/FinancialServiceSection1'
import FinancialServiceSection2 from './FinancialServiceComponentshared/FinancialServiceSection2'
import FinancialServiceSection3 from './FinancialServiceComponentshared/FinancialServiceSection3'
import FinancialSection4 from './FinancialServiceComponentshared/FinancialSection4'

// ?import from learning and development
import Resources from '../../ByTeam/LearningAndDevelopment/sharedComponent/Section5'

// import professionalservice section 4 in professional service 
import ProfessionalServiceSection4 from '../ProfessionalService/ProfessionalServiceSharedComponent/ProfessionalServiceSection4';


//!import from component

import TestimonialSection from '../../../../Components/TestimonialSection'

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'


// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const FinancialService = () => {
  return (
    <div className='h-[331.75rem] w-full bg-white '>
      <Header />

      {/* FinancialService section 1 */}
      <FinancialServiceSection1 />

      {/* FinancialService section 2 */}
      <FinancialServiceSection2 />

      {/* import from component */}
      <TestimonialSection />

      {/* FinancialService section 3 */}
      <FinancialServiceSection3 />

      {/* FinancialService section 4 */}
      <FinancialSection4 />

      {/* import from professional service in secctiion4 */}
      <ProfessionalServiceSection4 />

      {/* import from learning and development */}

      <Resources />

      {/* import from mainpage in codeiqgenius components */}
      <CodeIqGeniusPlatform />


 {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>








    </div>
  )
}

export default FinancialService