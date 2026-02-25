import React from 'react'
import Header from '../../../Components/Header'
import RealWorldInstructorSection1 from './RealWorldInstructorsharedComponent/RealWorldInstructorSection1'
import RealWorldInstructorSection2 from './RealWorldInstructorsharedComponent/RealWorldInstructorSection2'
import RealWorldInstructorSection3 from './RealWorldInstructorsharedComponent/RealWorldInstructorSection3'
import RealWorldInstructorSection4 from './RealWorldInstructorsharedComponent/RealWorldInstructorSection4'


/* import from Learning Ecosystem */
import Testimonial1 from '../../../Learning Ecosystem/Testimonial';

// import from cohort learning
import Section7 from '../../CodeIQGenius/MainPage/CohortLearningComponents/Section7';
const RealWorldInstructor = () => {
  return (
    <div className='h-[322rem] w-full'>
        <Header/>
        {/* RealWorldInstructorSection1 */}
        <RealWorldInstructorSection1/>
        {/* RealWorldInstructorSection2 */}
        <RealWorldInstructorSection2/>
        {/* RealWorldInstructorSection3 */}
        <RealWorldInstructorSection3/>
        {/* RealWorldInstructorSection4 */}
        <RealWorldInstructorSection4/>

         {/* import from Learning Ecosystem */}
          <div className='mt-[4rem]'><Testimonial1/></div>
        
            {/* import from cohort learning */}
            <div className='mt-[4rem]'><Section7/></div>
    </div>
  )
}

export default RealWorldInstructor