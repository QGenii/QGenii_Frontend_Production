import React from 'react'
import Header from '../../../Components/Header'
import InvestLeaderProgramSection1 from './InvestLeaderProgramSharedComponents/InvestLeaderProgramSection1'
    import InvestLeaderProgramSection2 from './InvestLeaderProgramSharedComponents/InvestLeaderProgramSection2'
    import InvestLeaderProgramSection3 from './InvestLeaderProgramSharedComponents/InvestLeaderProgramSection3'
        import InvestLeaderProgramSection4 from './InvestLeaderProgramSharedComponents/InvestLeaderProgramSection4'
        import InvestLeaderProgramSection5 from './InvestLeaderProgramSharedComponents/InvestLeaderProgramSection5'
       // import from cohort learning
import Section7 from '../../CodeIQGenius/MainPage/CohortLearningComponents/Section7';
const InvestLeaderProgram = () => {
  return (
    <div className='w-full h-[295rem] bg-white'>
        <Header/>
        {/* InvestLeaderProgramSection1 */}
        <InvestLeaderProgramSection1/>
        {/* InvestLeaderProgramSection2 */}
        <InvestLeaderProgramSection2/>
        {/* InvestLeaderProgramSection3 */}
        <InvestLeaderProgramSection3/>
        {/* InvestLeaderProgramSection4 */}
        <InvestLeaderProgramSection4/>
        {/* InvestLeaderProgramSection5 */}
        <InvestLeaderProgramSection5/>
          {/* import from cohort learning */}
                    <div className='mt-[4rem]'><Section7/></div>

    </div>
  )
}

export default InvestLeaderProgram