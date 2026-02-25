import React from "react";
import bgimg1 from '../../../../../../assets/assets/WhatWedo/ByTeam/LeaderAndExectutive/bgimg1.jpg';

export default function TransformationStorySection1() {
  const cards = [
    {
     
      title: "13 days ",
      desc: "faster to passed exam, expediting team productivity"
    },
    {
      
      title: "92.5%",
      desc: "of Learners rate UB content as “very helpful to success in their roles”"
    },
    {
     
      title: "12%",
      desc: "retention increase of in-demand tech roles"
    }
  ];

  return (
    <section className="w-[50.97106rem] mx-auto px-6 py-12 text-center  flex flex-col items-center justify-center gap-[1.88rem]">
      <h2 className="text-[1.475rem] md:text-3xl font-poppins font-semibold mb-2">
       CodeIQGenius driving business outcomes
      </h2>

      <div className="grid gap-[2.625rem] md:grid-cols-3 ">
        {cards.map((card, idx) => (
          <div style={{backgroundImage: `url(${bgimg1}) `, backgroundSize: "cover", backgroundPosition: "center" }}
            key={idx}
            className="flex w-[15rem] h-[7.7rem] px-[2.03738rem] py-[1.99575rem]  flex-col justify-center items-center gap-[0.50688rem] rounded-[3.72275rem]  bg-[lightgray]  bg-cover bg-no-repeat shadow-[-0.811px_3.244px_9.732px_0_rgba(12,49,110,0.10)]"
          >
           
            <h4 className=" text-[1.258rem] font-semibold w-[11.125rem]  text-center">{card.title}</h4>
            <p className="text-[0.625rem] text-gray-600 text-start w-[11.5rem] font-normal  ">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
