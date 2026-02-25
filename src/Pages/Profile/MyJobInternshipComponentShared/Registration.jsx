import React from 'react'

import { useState } from "react";

import Img1 from '../../../assets/Profile/Img1.png'
// Registration
import { FaFlagCheckered } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { GiHammerSickle } from "react-icons/gi";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { FaRegNewspaper } from "react-icons/fa";

//icons
import { Search, ChevronDown } from "lucide-react";

const itemsRegistration = [
    { key: "all", label: "All" },
    { key: "competitions", label: "Competitions" },
    { key: "quizzes", label: "Quizzes" },
    { key: "Scholarships", label: "Scholarships" },
    { key: "Workshops", label: "Workshops" },
    { key: " Conferences", label: "Conferences" },
    { key: "Cultural Events", label: "Cultural Events" },
    { key: "Internships", label: "Internships" },
    { key: "Jobs", label: "Jobs" },
    { key: "Festivals", label: "Festivals" },
];

const feature = [
    "All",
    "Live",

    "Closed",



]


// const categories = [
//     { name: "Competition", icon: <FaFlagCheckered />, color: "border-red-400 text-red-500" },
//     { name: "Scholarship", icon: <FaGraduationCap />, color: "border-amber-400 text-amber-500" },
//     { name: "Cultural Events", icon: <MdEvent />, color: "border-purple-400 text-purple-500" },
//     { name: "Workshops", icon: <GiHammerSickle />, color: "border-green-400 text-green-500" },
//     { name: "Conferences", icon: <HiOutlinePresentationChartLine />, color: "border-pink-400 text-pink-500" },
//     { name: "Blogs", icon: <FaRegNewspaper />, color: "border-yellow-400 text-yellow-500" },
// ];


const Registration = () => {

    const [tab2, setTab2] = useState("all");
    const [underlineActive, setUnderlineActive] = useState("Live");
    // const [hover, setHover] = useState("false");
    //for search states
    const [query, setQuery] = useState("");

    const cards = [
        {
            id: 1,
            title: "Name of the Registration",
            registered: "DD MM YYYY, 00:00 AM/PM",
            deadline: "DD MM YYYY, 00:00 AM/PM",
            email: "jossoxjsjsjsj@gmail.com",
            completed: true,
        },
        {
            id: 2,
            title: "Name of the Registration",
            registered: "DD MM YYYY, 00:00 AM/PM",
            deadline: "DD MM YYYY, 00:00 AM/PM",
            email: "jossoxjsjsjsj@gmail.com",
            completed: true,
        },
    ];

    console.log(cards.length)

    return (
        <div>

            <main className="flex-1  ">
                {/* Header bar */}

                {/* <div className=" flex justify-end bg relative">
                    <button
                        className="inline-flex mt-[1rem] items-center  justify-center gap-[0.3125rem] px-[1.125rem] py-[0.375rem] rounded-[0.3125rem] bg-[var(--Brand-Color,#2800AE)] "
                    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" />
                        </svg>
                        <h4 className="text-[0.875rem] " onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>    Host Registration</h4>


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
                </div> */}

                <div className="">
                    <div className=" mt-[2rem] flex justify-start items-center gap-[0.625rem] self-stretch h-[3.875rem] px-[4.875rem] py-[0.9375rem] rounded-t-[1.25rem] bg-[#4013D4]">

                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none">
                            <path d="M5.41667 2.16667H20.5833C21.2333 2.16667 21.6667 1.73333 21.6667 1.08333C21.6667 0.433333 21.2333 0 20.5833 0H5.41667C4.76667 0 4.33333 0.433333 4.33333 1.08333C4.33333 1.73333 4.76667 2.16667 5.41667 2.16667ZM20.5833 5.41667H9.75C9.1 5.41667 8.66667 5.85 8.66667 6.5C8.66667 7.15 9.1 7.58333 9.75 7.58333H20.5833C21.2333 7.58333 21.6667 7.15 21.6667 6.5C21.6667 5.85 21.2333 5.41667 20.5833 5.41667ZM20.5833 10.8333H14.0833C13.4333 10.8333 13 11.2667 13 11.9167C13 12.5667 13.4333 13 14.0833 13H20.5833C21.2333 13 21.6667 12.5667 21.6667 11.9167C21.6667 11.2667 21.2333 10.8333 20.5833 10.8333ZM1.08333 0C0.433333 0 0 0.433333 0 1.08333C0 1.73333 0.433333 2.16667 1.08333 2.16667C1.73333 2.16667 2.16667 1.73333 2.16667 1.08333C2.16667 0.433333 1.73333 0 1.08333 0ZM5.41667 5.41667C4.76667 5.41667 4.33333 5.85 4.33333 6.5C4.33333 7.15 4.76667 7.58333 5.41667 7.58333C6.06667 7.58333 6.5 7.15 6.5 6.5C6.5 5.85 6.06667 5.41667 5.41667 5.41667ZM9.75 10.8333C9.1 10.8333 8.66667 11.2667 8.66667 11.9167C8.66667 12.5667 9.1 13 9.75 13C10.4 13 10.8333 12.5667 10.8333 11.9167C10.8333 11.2667 10.4 10.8333 9.75 10.8333Z" fill="white" />
                        </svg>
                        <h1 className="text-sm font-semibold text-white">My Registration</h1>


                    </div>

                    <div className="w-[62.125rem] h-[36.125rem] flex-shrink-0 bg-blue-50">
                        {/* Controls */}
                        <div className=" py-[1rem] flex items-center    mx-auto">
                            <div className=" flex items-center gap-y-[1.5rem] gap-x-1 mx-auto flex-wrap ">
                                {itemsRegistration.map((t) => (
                                    <span
                                        key={t.key}
                                        onClick={() => setTab2(t.key)}
                                        className={`flex flex-col justify-center items-center gap-[0.25rem] rounded-[3.125rem]  shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)] py-[0.625rem] px-[2.25rem]
            ${tab2 === t.key ? "bg-[#2800AE] text-white" : "bg-white border  "}`}
                                        role="tab"
                                        aria-selected={tab2 === t.key}
                                    >
                                        <h4 className="text-[0.875rem]">{t.label}</h4>
                                    </span>
                                ))}
                            </div>

                        </div>

                        <hr className="w-[55.125rem] h-[0.0625rem] bg-[rgba(134,134,161,0.29)]   mb-3 mx-auto" />

                        <div className=' flex items-center justify-center w-[56.18rem] mx-auto'>
                            <div className=" w-[56.25rem]  mx-auto ">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search Certifications"
                                        className="w-[38.18rem] rounded-full border border-slate-300 bg-white px-10 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-[1.25rem] justify-end w-[55.5rem]">
                                {
                                    feature.map((item, index) => (
                                        <div key={index} className="flex ">
                                            <h1 className={`text-[1rem] font-normal  px-[1.25rem]  ${underlineActive === item ? " underline underline-offset-[0.225rem]" : ""}`} onClick={() => setUnderlineActive(item)}>{item}</h1>

                                        </div>
                                    ))

                                }
                            </div>

                        </div>
                        {/* Results area */}
                        {/* <section className=" "> */}

                          

                        {
                            // safe empty check
                            ( !cards.length) ? (
                                <div className="flex justify-center items-center">
                                    <div className="flex w-[55.24rem] h-[24.4rem] flex-col items-center justify-center bg-white gap-[0.46875rem] self-stretch py-[0.46875rem] px-0 rounded-[0.3125rem]">
                                        <img src={Img1} alt="empty registrations illustration" className="w-[13.875rem] h-[13.875rem] shrink-0 aspect-square" />
                                        <h4 className="mb-3 text-sm text-slate-600">You have no registrations / Applications</h4>
                                        <button
                                            type="button"
                                            className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Go to Registration
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="min-h-screen p-8">
                                    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {cards.map((c) => (
                                            <article
                                                key={c.id}
                                                className="w-[26.4rem] h-[16.375rem] rounded-2xl shadow-md p-5 relative ring-1 bg-white ring-gray-100"
                                            >
                                                <div className="flex flex-col items-start gap-4">
                                                    <div className="flex items-center justify-between w-full">
                                                        <div>
                                                            <div className="flex items-center justify-center gap-1">
                                                                {/* make clipPath id unique per card */}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                                    <g clipPath={`url(#clip-${c.id})`}>
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M-0.729167 -1.25C-0.8673 -1.25 -0.999776 -1.19513 -1.09745 -1.09745C-1.19513 -0.999776 -1.25 -0.8673 -1.25 -0.729167V10.7292C-1.25 10.8673 -1.19513 10.9998 -1.09745 11.0975C-0.999776 11.1951 -0.8673 11.25 -0.729167 11.25H10.7292C10.8673 11.25 10.9998 11.1951 11.0975 11.0975C11.1951 10.9998 11.25 10.8673 11.25 10.7292V-0.729167C11.25 -0.8673 11.1951 -0.999776 11.0975 -1.09745C10.9998 -1.19513 10.8673 -1.25 10.7292 -1.25H-0.729167ZM4.32708 7.45208L9.01458 2.76458L8.27812 2.02708L3.95833 6.34687L1.72292 4.11042L0.985416 4.84792L3.58958 7.45208C3.63796 7.50059 3.69544 7.53907 3.75871 7.56532C3.82199 7.59158 3.88983 7.6051 3.95833 7.6051C4.02684 7.6051 4.09468 7.59158 4.15795 7.56532C4.22123 7.53907 4.2787 7.50059 4.32708 7.45208Z"
                                                                            fill="#1AA639"
                                                                        />
                                                                    </g>
                                                                    <rect x="0.3125" y="0.3125" width="9.375" height="9.375" rx="0.6875" stroke="#1AA639" strokeWidth="0.625" />
                                                                    <defs>
                                                                        <clipPath id={`clip-${c.id}`}>
                                                                            <rect width="10" height="10" rx="1" fill="white" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <h4 className="text-[0.625rem] font-medium">Registration Form</h4>
                                                            </div>

                                                            <div className="w-14 h-14 rounded-lg flex items-center justify-center text-sm text-gray-400"></div>
                                                        </div>

                                                        <div className="flex items-start justify-start gap-3">
                                                            <div className="text-xs text-gray-500">Email Notifications:</div>

                                                            <label className="relative flex flex-col justify-start gap-2 items-center cursor-pointer">
                                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                                <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-purple-600 peer-checked:before:translate-x-5 relative before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:bg-white before:rounded-full before:shadow-sm transition-all" />
                                                                {/* decorative/share icon */}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M9.33333 11.6003C9.33333 12.3075 9.05238 12.9858 8.55228 13.4859C8.05219 13.986 7.37391 14.2669 6.66667 14.2669C5.95942 14.2669 5.28115 13.986 4.78105 13.4859C4.28095 12.9858 4 12.3075 4 11.6003C4 10.893 4.28095 10.2147 4.78105 9.71464C5.28115 9.21455 5.95942 8.93359 6.66667 8.93359C7.37391 8.93359 8.05219 9.21455 8.55228 9.71464C9.05238 10.2147 9.33333 10.893 9.33333 11.6003Z" stroke="#1E1E1E" strokeWidth="1.6" />
                                                                    <path d="M14.6654 5.73242L9.33203 9.46576M14.6654 17.4658L9.33203 13.7324" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" />
                                                                    <path d="M20.0013 18.5333C20.0013 19.2406 19.7204 19.9189 19.2203 20.419C18.7202 20.919 18.0419 21.2 17.3346 21.2C16.6274 21.2 15.9491 20.919 15.449 20.419C14.9489 19.9189 14.668 19.2406 14.668 18.5333C14.668 17.8261 14.9489 17.1478 15.449 16.6477C15.9491 16.1476 16.6274 15.8667 17.3346 15.8667C18.0419 15.8667 18.7202 16.1476 19.2203 16.6477C19.7204 17.1478 20.0013 17.8261 20.0013 18.5333ZM20.0013 4.66667C20.0013 5.37391 19.7204 6.05219 19.2203 6.55228C18.7202 7.05238 18.0419 7.33333 17.3346 7.33333C16.6274 7.33333 15.9491 7.05238 15.449 6.55228C14.9489 6.05219 14.668 5.37391 14.668 4.66667C14.668 3.95942 14.9489 3.28115 15.449 2.78105C15.9491 2.28095 16.6274 2 17.3346 2C18.0419 2 18.7202 2.28095 19.2203 2.78105C19.7204 3.28115 20.0013 3.95942 20.0013 4.66667Z" stroke="#1E1E1E" strokeWidth="1.6" />
                                                                </svg>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="mt-2 text-gray-500 space-y-1">
                                                            <h4 className="text-sm font-medium text-gray-800">{c.title}</h4>
                                                            <div>Registered on: <span className="text-gray-700 text-[0.875rem]">{c.registered}</span></div>
                                                            <div>Deadline: <span className="text-gray-700 text-[0.875rem]">{c.deadline}</span></div>
                                                            <div>By Mail: <span className="text-gray-700 text-[0.875rem]">{c.email}</span></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                                    {/* completed icon */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M8 1.5C4.41594 1.5 1.5 4.41594 1.5 8C1.5 11.5841 4.41594 14.5 8 14.5C11.5841 14.5 14.5 11.5841 14.5 8C14.5 4.41594 11.5841 1.5 8 1.5ZM9.50594 5.29437L10.2591 5.9525L7.95875 8.58062L7.20563 7.86L9.50594 5.29437ZM5.99781 10.7072L3.79281 8.5L4.5 7.79281L6.70531 10L5.99781 10.7072ZM8.02906 10.7319L5.79844 8.5L6.50594 7.79313L7.97969 9.26844L11.4525 5.29437L12.2056 5.9525L8.02906 10.7319Z" fill="#1AA639" />
                                                    </svg>
                                                    <span className="text-xs text-gray-500">Completed</span>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* </section> */}
                    </div>

                </div>





            </main>
        </div>
    )
}

export default Registration