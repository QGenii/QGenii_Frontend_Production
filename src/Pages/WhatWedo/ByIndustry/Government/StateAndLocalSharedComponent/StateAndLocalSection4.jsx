import React from "react";
import Img2 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/StateAndLocal/Img2.png';
export default function StateAndLocalSection4() {
    const features = [
        {
            title: "Retention",
            description: "Learn how to increase employee retention and reduce turnover by strategically retraining and redeploying staff and keeping employees engaged.",
            color: "bg-yellow-400 text-black w-[14.9rem] h-[9.28rem]",
            position: "top-left",
        },
        {
            title: "Leadership",
            description:
                "Develop strategic leadership and management programs to manage succession planning and empower your workforce.",
            color: "bg-pink-400 text-white w-[15.9rem] h-[8.28rem]",
            position: "top-right",
        },
        {

            title: "Agility",
            description:
                "Successful organizations know how to adapt to change and make the most of their capabilities. Prepare your staff and faculty to adjust to whatever the future brings.",
            color: "bg-[#50D86D] text-white w-[14.78rem] h-[10.14rem]",
            position: "bottom-left",
        },
        {

            title: "Diversity, equity, and inclusion",
            description:
                "DEI training sets the foundation for effective communication and collaboration among diverse groups. Give your teams the resources they need to work together productively.",
            position: "bottom-right ",
            color: "bg-[#FFF8EF] w-[15.90rem] h-[10.28rem]",
        },
        {

            title: "Wellness",
            description:
                "Empower employees to thrive personally and professionally with courses on meditation, stress management, and more.",
            position: "bottom-center",
            color: "bg-[#FF9085] text-white w-[15.90rem] h-[8.14rem]",
        },
        {

            title: "Customer relationship management",
            description:
                "Improve internal and external customer service by training your teams on customer relationship management strategies and best practices.",
            position: "bottom-center",
            color: "bg-[#9EBDFF] text-white",
        },
    ];

    return (
        <div className="flex flex-col items-center  w-[59.8125rem] h-[41.515rem] mx-auto gap-[1.88rem]">
            {/* Heading */}
            <div className="text-center max-w-2xl">
                <h2 className="text-[1.5rem] md:text-2xl font-normal text-black w-[49rem]">
                    Soft skills help your team grow their careers and collaborate more effectively.
                </h2>
                <h4 className="mt-2 text-black text-[0.875rem]  font-normal md:text-base">

                </h4>
            </div>

            {/* Middle Section */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-10  ">
                {/* Cards */}
                <div className="flex flex-col justify-between gap-6 h-[25rem] ">
                    {features
                        .filter((f) => f.position.includes("left"))
                        .map((f, index) => (
                            <div
                                key={index}
                                className={`p-[1.08rem] rounded-xl shadow-md w-[12.78rem] h-[9.14rem] ${f.color}`}
                            >
                                <div className="flex flex-col justify-center items-center h-full ">
                                    <h4 className="text-[.75rem] font-medium text-center">{f.title}</h4>
                                    <h4 className="font-normal   font-poppins text-black text-[0.75rem]">{f.description}</h4>
                                </div>               </div>
                        ))}
                </div>

                {/* Center Image */}
                <div className="w-[23.75rem] md:w-[22rem] h-[17.5rem] flex flex-col justify-center items-center">
                    <img
                        src={Img2}
                        alt="Learning illustration"
                        className="w-full"
                    />
                </div>

                <div className="flex flex-col gap-6 justify-between h-[25rem] ">
                    {features
                        .filter((f) => f.position.includes("right"))
                        .map((f, index) => (
                            <div
                                key={index}
                                className={`p-[1.08rem] rounded-xl shadow-md w-[15.9rem] h-[10.28rem] ${f.color}`}
                            >

                                <div className="flex flex-col justify-center items-center h-full">
                                    <h4 className="text-[.75rem] font-medium text-center">{f.title}</h4>
                                    <h4 className="font-normal   font-poppins text-black text-[0.75rem]">{f.description}</h4>
                                </div>

                            </div>
                        ))}
                </div>
            </div>

            <div className="flex  justify-between gap-8 h-[25rem] ">
                {features
                    .filter((f) => f.position.includes("center"))
                    .map((f, index) => (
                        <div
                            key={index}
                            className={`p-[1.08rem] rounded-xl shadow-md w-[15.9rem] h-[9.14rem] ${f.color}`}
                        >
                            <div className="flex flex-col justify-center items-center h-full">
                                 <h4 className="text-[.75rem] font-medium text-center">{f.title}</h4>
                                <h4 className="font-normal  text-center font-poppins text-black text-[0.75rem] w-[13.5rem]">{f.description}</h4>
                            </div>               </div>
                    ))}
            </div>





        </div>
    );
}
