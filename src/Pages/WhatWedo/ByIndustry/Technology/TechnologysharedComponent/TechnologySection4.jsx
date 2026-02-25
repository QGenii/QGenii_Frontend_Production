import React from 'react'
import Img4 from "../../../../../assets/assets/WhatWedo/RemoteAndHybrid/Img4.png";

const TechnologySection4 = () => {
    return (
        <div className="learning-container">
            {/* Top Box */}
            <div className="learning-box">
                <h2 className="learning-heading">Stay ahead of the competition</h2>

                <div className="learning-content">
                    <div className=" flex flex-col gap-[1.875rem] w-[33.875rem]">
                        <div className="">
                            <h5 className='text-[1.25rem] font-medium'>Drive innovation</h5>
                            <h4 className='text-[.875rem] font-normal'>
                                Set a strong foundation for innovation by preparing your employees to interpret and apply data, leverage emerging technology, and reimagine business models.
                            </h4>

                        </div>

                        <div className='text-[1.25rem] font-medium'>
                            <h5 className='text-[1.25rem] font-medium'>Build and retain high-performing teams</h5>
                            <h4 className='text-[.875rem] font-normal'>
                                Investing in your employees enables you to attract and retain top talent.
                            </h4>
                        </div>

                        <div className="text-[1.25rem] font-medium">
                            <h5 className='text-[1.25rem] font-medium' >Create amazing customer experiences</h5>
                            <h4 className='text-[.875rem] font-normal'>
                                Critical soft skills and business skills prepare your team to collaborate and communicate more effectively.
                            </h4>
                        </div>
                    </div>

                    <div className="learning-image">
                        <img  className="w-[31.25rem] h-[31.25rem] aspect-square" src={Img4} alt="Learning Illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default TechnologySection4