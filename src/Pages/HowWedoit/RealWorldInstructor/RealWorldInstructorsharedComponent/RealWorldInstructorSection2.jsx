
import React from 'react'

export default function RealWorldInstructorSection2() {
    const items = [
        {
            title: "Real‑world subject matter experts",
            body:
                "Our instructor community includes thought leaders, best‑selling authors, executive coaches, real‑world practitioners, and award‑winning professors.",
            bg: "bg-[#E1F2FF]",

        },
        {
            title: "Diverse backgrounds & experiences",
            body:
                "Our unique marketplace model enables us to attract instructors from over 180 countries across a wide range of industries, verticals, and skills.",
            bg: "bg-[#E9E3FF]",

        },
        {
            title: "Incentivized to maintain fresh content",
            body:
                "Through course ratings, reviews, and direct messaging, our instructors receive regular feedback that helps them identify areas of improvement and ensure freshness and quality.",
            bg: "bg-[#E2FFE8]",

        },
        {
            title: "Empowered by data",
            body:
                "We analyze learning data points and expose key trends to our instructors to help them identify new and emerging skills to keep your team ahead of the rest.",
            bg: "bg-[#FFF3E1]",

        },
        {
            title: "Evaluated for quality and relevance",
            body:
                "We continuously vet our instructors through a combination of manual and automated curation tactics and social proof. We listen to learners to understand what resonates.",
            bg: "bg-[#D3DAFF]",

        },
        {
            title: "A global community of native speakers",
            body:
                "In addition to our English content, our international course collection features 2,000+ courses taught by native‑speaking subject matter experts in French, Spanish, so your employees can learn in their native language.",
            bg: "bg-[#FFE379]",

        },
    ];

    return (
        <section className="w-[77.25rem]  mx-auto">
            <div className="flex flex-col items-center justify-center gap-[1.88rem]">
                {/* Heading */}
                <header className=" flex flex-col items-center justify-center ">
                    <h2 className="text-[2rem] font-semibold text-center ">
                        How we select our instructors
                    </h2>
                    <p className=" text-[1.25rem] font-normal  font-poppins">
                        Of the 85K+ instructors on Qgenii, only a fraction are selected to teach for Qgenii Business.
                    </p>
                </header>

                {/* Cards */}
                <div className="flex flex-wrap justify-center items-center gap-x-[2.5rem] gap-y-[1.88rem]">
                    {items.map((item, idx) => (
                        <article
                            key={idx}
                            className={`${item.bg} w-[24rem] h-[12.5rem] px-[0.75rem] py-[2.6875rem]   rounded-[3.8125rem]`}
                            aria-label={item.title}
                        >


                            <div className="flex flex-col items-center gap-3">
                                <h4 className="text-[0.875rem] font-normal text-[#1E1E1E]">
                                    {item.title}
                                </h4>
                                <h4 className="text-[0.75rem] font-normal text-[#1E1E1E]">
                                    {item.body}
                                </h4>

                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
