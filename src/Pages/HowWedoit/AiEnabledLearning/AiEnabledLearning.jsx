import React from 'react'
import Header from '../../../Components/Header'
import AiEnabledLearningSection1 from './AiEnabledLearningSharedComponent/AiEnabledLearningSection1'
import AiEnabledLearningSection2 from './AiEnabledLearningSharedComponent/AiEnabledLearningSection2'
import AiEnabledLearningSection3 from './AiEnabledLearningSharedComponent/AiEnabledLearningSection3'
import AiEnabledLearningSection4 from './AiEnabledLearningSharedComponent/AiEnabledLearningSection4'
import AiEnabledLearningSection5 from './AiEnabledLearningSharedComponent/AiEnabledLearningSection5'




/* import from Learning Ecosystem */
import Testimonial1 from '../../../Learning Ecosystem/Testimonial';

// import from cohort learning
import Section7 from '../../CodeIQGenius/MainPage/CohortLearningComponents/Section7';

const AiEnabledLearning = () => {
  return (
    <div className='w-full h-[295rem]'>
        <Header/>
{/* AiEnabledLearningSection1 */}
<AiEnabledLearningSection1/>
{/* AiEnabledLearningSection2 */}
<AiEnabledLearningSection2/>
{/* AiEnabledLearningSection3 */}
<AiEnabledLearningSection3/>
{/* AiEnabledLearningSection4 */}
<AiEnabledLearningSection4/>
{/* AiEnabledLearningSection5 */}
<AiEnabledLearningSection5/>

 {/* import from Learning Ecosystem */}
  <div className='mt-[4rem]'><Testimonial1/></div>

    {/* import from cohort learning */}
    <div className='mt-[4rem]'><Section7/></div>


    </div>
  )
}

export default AiEnabledLearning