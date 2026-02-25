import React from 'react'

import { useState } from "react";

import Img1 from '../../../assets/Profile/Img1.png'
// opportunities
import { FaFlagCheckered } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { GiHammerSickle } from "react-icons/gi";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { FaRegNewspaper } from "react-icons/fa";


const itemsOpportunities = [
    { key: "all", label: "All" },
    { key: "competitions", label: "Competitions" },
    { key: "quizzes", label: "Quizzes" },
    { key: "Scholarships", label: "Scholarships" },
    { key: "Workshops", label: "Workshops" },
    { key: " Conferences", label: "Conferences" },
    { key: "Cultural Events", label: "Cultural Events" },
];

const feature = [
    "Live",

    "Upcoming",

    "Past",

]


const categories = [
    { name: "Competition", icon: <FaFlagCheckered />, color: "border-red-400 text-red-500" },
    { name: "Scholarship", icon: <FaGraduationCap />, color: "border-amber-400 text-amber-500" },
    { name: "Cultural Events", icon: <MdEvent />, color: "border-purple-400 text-purple-500" },
    { name: "Workshops", icon: <GiHammerSickle />, color: "border-green-400 text-green-500" },
    { name: "Conferences", icon: <HiOutlinePresentationChartLine />, color: "border-pink-400 text-pink-500" },
    { name: "Blogs", icon: <FaRegNewspaper />, color: "border-yellow-400 text-yellow-500" },
];


const Opportunities = () => {

    const [tab2, setTab2] = useState("all");
    const [underlineActive, setUnderlineActive] = useState("Live");
    const [hover, setHover] = useState("false");

    return (
        <div>

            <main className="flex-1  ">
                {/* Header bar */}

                <div className=" flex justify-end bg relative">
                    <button
                        className="inline-flex mt-[1rem] items-center  justify-center gap-[0.3125rem] px-[1.125rem] py-[0.375rem] rounded-[0.3125rem] bg-[var(--Brand-Color,#2800AE)] "
                    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" />
                        </svg>
                        <h4 className="text-[0.875rem] " onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>    Host Opportunities</h4>


                        {hover && (
                            <div
                                className="absolute top-[3rem]  z-50"
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                <div className="bg-white min-h-0 flex items-center justify-center">
                                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg space-y-3 w-52">
                                        {categories.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center gap-3 border ${item.color} rounded-lg p-2 cursor-pointer hover:scale-105 transition-transform duration-200 bg-white`}
                                            >
                                                <span className={`text-lg ${item.color}`}>{item.icon}</span>
                                                <span className={`font-medium text-sm ${item.color}`}>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </button>
                </div>

                <div className="">
                    <div className=" mt-[2rem] flex justify-start items-center gap-[0.625rem] self-stretch h-[3.875rem] px-[4.875rem] py-[0.9375rem] rounded-t-[1.25rem] bg-[#4013D4]">

                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none">
                            <path d="M5.41667 2.16667H20.5833C21.2333 2.16667 21.6667 1.73333 21.6667 1.08333C21.6667 0.433333 21.2333 0 20.5833 0H5.41667C4.76667 0 4.33333 0.433333 4.33333 1.08333C4.33333 1.73333 4.76667 2.16667 5.41667 2.16667ZM20.5833 5.41667H9.75C9.1 5.41667 8.66667 5.85 8.66667 6.5C8.66667 7.15 9.1 7.58333 9.75 7.58333H20.5833C21.2333 7.58333 21.6667 7.15 21.6667 6.5C21.6667 5.85 21.2333 5.41667 20.5833 5.41667ZM20.5833 10.8333H14.0833C13.4333 10.8333 13 11.2667 13 11.9167C13 12.5667 13.4333 13 14.0833 13H20.5833C21.2333 13 21.6667 12.5667 21.6667 11.9167C21.6667 11.2667 21.2333 10.8333 20.5833 10.8333ZM1.08333 0C0.433333 0 0 0.433333 0 1.08333C0 1.73333 0.433333 2.16667 1.08333 2.16667C1.73333 2.16667 2.16667 1.73333 2.16667 1.08333C2.16667 0.433333 1.73333 0 1.08333 0ZM5.41667 5.41667C4.76667 5.41667 4.33333 5.85 4.33333 6.5C4.33333 7.15 4.76667 7.58333 5.41667 7.58333C6.06667 7.58333 6.5 7.15 6.5 6.5C6.5 5.85 6.06667 5.41667 5.41667 5.41667ZM9.75 10.8333C9.1 10.8333 8.66667 11.2667 8.66667 11.9167C8.66667 12.5667 9.1 13 9.75 13C10.4 13 10.8333 12.5667 10.8333 11.9167C10.8333 11.2667 10.4 10.8333 9.75 10.8333Z" fill="white" />
                        </svg>
                        <h1 className="text-sm font-semibold text-white">My Opportunities</h1>


                    </div>

                    <div className="w-[62.125rem] h-[36.125rem] flex-shrink-0 bg-blue-50">
                        {/* Controls */}
                        <div className=" py-[1rem] flex items-center    mx-auto">
                            <div className="mb-4 flex items-center gap-2 mx-auto ">
                                {itemsOpportunities.map((t) => (
                                    <span
                                        key={t.key}
                                        onClick={() => setTab2(t.key)}
                                        className={`flex flex-col justify-center items-center gap-[0.25rem] rounded-[3.125rem]  shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)] py-[0.625rem] px-[1.25rem]
            ${tab2 === t.key ? "bg-[#2800AE] text-white" : "bg-white border  "}`}
                                        role="tab"
                                        aria-selected={tab2 === t.key}
                                    >
                                        <h4 className="text-[0.875rem]">{t.label}</h4>
                                    </span>
                                ))}
                            </div>

                        </div>

                        <hr className="w-[55.125rem] h-[0.0625rem] bg-[rgba(134,134,161,0.29)] border-[#1E1E1E]  mb-3 mx-auto" />

                        <div className="flex gap-[1.25rem] justify-end w-[55.5rem]">
                            {
                                feature.map((item, index) => (
                                    <div key={index} className="flex ">
                                        <h1 className={`text-[1rem] font-normal   ${underlineActive === item ? " underline underline-offset-[0.225rem]" : ""}`} onClick={() => setUnderlineActive(item)}>{item}</h1>

                                    </div>
                                ))

                            }
                        </div>
                        {/* Results area */}
                        <section className=" ">
                            <div className=" flex justify-center items-center">
                                <div className="flex w-[55.24rem] h-[24.4rem] flex-col items-center justify-center bg-white gap-[0.46875rem] self-stretch  py-[0.46875rem] px-0 rounded-[0.3125rem] ">
                                    {/* Simple illustration */}
                                    <img src={Img1} alt="" className="w-[13.875rem] h-[13.875rem] shrink-0 aspect-square" />

                                    <h4 className="mb-3 text-sm text-slate-600">No opportunities listed here</h4>
                                    <button

                                        className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Go to Opportunities
                                    </button>

                                </div>
                            </div>
                        </section>
                    </div>

                </div>





            </main>
        </div>
    )
}

export default Opportunities