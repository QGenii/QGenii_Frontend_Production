import React from "react";

import bgimg1 from '../../../../../assets/assets/WhatWedo/LeadershipDevelopment/bgimg1.jpg';
export default function InfoCards() {
    const cards = [
        {
            id: 1,
            number: "$8.8 T",

            description:
                "is the cost of lost productivity in 2022 alone from disengaged employees.",
        },
        {
            id: 2,
            number: "73%",

            description:
                "of HR leaders confirmed their organization’s leaders and managers aren’t equipped to lead through change.",
        },
        {
            id: 3,
            number: "55%",
            title: "Languages",
            subtitle: "Native-Language Learning",
            description:
                "of employees have confidence their leadership team will make GenAI a strategic advantage.",
        },
    ];

    return (

        <div className=" flex flex-col w-[66rem] mx-auto ">
            <div className=" flex flex-col items-center">
                <h4 className="text-[1.875rem] font-semibold text-gray-800 mb-3 text-center">
                    Get the skills to lead through transformation
                </h4>

                <h2 className="text-[1rem] font-normal  text-gray-800 mb-10 w-[56.375rem] text-center  ">
                    Leaders need the tools to navigate change, unite hybrid and multi-generational workforces, connect with empathy, and so much more.
                </h2>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-9 py-2 px-4 mt-4">
                {cards.map((card, index) =>


                (


                    <div style={{ backgroundImage: `url(${bgimg1}) ` }}
                        key={index}
                        className="flex w-[20.125rem] px-[3.0625rem]  py-[3rem] flex-col justify-center items-center  bg-red-200 rounded-[1.75rem] bg-cover bg-no-repeat bg-[50%] shadow-[ -1px_4px_12px_0_rgba(12,49,110,0.10)]"
                    >
                        <h4 className="text-[1.5rem] font-semibold text-gray-900">{card.number}</h4>
                        <h4 className="mt-2 text-[0.9375rem] font-light text-gray-800">{card.title}</h4>
                        <h4 className="mt-1 text-[0.9375rem] font-medium text-gray-700">{card.subtitle}</h4>
                        <h4 className="mt-2 text-[0.9375rem] text-center font-normal text-gray-600">{card.description}</h4>
                    </div>

                )


                )}
            </div>

        </div>
    );
}
