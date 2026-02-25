import React from 'react'
import Header from '../../../../Components/Header'
import ManufactureSection1 from './ManufactureShareCompoenents/ManufacureSection1'
import ManufactureSection2 from './ManufactureShareCompoenents/ManufactureSection2'
import ManufactureSection3 from './ManufactureShareCompoenents/ManufactureSection3'
import ManufactureSection4 from './ManufactureShareCompoenents/ManufactureSection4'

//import from component

import TestimonialSection from '../../../../Components/TestimonialSection'

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'

// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const Manufacture = () => {
  return (
    <div className='w-full h-[331.75rem] bg-white'>

<Header/>

        <ManufactureSection1/>
        <ManufactureSection2/>

         {/* import from component */}
        <TestimonialSection/>

{/* import from manufacturesection 3 */}
        <ManufactureSection3/>
        {/* import from manufacturesection 4 */}
        <ManufactureSection4/>

         {/* import from mainpage in codeiqgenius components */}
      <CodeIqGeniusPlatform />


      {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>


    </div>
  )
}

export default Manufacture