import React from 'react'
import Header from '../../../../Components/Header'
import AiStarterPathSection1 from './ExploreAiStarterPathComponent/AiStarterPathSection1'
import AiStarterPathSection2 from './ExploreAiStarterPathComponent/AiStarterPathSection2'
import AiStarterPathSection3 from './ExploreAiStarterPathComponent/AiStarterPathSection3'

const AiStarterPath = () => {
  return (
    <div className='w-full h-[295rem] bg-white'>
        <Header/>
        {/* Ai Starter Path Section1 */}
        <AiStarterPathSection1/>

        {/* Ai Starter Path Section2 */}
        <AiStarterPathSection2/>
        {/* Ai Starter Path Section3 */}
        <AiStarterPathSection3/>
    </div>
  )
}

export default AiStarterPath