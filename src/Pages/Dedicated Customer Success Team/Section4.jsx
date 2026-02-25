import React from "react";

export default function ServicesSection() {
  const services = [
    {
      title: "Launch successfully",
      color: "bg-yellow-200",
      points: [
        "Launch and success planning",
        "Change management best practices",
        "Executive sponsor engagement",
        "Content and business outcomes mapping",
        "Integration services",
      ],
    },
    {
      title: "Get your teams up to speed",
      color: "bg-sky-200",
      points: [
        "Manager onboarding",
        "Admin product training",
        "Learner onboarding",
      ],
    },
    {
      title: "Build a culture of learning",
      color: "bg-pink-200",
      points: [
        "Making time for learning",
        "Rewarding and recognizing learning",
        "Team learning strategies",
        "Learner competitions",
      ],
    },

  ]



  const service=  [
    {
      title: "Incorporate Udemy into your L&D programs",
      color: "bg-green-200",
      points: [
        "Gaps assessment",
        "Learning program design",
        "Communication plans",
        "Plug-and-play resources for effective L&D programs",
      ],
    },
    {
      title: "Fine-tune your learning strategy",
      color: "bg-yellow-100",
      points: [
        "Consultation calls to review program performance",
        "Executive business reviews",
        "Executive alignment",
        "Customer events",
      ],
    },
  ];

  return (
    <section className="w-[68.6875rem] flex flex-col items-center mx-auto ">
      <h2 className="text-[1.875rem] md:text-3xl font-semibold text-center mb-10">
        We provide services and strategies to support your needs at every stage
      </h2>


      <div className="flex flex-col gap-[2.5rem] ">

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          
          <div
            key={idx}
            className={ `${service.color}  flex w-[22.25rem] py-[1.4375rem] px-[3.125rem] flex-col justify-center items-center gap-2.5 rounded-[1.9375rem] border border-[#919DB1] bg-[rgba(68,255,96,0.5)] shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]`}  
          >
            <div className="text-start ">
            <h4 className="text-lg font-semibold mb-3">{service.title}</h4>
            <ul className="list-disc list-inside text-black space-y-1 text-[.875rem] text-nowrap  px-3">
              {service.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            </div>

          </div>
        ))}
      </div>


      {/* <div className="grid md:grid-cols-2 gap-1  "> */}
        
        <div className="flex gap-[2.5rem] justify-center  w-full  ">
        {service.map((service, idx) => (
          
          <div
            key={idx}
            className={ `${service.color}  flex  w-[26.6875rem] p-[1.4375rem_1.125rem] flex-col justify-center items-center gap-2.5 rounded-[1.9375rem] border border-[#919DB1] bg-[rgba(68,255,96,0.5)] shadow-[-1px_4px_12px_0_rgba(12,49,110,0.10)]`}
          >
            <div className="text-start ">
            <h4 className="text-[1.25rem] font-normal  w-[20.5735rem] ">{service.title}</h4>
            <ul className="list-disc list-inside text-black space-y-1 text-[.875rem] text-nowrap  px-3">
              {service.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            </div>
          </div>

        ))}
        </div>
      {/* </div> */}

      </div>



    </section>
  );
}
