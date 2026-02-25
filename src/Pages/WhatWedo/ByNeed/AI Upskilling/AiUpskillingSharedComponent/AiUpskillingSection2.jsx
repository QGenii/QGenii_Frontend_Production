import React from "react";
import bgimg from '../../../../../assets/assets/WhatWedo/AiUpskilling/bgimg.jpg';

export default function StrategicPartnership() {
  const cards = [
    {
     
      title: "92%",
      desc: "of companies plan to invest more in AI over the next 3 years.",
      company:"XYZ Name"

    },
    {
      
      title: "77%",
      desc: "of executives say they need to adopt AI quickly to keep up with competitors.",
      company:"XYZ Name"
    },
    {
     
      title: "70%",
      desc: "of workers believe they need AI training; only 14% received it.",
      company:"XYZ Name"
    }
  ];

  return (
    <section className="w-[64.0625rem] mx-auto px-6 py-12 text-center ">
      <h2 className="text-[1.875rem] md:text-3xl font-poppins font-semibold mb-10">
       Industry leaders are racing ahead — will you keep up?
      </h2>

      <div className="grid gap-[2.625rem] md:grid-cols-3">
        {cards.map((card, idx) => (
          <div style={{backgroundImage: `url(${bgimg}) `, backgroundSize: "cover", backgroundPosition: "right" }}
            key={idx}
            className="flex h-[16.6875rem] w-[16.5rem] p-[2.43306rem_2.48375rem] flex-col justify-center items-center gap-[0.50688rem] rounded-[3.72275rem]  bg-[lightgray] bg-cover bg-no-repeat shadow-[-0.811px_3.244px_9.732px_0_rgba(12,49,110,0.10)]"
          >
           
            <h4 className=" text-[1.258rem] font-semibold">{card.title}</h4>
            <p className=" text-[0.785rem] text-gray-600 text-start">{card.desc}</p>
            <h4 className="underline text-brand text-[0.93rem]">{card.company}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
