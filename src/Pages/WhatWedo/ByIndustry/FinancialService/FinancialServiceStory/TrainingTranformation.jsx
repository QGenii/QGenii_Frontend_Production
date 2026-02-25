import React from 'react'

import Header from '../../../../../Components/Header';
import TransformationStorySection1 from './Transformationsharedcomponent/TransformationStorySection1'
import TransformationStorySection2 from './Transformationsharedcomponent/TransformationStorySection2'
import TrainingTransformationSection1 from './TrainingTransformation/TrainingTranformationSection1'


//!import from component

import TestimonialSection from '../../../../../Components/TestimonialSection'

// import from learning ecosystem
import Testimonial from "../../../../../Learning Ecosystem/Testimonial";


// ?import from learning and developement
import Section7 from '../../../ByTeam/LeaderAndExecutive/sharedComponent/Section7'
const TransformationStory = () => {
  return (
    <div className='w-full h-[245.73rem] bg-white '>
       <Header/>

       <h4 className='text-brand text-center  underline '>Case Studies</h4>

       {/* transformation story Section1  */}
       <TransformationStorySection1/>
       {/* transformation story Section2  */}
       <TransformationStorySection2/>



{/* transformation story Section3  */}

    <TrainingTransformationSection1/>
        {/* import from component */}
      <TestimonialSection />



      {/* testimonial  import from learnig Eco Syatem*/}
             <Testimonial />

{/* import from learning and developement */}
           <div className='mt-[rem]'>
            <Section7/>
          </div>



    </div>
  )
}

export default TransformationStory