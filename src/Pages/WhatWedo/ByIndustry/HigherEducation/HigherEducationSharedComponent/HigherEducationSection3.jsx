import React from 'react'
import Img4 from '../../../../../assets/assets/WhatWedo/ByIndustry/HigherEducation/Img4.png';

const TechnologySection4 = () => {
    return (
        <div className="learning-container">
            {/* Top Box */}
            <div className="learning-box">
                <div className='max-auto mb-4'>
                <h2 className="text-[1.875rem] font-semibold text-center">Prepare your campus to thrive in a changing world</h2>
                <h4 className='text-[1rem] font-normal text-center'>
                    CodeIQGenius Business empowers everyone on campus to keep up with constantly evolving processes, technology, and priorities.
                </h4>
                </div>

                <div className="learning-content">
                    <div className=" flex flex-col gap-[1.875rem] w-[33.875rem]">
                        <div className="">
                            <h5 className='text-[1.25rem] font-medium'>Be ready for digital transformation</h5>
                            <h4 className='text-[.875rem] font-normal'>
                                Make sure everyone’s trained on cybersecurity, and prepare your IT team to manage digital integrations, innovate across departments, and use AI to better serve students.
                            </h4>

                        </div>

                        <div className='text-[1.25rem] font-medium'>
                            <h5 className='text-[1.25rem] font-medium'>Equip staff and faculty with key soft skills</h5>
                            <h4 className='text-[.875rem] font-normal'>
                                Skills like leadership, communication, and agility help staff and faculty advance their careers and work together more effectively. Diversity, equity, and inclusion training sets a foundation for strong collaboration across your institution.
                            </h4>
                        </div>

                        <div className="text-[1.25rem] font-medium">
                            <h5 className='text-[1.25rem] font-medium' >Help students master the concepts they learn in class</h5>
                            <h4 className='text-[.875rem] font-normal'>
                                Professors can incorporate Udemy content into homework assignments, encourage students to use Udemy for research, and recommend Udemy as a place to learn crucial job skills.effectively.
                            </h4>
                        </div>

                        <div className="text-[1.25rem] font-medium">
                            <h5 className='text-[1.25rem] font-medium' >Support alumni as they grow their careerss</h5>
                            <h4 className='text-[.875rem] font-normal'>
                                WIth courses on essential technical, professional, and soft skills, Udemy gives alums the resources they need to develop their careers or pivot to a new field.
                            </h4>
                        </div>
                    </div>

                    <div className="learning-image">
                        <img className="w-[31.25rem] h-[31.25rem] aspect-square" src={Img4} alt="Learning Illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default TechnologySection4