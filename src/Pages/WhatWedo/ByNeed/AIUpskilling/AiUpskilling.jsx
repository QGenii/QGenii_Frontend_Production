import React from 'react'
import Header from '../../../../Components/Header'
import AiUpskillingSection1 from './AiUpskillingSharedComponent/AiUpskillingSection1'
import AiUpskillingSection2 from './AiUpskillingSharedComponent/AiUpskillingSection2'
import AiUpskillingSection3 from './AiUpskillingSharedComponent/AiUpskillingSection3'
import AiUpskillingSection4 from './AiUpskillingSharedComponent/AiUpskillingSection4'
import AiUpskillingSection5 from './AiUpskillingSharedComponent/AiUpskillingSection5'



// import from codeiqgenius main page
import Section5 from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section5'

const AiUpskilling = () => {
  return (
    <div className='w-full h-[295rem] bg-white'>

        <Header/>

        <AiUpskillingSection1/>

        {/* AiUpskillingSection2 */}
        <AiUpskillingSection2/>
        {/* AiUpskillingSection3 */}
        <AiUpskillingSection3/>


        {/* AiUpskillingSection4 */}
        <AiUpskillingSection4/>

        {/* Section5 */}
        <Section5/>

        {/*AiUpskillingSection5  */}

        <AiUpskillingSection5/>






    </div>
  )
}

export default AiUpskilling