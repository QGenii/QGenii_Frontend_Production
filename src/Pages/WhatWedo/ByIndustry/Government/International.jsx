import React from 'react'
import Header from '../../../../Components/Header'
import InternationalSection1 from './InternationalSharedComponent/InternationalSection1'
import InternationalSection2 from './InternationalSharedComponent/InternationalSection2'
import InternationalSection3 from './InternationalSharedComponent/InternationalSection3'

//import from component

import TestimonialSection from '../../../../Components/TestimonialSection'
// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const International = () => {
    return (
        <div className='w-full h-[282rem] bg-white'>
            <Header />
            {/* section 1 */}
            <InternationalSection1 />

            {/* import from component */}
            <TestimonialSection />

            {/* section 2 */}
            <InternationalSection2 />
            {/* section3 */}


            <InternationalSection3 />


 {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>

        </div>
    )
}

export default International