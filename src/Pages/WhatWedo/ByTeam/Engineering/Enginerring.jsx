import React from 'react'
import Header from '../../../../Components/Header'

import Section1 from './sharedComponent/Section1'
import Section2 from './sharedComponent/Section2'
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'


import Section3 from './sharedComponent/Section3'

// ?import from leader and executive  

import Feature from '../LeaderAndExecutive/sharedComponent/Section4'
// ?import from learning and development
import Resources from '../LearningAndDevelopment/sharedComponent/Section5'

// import from human resources
import Section5 from '../HumanResources/sharedComponent/Section5'

const Enginerring = () => {
  return (
    <div className='h-[363.75rem] w-full bg-white'>

      <Header />

      {/* section 1 */}
      <Section1 />
      {/* section 2 */}
      <Section2 />

      {/* import from leader and executive */}
      <Feature />

      {/* import from mainpage in mainpagesharedcomponents */}
      <CodeIqGeniusPlatform />


      {/* section 3 */}
      <Section3 />

      {/* import from learning and development */}
      <Resources />

      {/* import from learning and developement */}
      <Section5 />



    </div>
  )
}

export default Enginerring