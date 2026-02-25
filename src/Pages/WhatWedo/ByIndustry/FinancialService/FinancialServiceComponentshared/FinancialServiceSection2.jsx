import React from "react";
import bgimg from '../../../../../assets/assets/WhatWedo/ByIndustry/FinancialService/bgimg.jpg';

export default function FinancialServiceSection2() {
    const cards = [
        {

            number: "67%",
            desc: "faster onboarding of product engineers                               ",
            company: "XYZ name"
        },
        {

            number: "12%",
            desc: "Retention increase of in-demand tech roles",
             company: "XYZ name"
        },

    ];

    return (
        <section className="w-[60.12rem] mx-auto px-6 py-12 text-center ">

            <div className="grid gap-[3.12rem] md:grid-cols-2   place-items-center  ">
                {cards.map((card, idx) => (
                    <div style={{ backgroundImage: `url(${bgimg}) `, backgroundSize: "cover", backgroundPosition: "center" }}
                        key={idx}
                        className="flex h-[12.3rem] w-[28rem] p-[3rem_3.068375rem]  flex-col justify-center items-center gap-[0.50688rem] rounded-[3.72275rem]  bg-[lightgray]  bg-cover bg-no-repeat shadow-[-0.811px_3.244px_9.732px_0_rgba(12,49,110,0.10)]"
                    >

                        <div className="flex flex-col justify-center items-center gap-[0.62rem]">   
                             <h4 className="mt-4 text-[1.258rem] font-semibold w-[17.125rem]  text-ceter ">{card.number}</h4>
                            <p className=" text-[0.785rem] text-gray-600 text-center w-[18rem]  h-[2rem]">{card.desc}</p></div>
                            <h4 className=" text-[0.935rem] text-gray-600 text-center w-[18rem]  h-[2rem]">{card.company}</h4>

                    </div>
                ))}
            </div>
        </section>
    );
}
