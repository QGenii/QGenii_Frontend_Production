import React from 'react'
import Header from '../../../../Components/Header'
import Section1 from './sharedComponent/Section1'
import Section2 from './sharedComponent/Section2'
import Section3 from './sharedComponent/Section3'
import Section7 from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'
import Section4 from './sharedComponent/Section4'
import Section5 from './sharedComponent/Section5'

// ?import from leader and executive  

import Feature from '../LeaderAndExecutive/sharedComponent/Section4'

//?import from leader and executive  
import Gardient from '../LeaderAndExecutive/sharedComponent/Section7'

const LearningAndDevelopment = () => {
  return (
    <div className='h-[400.75rem] w-full bg-white'>

        <Header/>   

        {/* Section 1 */}
        <Section1/>

        {/* section 2 */}

        <Section2/>
        {/* section 3 */}
        <Section3/>

          {/*  import from mainpage in mainpagesharedcomponents */}
          <Section7/>

{/* import from leader and executive */}
<Feature/>

{/* section 4 */}
<Section4/>
{/* Section 5 */}
<Section5/>

{/* import from leader and executive */}
<Gardient/>

       



    </div>
  )
}

export default LearningAndDevelopment