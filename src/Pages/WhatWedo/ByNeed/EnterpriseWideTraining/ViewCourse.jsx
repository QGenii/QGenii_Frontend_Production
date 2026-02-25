import React from 'react'
import Header from '../../../../Components/Header'
import ViewCourseSection1 from './ViewCourseSharedComponent/ViewCourseSection1'
// ?import from leader and executive
import ViewCourseSection2 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section4'



// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'

// ?import from learning and developement
import Section7 from '../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'

const ViewCourse = () => {
  return (
    <div className='w-full h-[282rem] bg-white'>

        <Header/>

        {/* ViewCourse section 1 */}
        <ViewCourseSection1/>
        {/*  import from leader and executive ViewCourse section 2 */}
        <ViewCourseSection2/>

          {/* import from mainpage in codeiqgenius components */}
      <CodeIqGeniusPlatform />
        {/* import from learning and developement */}
           <div className='mt-[10rem]'>
            <Section7/>
          </div>
        
    </div>
  )
}

export default ViewCourse