import React from "react";
import bgimg1 from '../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/bgimg1.jpg';

export default function StrategicPartnership() {
  const cards = [
    {
     
      title: "Drive revenue",
      desc: "Inspire innovation and maintain strong customer and industry partnerships through stronger leadership."
    },
    {
      
      title: "Support business continuity",
      desc: "Develop agile leaders who can lead their teams to adapt to change and sustain business during transitions."
    },
    {
     
      title: "Increase productivity",
      desc: "Develop leaders who can build engaged, diverse teams who are aligned towards achieving business goals."
    }
  ];

  return (
    <section className="w-[64.0625rem] mx-auto px-6 py-12 text-center ">
      <h2 className="text-[1.875rem] md:text-3xl font-poppins font-semibold mb-10">
       Achieve business outcomes
      </h2>

      <div className="grid gap-[2.625rem] md:grid-cols-3">
        {cards.map((card, idx) => (
          <div style={{backgroundImage: `url(${bgimg1}) `, backgroundSize: "cover", backgroundPosition: "center" }}
            key={idx}
            className="flex h-[12.6875rem] w-[19rem] p-[2.43306rem_2.48375rem] flex-col justify-center items-center gap-[0.50688rem] rounded-[3.72275rem]  bg-[lightgray] bg-cover bg-no-repeat shadow-[-0.811px_3.244px_9.732px_0_rgba(12,49,110,0.10)]"
          >
           
            <h4 className="mt-4 text-[1.258rem] font-semibold">{card.title}</h4>
            <p className="mt-2 text-[0.785rem] text-gray-600 text-start">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
