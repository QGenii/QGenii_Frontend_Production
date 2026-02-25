import React from 'react'

import Header from '../../../Components/Header'
import MultiLanguageCollectionSection1 from './MultiLanguageCollectionSharedCommponent/MultiLanguageCollectionSection1'
import MultiLanguageCollectionSection2 from './MultiLanguageCollectionSharedCommponent/MultiLanguageCollectionSection2'
import MultiLanguageCollectionSection3 from './MultiLanguageCollectionSharedCommponent/MultiLanguageCollectionSection3'
import MultiLanguageCollectionSection4 from './MultiLanguageCollectionSharedCommponent/MultiLanguageCollectionSection4'

/* import from Learning Ecosystem */
import Testimonial1 from '../../../Learning Ecosystem/Testimonial';

// import from cohort learning
import Section7 from '../../CodeIQGenius/MainPage/CohortLearningComponents/Section7';

const MultiLanguageCollection = () => {
  return (

    <div className='h-[323rem] w-full bg-white'>
        <Header/>
        {/* MultiLanguageCollectionSection1 */}

        <MultiLanguageCollectionSection1/>
        {/* MultiLanguageCollectionSection2 */}
        <MultiLanguageCollectionSection2/>
        {/* MultiLanguageCollectionSection3 */}
        <MultiLanguageCollectionSection3/>
        {/* MultiLanguageCollectionSection4 */}
        <MultiLanguageCollectionSection4/>

         {/* import from Learning Ecosystem */}
                  <div className='mt-[4rem]'><Testimonial1/></div>
                
                    {/* import from cohort learning */}
                    <div className='mt-[4rem]'><Section7/></div>

    </div>
  )
}

export default MultiLanguageCollection