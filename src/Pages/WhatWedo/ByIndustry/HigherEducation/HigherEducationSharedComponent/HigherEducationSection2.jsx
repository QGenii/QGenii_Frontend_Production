// src/components/Features.js
import { Link } from 'react-router-dom';
import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/HigherEducation/Img1.png';
import Img2 from '../../../../../assets/assets/WhatWedo/ByIndustry/HigherEducation/Img2.png';
import Img3 from '../../../../../assets/assets/WhatWedo/ByIndustry/HigherEducation/Img3.png';

const features = [
    {
        id: 1,
        icon: <img src={Img1} alt="" />,
        title: "Learning paths",
        description:
            "Create holistic, customized learning experiences that combine Udemy Business content with other resources, like your own materials or links to articles.",

    },

    {
        id: 2,
        icon: <img src={Img2} alt="" />,
        title: "Custom courses",
        description:
            "Our course builder lets you create your own courses using your proprietary content. Engage your learners with interactive elements like quizzes and videos.",

    },
    {
        id: 3,
        icon: <img src={Img3} alt="" />,
        title: "Learner insights",
        description:
            "Track learning progress, pay attention to trends and patterns in behavior, and know when to take action to increase engagement.",

    },


];

export default function HigherEducationSection2() {



    return (
        <section className=" mt-[3rem]  mx-auto  w-[70.185rem] h-[35rem]  flex items-center justify-center flex-col gap-[1.88rem] rounded-[1.25rem] border-[0.5px] border-[#919DB1] bg-white shadow-[ -1px_4px_12px_0_rgba(40,0,174,0.10)] py-[2rem]">

            <div className=" flex flex-col items-center justify-"><h2 className="text-[1.875rem]  font-semibold text-center  ">
                A smarter approach to learning
            </h2>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]    px-3 ">
                {features.map((feature) => (
                    <div key={feature.id} className="flex  flex-col items-center gap-[1.875rem] w-[21.34rem]  self-stretch  ">
                        <div className="flex flex-col items-start justify-center  gap-[1.25rem] w-[20.675rem]">

                            <div className="w-[15rem] h-[15rem] aspect-square text-black"> {feature.icon}</div>
                            <div className='w-[20.675rem] '>
                                <h4 className="font-normal text-[1.25rem] w-[16.875rem]">{feature.title}</h4>
                                <span className="text-[0.875625rem] font-normal w-[19rem] ">{feature.description}</span>
                            </div>



                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}