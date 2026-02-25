import React from 'react'

import Section1 from './sharedcomponentcodeiqgeniusaccerte/Section1'

import Section7 from './CodeIqGeniusComponents/Section7'
import Section2 from './sharedcomponentcodeiqgeniusaccerte/Section2'

const CodeIqgeniusAccelerate = () => {
  return (
    <div className='h-[160.8125rem]  bg-[#fff]  w-full'>
       
       {/* section 1 */}
       <Section1/>
       

       {/* shared component from mainpageshaedcomponent file */}
       <Section7/>
       {/* section 2 */}
       <Section2/>

    </div>
  )
}

export default CodeIqgeniusAccelerate