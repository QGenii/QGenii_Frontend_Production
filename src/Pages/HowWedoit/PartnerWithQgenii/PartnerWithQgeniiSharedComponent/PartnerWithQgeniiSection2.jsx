import React from "react";

import Img1 from '../../../../assets/assets/HowDoWeIt/PartnerWithQgenii/Img1.png';
import Img2 from '../../../../assets/assets/HowDoWeIt/PartnerWithQgenii/Img.png';


export default function PartnerWithQgeniiSection2() {
    return (
        <section className="relative w-full bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 flex flex-col gap-[1.88rem]">
                {/* Title */}
                <h2 className="text-center text-[2rem] font-semibold tracking-tight text-slate-900 md:text-4xl">
                    Partnership that we offer in Qgenii
                </h2>

                <div className="mt-10 space-y-10">
                    {/* Card 1 */}
                    <article className="rounded-3xl border border-blue-100 bg-[#E2F3FF] p-8 shadow-sm ring-1 ring-black/0 md:p-10">
                        <div className="grid items-center gap-8 md:grid-cols-2">
                            {/* Copy */}
                            <div>
                                <h4 className="text-[1.5rem] font-semibold text-slate-900 md:text-2xl">
                                    Become a Referral partner
                                </h4>
                                <h4 className="mt-3 max-w-prose text-[0.75rem] leading-6 text-[#1E1E1E]">
                                    Join the referral program to help your clients discover a leading AI-powered
                                    skills development platform and earn rewards while you grow your business.
                                </h4>

                                <h4 className="mt-6 text-[0.875rem] font-medium text-slate-900">
                                    Here's what you'll get as a referral partner:
                                </h4>
                                <ul className="   text-[1rem] leading-6 text-slate-700">
                                    <li>
                                        An expanded offering by aligning with Qgenii, a leading platform used by
                                        global enterprises.
                                    </li>
                                    <li>
                                        Commission for every new client you refer that purchases a qualifying Qgenii
                                        Business Plan (21+ licenses).
                                    </li>
                                    <li>
                                        Stronger client relationships thanks to your role in helping organizations
                                        upskill and achieve business goals.
                                    </li>
                                    <li>
                                        Sales and marketing support to help you easily identify and refer clients who
                                        are the best match through our dedicated partner portal.
                                    </li>
                                </ul>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-lg bg-[#2800AE] px-[2.5rem] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/60"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Illustration */}
                            <div className="mx-auto w-full max-w-[420px]">
                                <img src={Img1} alt="" />
                            </div>
                        </div>
                    </article>

                    {/* Card 2 */}
                    <article className="rounded-3xl border border-violet-100 bg-[#F3EFFF] p-8 shadow-sm md:p-10">
                        <div className="flex items-center justify-center gap-8 ">
                            {/* Illustration (left on large for visual variety) */}
                            <div className="">
                                <img src={Img2} alt="" />
                            </div>

                            {/* Copy */}
                            <div className="w-[38.83rem]">
                                <h4 className="text-[1.5rem] font-semibold text-slate-900 md:text-2xl">
                                    Become a Qgenii partner
                                </h4>
                                <h4 className="mt-3 max-w-prose text-[0.875rem] leading-6 text-slate-700">
                                    Here's what you'll get as a referral partner:
                                </h4>
                                <ul className=" text-[1rem] leading-6 text-[#1E1E1E]">
                                    <li>
                                        An expanded offering by aligning with Qgenii, a leading platform used by
                                        global enterprises.
                                    </li>
                                    <li>
                                        Commission for every new client you refer that purchases a qualifying Qgenii
                                        Business Plan (21+ licenses).
                                    </li>
                                    <li>
                                        Stronger client relationships thanks to your role in helping organizations
                                        upskill and achieve business goals.
                                    </li>
                                    <li>
                                        Sales and marketing support to help you easily identify and refer clients who
                                        are the best match through our dedicated partner portal.
                                    </li>
                                </ul>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-lg  px-[2.5rem] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/60"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}



