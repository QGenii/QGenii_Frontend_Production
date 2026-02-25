import React from "react";

export default function AISkillsSection() {
  const cards = [
    {
      title: "How Devoteam Rapidly Upskilled Its Workforce In AI",
      tag: "Case Study",
      button: "Read Case Study",
    },
    {
      title: "Get A Glimpse Into The Future Of Learning: CodeIQGenius AI",
      tag: "Video",
      button: "Watch Now",
    },
    {
      title:
        "An L&D Leader’s Cheat Sheet To Supercharge Learning With GenAI",
      tag: "Guide",
      button: "Download Guide",
    },
  ];

  return (
    <section className="px-6 py-12 text-center">
        <div className="flex flex-col gap-[1.25rem]">
      {/* Section heading */}
      <h4 className="text-2xl md:text-3xl font-semibold mb-8">
        Accelerate your skills journey with AI
      </h4>

      {/* Card Grid */}
      <div className="flex flex-col md:flex-row justify-center gap-[1.25rem]">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-[0.46138rem]  border-[0.738px] border-[#8686A1] 
            bg-white 
            shadow-[-0.738px_2.953px_8.858px_0_rgba(12,49,110,0.10)] 
            flex w-[20.1875rem] 
            px-[0.5075rem] py-[0.5625rem] 
            flex-col justify-center items-start 
            gap-[0.46138rem]"
          >
            {/* Image/Thumbnail placeholder */}
            <div className="h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
              {/* <span className="text-gray-400 text-sm">Thumbnail</span> */}
            </div>

            {/* Title */}
            
            <h4 className="text-[0.73819rem] font-medium text-gray-800 text-start ">
              {card.title}
            </h4>

           
          

            {/* Tag + Button row */}
            {/* <div className="flex justify-between items-center mt-auto"> */}
              <span className=" border py-[ 0.08706rem] px-[0.21763rem] rounded-[0.13056rem] bg-gray-50 text-gray-600 text-[0.5rem]">
                {card.tag}
              </span>

              <div className=" ] 
            flex items-end justify-end
            w-full
            gap-[0.09225rem] "><span className="text-[0.65rem] rounded text-white  py-[0.3125rem] px-[0.625rem]  bg-[var(--Brand-Color,#0C316E)]">{card.button}</span></div>
            {/* </div> */}
          </div>
        ))}
      </div>

      {/* Request Demo Button */}
      <div className="flex justify-center mt-8">
      <button >
        Request a demo
      </button>
      </div>

</div>
    </section>
  );
}
