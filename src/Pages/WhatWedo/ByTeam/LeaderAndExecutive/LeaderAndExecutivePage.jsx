import React from 'react'

import Header from '../../../../Components/Header'
import Section1 from './sharedComponent/Section1'
import Section2 from './sharedComponent/Section2'
import Section3 from './sharedComponent/Section3'
import Section4 from './sharedComponent/Section4'
import Section5 from './sharedComponent/Section5'
import Section6 from './sharedComponent/Section6'
import Section7 from './sharedComponent/Section7'


const LeaderAndExecutivePage = () => {
  return (
    <div className='h-[346.6875rem] w-full bg-white'>

        <Header/>   

        {/* section 1 */}
        <Section1/>

{/* section 2 */}
<Section2/>
{/* section 3 */}
<Section3/>
{/* section 4 */}
<Section4/>
{/* section 5 */}
<Section5/>
{/* section 6 */}
<Section6/>
{/* section 7 */}

<div className='mt-[1rem]'><Section7/></div>


    </div>
  )
}

export default LeaderAndExecutivePage