

import { Link } from "react-router-dom";

import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/International/Img1.png';




export default function InternationalSection2() {
    const languages = Array(16).fill("English"); // creates 16 items


    return (
        <div className="w-full flex flex-col items-center justify-between gap-[0.88rem] py-[1.62rem]  mt-[3rem] bg-white shadow-[ -1px_4px_12px_0_rgba(40,0,174,0.10) ]">


            <div className="w-[69.25rem] flex flex-col items-center ">

                <h4 className="text-[1.875rem] font-semibold text-center  ">We serve governments around the world</h4>

                <div className="w-full flex flex-col items-center justify-between gap-[3.88rem] ">
                    {/* Top Box */}
                    <div className="w-[69.25rem] flex flex-col items-center justify-center gap-[1.88rem]">
                        <h2 className="text-[1rem] font-normal text-center "> Our International Collection empowers organizations around the world to drive impactful learning for all by offering local courses across 9+ languages.</h2>

                        <div className="flex   w-[69.25rem]  gap-[1.875rem]  ">

                            <div >
                                <img className="w-[23.43rem] h-[23.43rem] aspect-square" src={Img1} alt="Learning Illustration" />
                            </div>

                            <div className="flex justify-between items-center bg-white ">
                                <div className="grid grid-cols-4 gap-x-[7.88rem] text-sm gap-y-10 text-black font-medium bg w-[36.5rem]">
                                    {languages.map((lang, index) => (
                                        <div key={index}>{lang}</div>
                                    ))}
                                </div>
                            </div>


                        </div>


                    </div>

                </div>



            </div>





        </div>
    );
}