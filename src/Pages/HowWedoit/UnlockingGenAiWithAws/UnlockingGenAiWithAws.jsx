import React from 'react'
import Header from '../../../Components/Header'
import UnlockingGenAiWithAwsSection1 from './UnlockingGenAiWithAwsSharedComponent/UnlockingGenAiWithAwsSection1'
    import UnlockingGenAiWithAwsSection2 from './UnlockingGenAiWithAwsSharedComponent/UnlockingGenAiWithAwsSection2'
    import UnlockingGenAiWithAwsSection3 from './UnlockingGenAiWithAwsSharedComponent/UnlockingGenAiWithAwsSection3'
    import UnlockingGenAiWithAwsSection4 from './UnlockingGenAiWithAwsSharedComponent/UnlockingGenAiWithAwsSection4'
    import UnlockingGenAiWithAwsSection5 from './UnlockingGenAiWithAwsSharedComponent/UnlockingGenAiWithAwsSection5'
           // import from cohort learning
    import Section7 from '../../CodeIQGenius/MainPage/CohortLearningComponents/Section7';
const UnlockingGenAiWithAws = () => {
  return (
    <div className='w-full h-[295rem] bg-white'>
        <Header/>
        {/* UnlockingGenAiWithAwsSection1 */}
        <UnlockingGenAiWithAwsSection1/>
        {/* UnlockingGenAiWithAwsSection2 */}
        <UnlockingGenAiWithAwsSection2/>
        {/* UnlockingGenAiWithAwsSection3 */}
        <UnlockingGenAiWithAwsSection3/>
        {/* UnlockingGenAiWithAwsSection4 */}
        <UnlockingGenAiWithAwsSection4/>
        {/* UnlockingGenAiWithAwsSection5 */}
        <UnlockingGenAiWithAwsSection5/>


            {/* import from cohort learning */}
                            <div className='mt-[4rem]'><Section7/></div>

    </div>
  )
}

export default UnlockingGenAiWithAws