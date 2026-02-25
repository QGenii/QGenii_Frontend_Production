import React from 'react'
import Header from '../../../Components/Header'
import LeadingGenAiInovationprogramSection1 from './LeadingGenAiInovationprogramSharedComponent/LeadingGenAiInovationprogramSection1'
    import LeadingGenAiInovationprogramSection2 from './LeadingGenAiInovationprogramSharedComponent/LeadingGenAiInovationprogramSection2'
    import LeadingGenAiInovationprogramSection3 from './LeadingGenAiInovationprogramSharedComponent/LeadingGenAiInovationprogramSection3'
    import LeadingGenAiInovationprogramSection4 from './LeadingGenAiInovationprogramSharedComponent/LeadingGenAiInovationprogramSection4'
    import LeadingGenAiInovationprogramSection5 from './LeadingGenAiInovationprogramSharedComponent/LeadingGenAiInovationprogramSection5'
           // import from cohort learning
    import Section7 from '../../CodeIQGenius/MainPage/CohortLearningComponents/Section7';
const LeadingGenAiInovationprogram = () => {
  return (
    <div className='w-full h-[295rem] bg-white'>
        <Header/>
        {/* LeadingGenAiInovationprogramSection1 */}
        <LeadingGenAiInovationprogramSection1/>
        {/* LeadingGenAiInovationprogramSection2 */}
        <LeadingGenAiInovationprogramSection2/>
        {/* LeadingGenAiInovationprogramSection3 */}
        <LeadingGenAiInovationprogramSection3/>
        {/* LeadingGenAiInovationprogramSection4 */}
        <LeadingGenAiInovationprogramSection4/>
        {/* LeadingGenAiInovationprogramSection5 */}
        <LeadingGenAiInovationprogramSection5/>


            {/* import from cohort learning */}
                            <div className='mt-[4rem]'><Section7/></div>

    </div>
  )
}

export default LeadingGenAiInovationprogram