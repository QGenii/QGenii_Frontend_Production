import React from 'react'
import Header from '../../../../Components/Header'
import DataScienceSection1 from './DataScienceSharedComponent/DataScienceSection1'
import DataScienceSection2 from './DataScienceSharedComponent/DataScienceSection2'
import DataScienceSection3 from './DataScienceSharedComponent/DataScienceSection3'
import DataScienceSection4 from './DataScienceSharedComponent/DataScienceSection4'



// ?import from leader and executive 
import Feature from '../LeaderAndExecutive/sharedComponent/Section4'

// import from mainpage in codeiqgenius components
import CodeIqGeniusPlatform from '../../../CodeIQGenius/MainPage/CodeIqGeniusComponents/Section7'

// ?import from learning and development
import Resources from '../../ByTeam/LearningAndDevelopment/sharedComponent/Section5'

const DataScience = () => {
  return (
    <div className='h-[363.75rem] w-full bg-white'>
        <Header/>

        {/* datascience section 1 */}
        <DataScienceSection1/>

        {/* datascience section 2 */}
        <DataScienceSection2/>


        {/* import from leader and executive */}
                    <Feature />

                    {/* import from mainpage in codeiqgenius components */}
            <CodeIqGeniusPlatform />

{/* datascience section 3 */}
<DataScienceSection3/>

  {/* import from learning and development */}
      <Resources />

      {/* datascience section 4 */}
      <DataScienceSection4/>

      

    </div>
  )
}

export default DataScience