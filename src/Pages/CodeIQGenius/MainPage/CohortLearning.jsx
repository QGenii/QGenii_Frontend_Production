import React from 'react'
import Header from '../../../Components/Header';
import Section1 from './CohortLearningComponents/Section1';
import Section2 from './CohortLearningComponents/Section2';
import Section3 from './CohortLearningComponents/Section3';
import Section4 from './CohortLearningComponents/Section4';
import Section5 from './CohortLearningComponents/Section5';
import Section6 from './CohortLearningComponents/Section6';
/* import from Learning Ecosystem */
import Testimonial1 from '../../../Learning Ecosystem/Testimonial';
import Section7 from './CohortLearningComponents/Section7';

const CohortLearning = () => {
  return (
    <div className='h-[386.6875rem] w-full bg-white'>

  <Header/>

{/* section 1 */}
<Section1/>

{/* section 2 */}
<Section2/>

{/* section 3 */}
<Section3
/>
{/* Section 4 */}
<Section4/>
  
  {/* Section 5 */}
  <Section5/>
  {/* section 6 */}
  <Section6/>

  {/*  resuable import from Learning Ecosystem */}
  <Testimonial1/>
  {/* section 7*/}
  <Section7/>

    </div>

  )
}

export default CohortLearning