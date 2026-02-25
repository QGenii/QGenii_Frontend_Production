

import { Link } from "react-router-dom";

import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/Img1.png';




export default function GovernmentSection4() {


    return (
        <div className="w-full flex flex-col items-center justify-between gap-[0.88rem]   mt-[3rem]">


            <div className="w-[69.25rem] flex flex-col items-center ">

                <h4 className="text-[1.875rem] font-semibold text-center  ">Prepare your agency for whatever comes next</h4>

                <div className="w-full flex flex-col items-center justify-between gap-[3.88rem] ">
                    {/* Top Box */}
                    <div className="w-[69.25rem] flex flex-col items-center justify-center gap-[1.88rem]">
                        <h2 className="text-[1rem] font-normal text-center "> CodeIQGenius Government empowers your teams to keep up with constantly evolving processes, technology, and priorities.</h2>

                        <div className="flex  w-[69.25rem]  gap-[1.875rem] ">
                            <div className=" flex flex-col gap-[1rem] w-[33.875rem] justify-center">




                                <div>

                                    <h5 className='text-[1rem] font-medium'>Upskill and reskill your workforce</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                        Constantly updated online courses give your team the training they need to keep pace with change and tackle tomorrow’s challenges.
                                    </h4>
                                </div>



                                <div className='text-[1.25rem] font-medium'>
                                    <h5 className='text-[1rem] font-medium'>Navigate digital transformation</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                      Courses on everything from IT to AI help you stay up to date with the latest technology and protect against cybersecurity threats.
                                    </h4>
                                </div>

                                <div className="text-[1.25rem] font-medium">
                                    <h5 className='text-[1rem] font-medium' >Encourage career growth</h5>
                                    <h4 className='text-[.875rem] font-normal'>
                                       Your employees can learn hard and soft skills like data analytics, agility, and leadership, and fulfill agency-specific requirements.
                                    </h4>
                                </div>
                            </div>

                            <div >
                                <img className="w-[32rem] h-[32rem] aspect-square" src={Img1} alt="Learning Illustration" />
                            </div>
                        </div>


                    </div>

                </div>



            </div>





        </div>
    );
}