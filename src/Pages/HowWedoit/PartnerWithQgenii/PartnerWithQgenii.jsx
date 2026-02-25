import React from 'react'
import Header from '../../../Components/Header'
import PartnerWithQgeniiSection1 from './PartnerWithQgeniiSharedComponent/PartnerWithQgeniiSection1'


import PartnerWithQgeniiSection2 from './PartnerWithQgeniiSharedComponent/PartnerWithQgeniiSection2'
import PartnerWithQgeniiSection3 from './PartnerWithQgeniiSharedComponent/PartnerWithQgeniiSection3'

import TourIqGenius from '../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7';

// import from cohort learning
import Section7 from '../../CodeIQGenius/MainPage/CohortLearningComponents/Section7';
const RealWorldInstructor = () => {
  return (
    <div className='h-[322rem] w-full'>
        <Header/>
        {/* PartnerWithQgeniiSection1 */}
        <PartnerWithQgeniiSection1/>
        {/* PartnerWithQgeniiSection2 */}
        <PartnerWithQgeniiSection2/>
        {/* PartnerWithQgeniiSection3 */}
        <PartnerWithQgeniiSection3/>
      
      {/* import from codeiqgenius   */}
      <TourIqGenius/>
          

        
        
            {/* import from cohort learning */}
            <div className='mt-[4rem]'><Section7/></div>
    </div>
  )
}

export default RealWorldInstructor