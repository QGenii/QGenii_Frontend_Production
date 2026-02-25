import React from "react";
import Img1 from '../../../../../assets/assets/WhatWedo/ByIndustry/Government/StateAndLocal/Img1.png';
export default function StateAndLocalSection3() {
    const features = [
        {
            title: "Cyber Security",
            description: "Security threats like remote work demand stronger, more united cybersecurity programs — make sure your organization is protected.",
            color: "bg-yellow-400 text-black",
            position: "top-left",
        },
        {
            title: "Optimization for cost control",
            description:
                "Consolidate your services and train your team on new technologies like automation and other new technologies to make processes faster, more accurate, and more cost effective.",
            color: "bg-pink-400 text-white",
            position: "top-right",
        },
        {

            title: "Broadband and wireless connectivity",
            description:
                "Improving internet access is a priority. Give your employees the training they need to deploy 5G networks and improve connectivity in urban and rural areas.",
            color: "bg-[#50D86D] text-white w-[14.78rem] h-[11.14rem]",
            position: "bottom-left",
        },
        {

            title: "Cloud ",
            description:
                "Develop a strategy to migrate legacy applications to the cloud and ensure that data stored in the cloud is secure and protected.",
            position: "bottom-right ",
            color: "bg-[#EDEAFB] w-[15.90rem] h-[8.28rem]",
        },
        {

            title: "Data management and analytics",
            description:
                "Data now plays an increasingly central role in decision making. Train your team to use data analytics to increase transparency and generate meaningful reports.",
            position: "bottom-center",
            color: "bg-[#FF9085] text-white",
        },
        {

            title: "Digital government",
            description:
                "Update your organization’s digital services to offer citizens a better online experience, lower costs, and collaborate more effectively with other agencies.",
            position: "bottom-center",
            color: "bg-[#9EBDFF] text-white",
        },
    ];

    return (
        <div className=" flex flex-col items-center  w-[59.8125rem] h-[41.515rem] mx-auto gap-[1.88rem] mb-[15rem] mt-[4rem]">
            {/* Heading */}
            <div className="text-center max-w-2xl ">
                <h2 className="text-[1.5rem] md:text-2xl font-normal text-black w-[49rem]">
                    IT capabilities contribute to every aspect of an organization's success.
                </h2>
                <h4 className="mt-2 text-black text-[0.875rem]  font-normal md:text-base">
Tackle the top initiatives from NASCIO's 2021 Agile State CIO Survey.
                </h4>
            </div>

            {/* Middle Section */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 ">
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
                <div className="w-[23.75rem] md:w-[22rem] h-[18.5rem] flex flex-col justify-center items-center">
                    <img
                        src={Img1}
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
