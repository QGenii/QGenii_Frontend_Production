import React from 'react'
import Header from '../../../../Components/Header'
import TestimonialSection from '../../../../Components/TestimonialSection'
//import from component
import TechnologySection3 from './TechnologysharedComponent/TechnologySection3'

import TechnologySection1 from './TechnologysharedComponent/TechnologySection1'
import TechnologySection2 from './TechnologysharedComponent/TechnologySection2'
import TechnologySection4 from './TechnologysharedComponent/TechnologySection4'
import TechnologySection5 from './TechnologysharedComponent/TechnologySection5' 

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'

// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const Technology = () => {
  return (
    <div className='h-[331.75rem] w-full bg-white'>

        <Header/>
        {/* Technology section 1 */}
        <TechnologySection1/>
        {/* Technology section 2 */}
        <TechnologySection2/>

        {/* import from component */}
        <TestimonialSection/>
        {/* Technology section 3 */}
        <TechnologySection3/>

        {/* Technology section 4 */}
        <TechnologySection4/>
        {/* Technology section 5 */}
        <TechnologySection5/>

            {/* import from mainpage in codeiqgenius components */}
            <CodeIqGeniusPlatform />
      
        {/* import from learning and developement */}
            <Section7 />




    </div>
  )
}

export default Technology