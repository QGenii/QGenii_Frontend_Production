// src/components/Features.js
import TickImg from '../../../../../assets/assets/WhatWedo/AiUpskilling/TickImg.png';

import { useState } from "react";

const features = [
  {
    id:1,
icon: <img  className="w-[4rem] h-[4rem]" src={TickImg} alt="" />,
    title: "Comprehensive upskilling",
    description:
      "Build AI fluency and hands-on capabilities across your organization, from technical teams to business leaders.",
  },
  {
    id:2,
    icon:<img  className="w-[4rem] h-[4rem]" src={TickImg} alt="" />,
    title: "The latest content",
    description:
      "Access courses and tools created by real-world experts on the most recent AI breakthroughs, including ChatGPT, DeepSeek, Notebook LM, and more.",
  },
  {
    id:3,
    icon:<img className="w-[4rem] h-[4rem]" src={TickImg} alt="" />,
    title: "Practical results",
    description:
      "Structured learning, engaging practice, and targeted skills assessments can help your team move from knowledge to performance.",
  }

 
];

export default function LearningEcoFeatures() {

    const [learn, setlearn] = useState(false)

  return (
    <section className=" mt-15  mx-auto  w-[75.185rem]  flex items-center justify-center flex-col gap-7">
      <h2 className="text-[1.875rem]  font-semibold text-center ">
     The AI race is on, and your competition isn’t waiting
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]   p-[3.125rem] rounded-[1.25rem] ">
        {features.map((feature) => (
        <div  key={feature.id} className="flex w-[17.875rem] flex-col items-start gap-[1.875rem] self-stretch  ">
          <div  className="flex flex-col items-start gap-2  ">
            {feature.icon}
            <span className="font-normal text-[ 0.9375rem] w-[16.875rem]">{feature.title}</span>
            <span className="text-[0.65625rem] font-normal w-[15.5625rem] ">{feature.description}</span>
            {  !learn && feature.title ==="Localized learning"  && <span className="text-[0.65625rem] font-normal text-[color:var(--Brand-Color,#0C316E)] font-poppins  not-italic leading-normal underline">Learn More</span>}
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}
