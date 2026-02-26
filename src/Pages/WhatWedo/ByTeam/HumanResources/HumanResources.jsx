import React from 'react'
import Header from '../../../../Components/Header'
import Section1 from './sharedComponent/Section1'
import Section2 from './sharedComponent/Section2'

//? import from mainpage in mainpagesharedcomponents
import Section7 from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'

import Section3 from './sharedComponent/Section3'
import Section4 from './sharedComponent/Section4'
// ?import from learning and development
import Resources from '../LearningAndDevelopment/sharedComponent/Section5'

import Section5 from './sharedComponent/Section5'

const HumanResources = () => {
  return (
    <div className='h-[363.75rem] w-full bg-white'>

   <Header/>

   {/* section 1 */}
   <Section1/>

   {/* section 2 */}
   <Section2/>

   {/* import from mainpage in mainpagesharedcomponents */}
   <Section7/>

   <div className='mt-[3rem]'>{/* section 3 */
   <Section3/>}</div>
   {/* section 4 */}
   <Section4/>

   {/* import from learning and development */}
   <Resources/>

   {/* Section 5 */}
   <div className='mt-[2rem]'><Section5/></div>

    </div>
  )
}

export default HumanResources