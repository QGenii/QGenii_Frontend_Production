import React from 'react'
import Img1 from '../../../assets/Profile/Img1.png'

import { useState, useMemo } from "react";

const itemsround = [
    { key: "all", label: "All" },
    { key: "Quiz", label: "Quiz" },
    { key: "Code Contest", label: "Code Contest" },
    { key: "Quiz Assessment", label: "Quiz Assessment" },
    { key: "Offline Round", label: "Offline Round" },

];

const feature = [
    "Live",

    "Upcoming",

    "Past",

]

const cards = [
    {
        id: 1,
        company : "Company Name",
        title: "Name of the Registration",
        date: "DD MM YYYY, 00:00 AM/PM",
         dateAnnounced: "DD MM YYYY, 00:00 AM/PM",
        role: "jossoxjsjsjsj@gmail.com",
        completed: true,
    },
    {
        id: 2,
        company : "Company Name",
        title: "Name of the Registration",
        date: "DD MM YYYY, 00:00 AM/PM",
         dateAnnounced: "DD MM YYYY, 00:00 AM/PM",
        role: "jossoxjsjsjsj@gmail.com",
        completed: true,
    }
];


const MyRound = () => {

    const [tab3, setTab3] = useState("all");
    const [underlineActive, setUnderlineActive] = useState("Live");
    // const [date, setDate] = useState("");


    return (
        <div>


            <main className="flex-1  ">
                {/* Header bar */}

                <div className=" flex justify-end bg relative">

                </div>

                <div className="">
                    <div className=" mt-[2rem] flex justify-start items-center gap-[0.625rem] self-stretch h-[3.875rem] px-[4.875rem] py-[0.9375rem] rounded-t-[1.25rem] bg-[#4013D4]">

                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <path d="M7.58333 19.5017C7.58333 20.3636 7.92574 21.1903 8.53524 21.7998C9.14473 22.4093 9.97138 22.7517 10.8333 22.7517C11.6953 22.7517 12.5219 22.4093 13.1314 21.7998C13.7409 21.1903 14.0833 20.3636 14.0833 19.5017M7.58333 19.5017C7.58333 18.6397 7.92574 17.8131 8.53524 17.2036C9.14473 16.5941 9.97138 16.2517 10.8333 16.2517M7.58333 19.5017H1.625M14.0833 19.5017C14.0833 18.6397 13.7409 17.8131 13.1314 17.2036C12.5219 16.5941 11.6953 16.2517 10.8333 16.2517M14.0833 19.5017H19.5M10.8333 16.2517V5.96002M19.5 19.5017C19.5 20.3586 19.5325 21.0005 19.578 21.4771C19.649 22.2344 20.3353 22.5854 21.0188 22.2506C21.6147 21.9552 22.195 21.6294 22.7576 21.2746C23.205 20.9992 23.6367 20.699 24.0505 20.3754C24.6659 19.8863 24.6659 19.1166 24.0505 18.628C23.7396 18.3804 23.3204 18.0809 22.757 17.7288C22.1945 17.3738 21.6142 17.0479 21.0183 16.7522C20.3353 16.4174 19.6495 16.7679 19.578 17.5251C19.533 18.0024 19.5 18.6442 19.5 19.5017ZM10.8333 4.53544C10.8333 3.86377 11.4346 3.37085 12.0846 3.54202C13.0363 3.79281 14.5134 4.23481 16.4542 4.97527C17.1428 5.23522 17.8229 5.51703 18.4936 5.82027C19.8055 6.4199 19.8055 7.66735 18.4936 8.26698C17.9573 8.51181 17.2884 8.79348 16.4537 9.11198C12.8408 10.4905 10.8333 10.835 10.8333 10.835V4.53544Z" stroke="white" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h1 className="text-sm font-semibold text-white">My Rounds</h1>


                    </div>

                    <div className="w-[62.125rem] h-[36.125rem] flex-shrink-0 bg-blue-50">
                        {/* Controls */}
                        <div className=" py-[1rem] flex items-center    mx-auto">
                            <div className="mb-4 flex items-center gap-2 mx-auto ">
                                {itemsround.map((t) => (
                                    <span
                                        key={t.key}
                                        onClick={() => setTab3(t.key)}
                                        className={`flex flex-col justify-center items-center gap-[0.25rem] rounded-[3.125rem]  shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)] py-[0.625rem] px-[1.88rem]
                    ${tab3 === t.key ? "bg-[#2800AE] text-white" : "bg-white border  "}`}
                                        role="tab"
                                        aria-selected={tab3 === t.key}
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

                        {
                            (!cards.length) ? (
                                <div className=" flex justify-center items-center">
                                    <div className="flex w-[55.24rem] h-[24.4rem] flex-col items-center justify-center bg-white gap-[0.46875rem] self-stretch  py-[0.46875rem] px-0 rounded-[0.3125rem] ">
                                        {/* Simple illustration */}
                                        <img src={Img1} alt="" className="w-[13.875rem] h-[13.875rem] shrink-0 aspect-square" />

                                        <h4 className="mb-3 text-sm text-slate-600">No opportunities listed here</h4>
                                        <button

                                            className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Go to opportunities
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
                                                    <div className="flex items-first justify-between w-full ">
                                                       


                                                            <div className="w-[4.375rem] h-[4.375rem] rounded-lg flex items-center justify-center text-sm bg-emerald-400"></div>
                                                       

                                                        <div className="flex items-start justify-start gap-3">


                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M9.33333 11.6003C9.33333 12.3075 9.05238 12.9858 8.55228 13.4859C8.05219 13.986 7.37391 14.2669 6.66667 14.2669C5.95942 14.2669 5.28115 13.986 4.78105 13.4859C4.28095 12.9858 4 12.3075 4 11.6003C4 10.893 4.28095 10.2147 4.78105 9.71464C5.28115 9.21455 5.95942 8.93359 6.66667 8.93359C7.37391 8.93359 8.05219 9.21455 8.55228 9.71464C9.05238 10.2147 9.33333 10.893 9.33333 11.6003Z" stroke="#1E1E1E" strokeWidth="1.6" />
                                                                <path d="M14.6654 5.73242L9.33203 9.46576M14.6654 17.4658L9.33203 13.7324" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" />
                                                                <path d="M20.0013 18.5333C20.0013 19.2406 19.7204 19.9189 19.2203 20.419C18.7202 20.919 18.0419 21.2 17.3346 21.2C16.6274 21.2 15.9491 20.919 15.449 20.419C14.9489 19.9189 14.668 19.2406 14.668 18.5333C14.668 17.8261 14.9489 17.1478 15.449 16.6477C15.9491 16.1476 16.6274 15.8667 17.3346 15.8667C18.0419 15.8667 18.7202 16.1476 19.2203 16.6477C19.7204 17.1478 20.0013 17.8261 20.0013 18.5333ZM20.0013 4.66667C20.0013 5.37391 19.7204 6.05219 19.2203 6.55228C18.7202 7.05238 18.0419 7.33333 17.3346 7.33333C16.6274 7.33333 15.9491 7.05238 15.449 6.55228C14.9489 6.05219 14.668 5.37391 14.668 4.66667C14.668 3.95942 14.9489 3.28115 15.449 2.78105C15.9491 2.28095 16.6274 2 17.3346 2C18.0419 2 18.7202 2.28095 19.2203 2.78105C19.7204 3.28115 20.0013 3.95942 20.0013 4.66667Z" stroke="#1E1E1E" strokeWidth="1.6" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                <path d="M5.35547 9.82394C5.35547 7.29894 5.35547 6.03555 6.14029 5.25162C6.92422 4.4668 8.18761 4.4668 10.7126 4.4668H13.3912C15.9162 4.4668 17.1796 4.4668 17.9635 5.25162C18.7483 6.03555 18.7483 7.29894 18.7483 9.82394V14.2882C18.7483 16.8132 18.7483 18.0766 17.9635 18.8605C17.1796 19.6454 15.9162 19.6454 13.3912 19.6454H10.7126C8.18761 19.6454 6.92422 19.6454 6.14029 18.8605C5.35547 18.0766 5.35547 16.8132 5.35547 14.2882V9.82394Z" stroke="#1E1E1E" stroke-width="1.33929" />
                                                                <path d="M5.35631 16.9676C4.6459 16.9676 3.9646 16.6854 3.46227 16.1831C2.95994 15.6808 2.67773 14.9995 2.67773 14.2891V8.93192C2.67773 5.56496 2.67773 3.88103 3.72416 2.83549C4.77059 1.78996 6.45363 1.78906 9.82059 1.78906H13.392C14.1024 1.78906 14.7837 2.07127 15.2861 2.5736C15.7884 3.07593 16.0706 3.75723 16.0706 4.46763" stroke="#1E1E1E" stroke-width="1.33929" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="mt-2 text-gray-500 space-y-1">
                                                            <h4 className="text-sm font-medium text-gray-800">{c.title}</h4>
                                                            <div>Company: <span className="text-gray-700 text-[0.875rem]">{c.company}</span></div>
                                                            <div>Date Announced: <span className="text-gray-700 text-[0.875rem]">{c.date}</span></div>
                                                            <div>Date Announced: <span className="text-gray-700 text-[0.875rem]">{c.dateAnnounced}</span></div>
                                                            <div>Your Role: <span className="text-gray-700 text-[0.875rem]">{c.role}</span></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            )}

                    </div>

                </div>





            </main>
        </div>
    )
}

export default MyRound
