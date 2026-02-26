import React from 'react'
import Header from '../../../../Components/Header'
import ITOperrationSection1 from './shardComponent/ITOperationSection1'
import ITOperationSection2 from './shardComponent/ITOperationSection2'
import ITOperationSection3 from './shardComponent/ITOperationSection3'




// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'
// ?import from leader and executive 
import Feature from '../LeaderAndExecutive/sharedComponent/Section4'

// ?import from learning and development
import Resources from '../LearningAndDevelopment/sharedComponent/Section5'

// ?import from learning and developement
import Section7 from '../LeaderAndExecutive/sharedComponent/Section7'

const ItOperation = () => {
    return (
        <div className='h-[363.75rem] w-full bg-white'>

            <Header />

            {/* IToperationsection 1 */}
            <ITOperrationSection1 />
            {/* IToperationsection 2 */}
            <ITOperationSection2 />

            {/* import from leader and executive */}
            <Feature />

            {/* import from mainpage in codeiqgenius components */}
            <CodeIqGeniusPlatform />


            {/* import from itoperation */}
            <ITOperationSection3 />


            {/* import from learning and development */}
            <Resources />

            {/* import from learning and developement */}
            <Section7 />


        </div>
    )
}

export default ItOperation