import React from 'react'
import Section1 from './downloadshared/Section1'
import Section7 from './MainPage/CodeIqGeniusComponents/Section7'
import Section2 from './MainPage/sharedcomponentcodeiqgeniusaccerte/Section2'

const DownloadGuide = () => {
  return (
    <div className='h-[180rem] w-full bg-white '>
        {/* section 1 */}
        <Section1/>

         {/* shared component from codeiqgenius components file in section 7 */}
       <Section7/>

       {/* import  from codeiqgenius in sharedcomponents accelerate file  in section 2 */}
      <div className='mt-[10rem]'>
        <Section2/>
      </div>
    </div>
  )
}

export default DownloadGuide