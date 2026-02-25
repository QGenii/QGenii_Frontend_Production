import React from 'react'
import Header from '../../../../Components/Header'
import LearningPathForLeaderSection1 from './LearningPathForLeader/LearningPathForLeaderSection1'
import LearningPathForLeaderSection2 from './LearningPathForLeader/LearningPathForLeaderSection2'
import LearningPathForLeaderSection3 from './LearningPathForLeader/LearningPathForLeaderSection3'



const LearningPathForLeader = () => {
  return (
    <div className='w-full h-[295rem] bg-white'>
        {/* header */}
        <Header/>

        <h4 className='text-2xl font-medium text-center'>Learning Paths for Leaders</h4>

        <div className='  flex flex-col justify-center w-[80%] mx-auto gap-2 mt-[3rem]'>
        <h4 className='text-[1.5rem] font-medium '>AI for Leaders</h4>
        <h5 className='text-[0.875rem] font-normal  w-[61rem] '>Leaders play a crucial role in navigating AI-driven business landscapes, ensuring resilience, and maintaining a competitive advantage. This on-demand learning path is specifically tailored to help leaders develop the skills they need to harness the power of AI effectively in their organizations.</h5>
        </div>

        {/* LearningPathForLeader Section1 */}
        <LearningPathForLeaderSection1/>
        {/*     LearningPathLeader Section2 */}

        <LearningPathForLeaderSection2/>
        {/*     LearningPathLeader Section3 */}
        <LearningPathForLeaderSection3/>


    </div>
  )
}

export default LearningPathForLeader
