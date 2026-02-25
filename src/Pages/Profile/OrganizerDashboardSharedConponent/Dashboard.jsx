import React, { useState } from "react";
import { Users, Briefcase, Rocket, ClipboardList, Bell, CalendarDays, Search } from "lucide-react";
import Img1 from '../../../assets/Profile/Img1.png'
/**
 * Simple dashboard UI inspired by the provided mockup.
 * TailwindCSS required. No external UI kit needed.
 */
export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("alerts");

    const cards = [
        {
            label: "Total Candidates",
            value: 0,
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_5496_23697)">
                    <path d="M5.5 4.75H9.75C9.75 4.75 10.5 4.75 10.5 5.5V11.25C10.5 11.25 10.5 12 9.75 12H5.5C5.5 12 4.75 12 4.75 11.25V5.5C4.75 5.5 4.75 4.75 5.5 4.75ZM5.5 15H9.75C9.75 15 10.5 15 10.5 15.75V18.5C10.5 18.5 10.5 19.25 9.75 19.25H5.5C5.5 19.25 4.75 19.25 4.75 18.5V15.75C4.75 15.75 4.75 15 5.5 15ZM14.25 12H18.5C18.5 12 19.25 12 19.25 12.75V18.5C19.25 18.5 19.25 19.25 18.5 19.25H14.25C14.25 19.25 13.5 19.25 13.5 18.5V12.75C13.5 12.75 13.5 12 14.25 12ZM14.25 4.75H18.5C18.5 4.75 19.25 4.75 19.25 5.5V8.25C19.25 8.25 19.25 9 18.5 9H14.25C14.25 9 13.5 9 13.5 8.25V5.5C13.5 5.5 13.5 4.75 14.25 4.75Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.25 0.75H21.75C21.75 0.75 23.25 0.75 23.25 2.25V21.75C23.25 21.75 23.25 23.25 21.75 23.25H2.25C2.25 23.25 0.75 23.25 0.75 21.75V2.25C0.75 2.25 0.75 0.75 2.25 0.75Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_5496_23697">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>),

            color: '#CEFFDD',

        },
        {
            label: "Active Jobs & Internships",
            value: 0,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                <g clip-path="url(#clip0_5496_23822)">
                    <path d="M6.32739 7.23521C8.32448 7.23521 9.94304 5.61664 9.94304 3.61956C9.94304 1.62248 8.32448 0.00390625 6.32739 0.00390625C4.33031 0.00390625 2.71174 1.62248 2.71174 3.61956C2.71174 5.61664 4.33031 7.23521 6.32739 7.23521ZM8.85835 8.13912H8.38662C7.75953 8.42725 7.06182 8.59108 6.32739 8.59108C5.59296 8.59108 4.89808 8.42725 4.26817 8.13912H3.79644C1.70049 8.13912 0 9.83961 0 11.9356V13.1106C0 13.8592 0.607317 14.4665 1.35587 14.4665H11.2989C12.0475 14.4665 12.6548 13.8592 12.6548 13.1106V11.9356C12.6548 9.83961 10.9543 8.13912 8.85835 8.13912Z" fill="#362409" />
                </g>
                <defs>
                    <clipPath id="clip0_5496_23822">
                        <rect width="12.6548" height="14.4626" fill="white" />
                    </clipPath>
                </defs>
            </svg>,
            color: '#FFD697'

        },
        {
            label: "Active Opportunities",
            value: 0,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                <g clip-path="url(#clip0_5496_23822)">
                    <path d="M6.32739 7.23521C8.32448 7.23521 9.94304 5.61664 9.94304 3.61956C9.94304 1.62248 8.32448 0.00390625 6.32739 0.00390625C4.33031 0.00390625 2.71174 1.62248 2.71174 3.61956C2.71174 5.61664 4.33031 7.23521 6.32739 7.23521ZM8.85835 8.13912H8.38662C7.75953 8.42725 7.06182 8.59108 6.32739 8.59108C5.59296 8.59108 4.89808 8.42725 4.26817 8.13912H3.79644C1.70049 8.13912 0 9.83961 0 11.9356V13.1106C0 13.8592 0.607317 14.4665 1.35587 14.4665H11.2989C12.0475 14.4665 12.6548 13.8592 12.6548 13.1106V11.9356C12.6548 9.83961 10.9543 8.13912 8.85835 8.13912Z" fill="#362409" />
                </g>
                <defs>
                    <clipPath id="clip0_5496_23822">
                        <rect width="12.6548" height="14.4626" fill="white" />
                    </clipPath>
                </defs>
            </svg>,
            color: '#97D7FF'

        },
        {
            label: "Active Assessments",
            value: 0,
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15" fill="none">
                <g clip-path="url(#clip0_5496_23822)">
                    <path d="M6.32739 7.23521C8.32448 7.23521 9.94304 5.61664 9.94304 3.61956C9.94304 1.62248 8.32448 0.00390625 6.32739 0.00390625C4.33031 0.00390625 2.71174 1.62248 2.71174 3.61956C2.71174 5.61664 4.33031 7.23521 6.32739 7.23521ZM8.85835 8.13912H8.38662C7.75953 8.42725 7.06182 8.59108 6.32739 8.59108C5.59296 8.59108 4.89808 8.42725 4.26817 8.13912H3.79644C1.70049 8.13912 0 9.83961 0 11.9356V13.1106C0 13.8592 0.607317 14.4665 1.35587 14.4665H11.2989C12.0475 14.4665 12.6548 13.8592 12.6548 13.1106V11.9356C12.6548 9.83961 10.9543 8.13912 8.85835 8.13912Z" fill="#362409" />
                </g>
                <defs>
                    <clipPath id="clip0_5496_23822">
                        <rect width="12.6548" height="14.4626" fill="white" />
                    </clipPath>
                </defs>
            </svg>,
            color: "#B697FF"

        },
    ];

    return (
        <div className="min-h-screen w-full bg-slate-50">
            {/* Top bar */}
            <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <h1 className="text-slate-900 text-xl sm:text-2xl font-semibold">Welcome Back, <span className="text-slate-700 font-normal">User Name</span></h1>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-violet-700 hover:bg-violet-100 transition">

                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" />
                        </svg></span>
                        Host
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* Stat cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cards.map((item, i) => (
                        <div className={`rounded-2xl border bg-white shadow-sm  border-opacity-60`} key={i}>
                            <div className="">
                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex items-center justify-center gap-2 w-full py-1"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <div>{item.icon}</div>
                                        <h4 className="text-[0.875rem] font-medium text-center">{item.label}</h4>
                                    </div>

                                </div>



                                <div className="flex flex-col gap-2  px-2">

                                    <div className="pt-2 pb-1 text-center">
                                        <p className="text-3xl font-semibold leading-none text-slate-900">{item.value}</p>
                                    </div>

                                    <div className="space-x-1 text-[0.75rem]">
                                        <span className="font-medium  text-slate-600">Total:</span>
                                        <span>0</span>
                                    </div>
                                    <div className=" text-[0.75rem] space-x-1">
                                        <span className="font-medium text-slate-600">Registrations:</span>
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="px-5  border-b border-slate-100">
                    <h2 className="text-slate-900 font-semibold">Recent Listings</h2>
                </div>
                {/* Bottom grid */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Recent Listings */}

                    <div className="lg:col-span-7">
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="p-8">
                                <EmptyListings />
                            </div>
                        </div>
                    </div>

                    {/* Alerts / Upcoming */}
                    <div className="lg:col-span-5">
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm h-full flex flex-col">
                            <div className="px-5 pt-4">
                                <div className="flex gap-[4rem] w-full ">
                                    <Tab
                                        active={activeTab === "alerts"}
                                        onClick={() => setActiveTab("alerts")}
                                        icon={Bell}
                                    >
                                        Alerts
                                    </Tab>
                                    <Tab
                                        active={activeTab === "upcoming"}
                                        onClick={() => setActiveTab("upcoming")}
                                        icon={CalendarDays}
                                    >
                                        Upcoming
                                    </Tab>
                                </div>
                            </div>

                            <div className="px-5 pb-5">
                                <div className="h-px bg-slate-200" />
                            </div>

                            <div className="px-6 pb-8 grow flex items-center justify-center text-center">
                                <div className="space-y-2">
                                    <p className="font-semibold text-slate-800">You are all Caught Up!!!</p>
                                    <p className="text-slate-500 text-sm">No pending actions right now.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}



function Tab({ active, onClick, children }) {
    return (
        <span
            onClick={onClick}
            className={`relative inline-flex items-center gap-2 px-1 pb-2 text-sm font-medium transition focus:outline-none ${active ? "text-[#1E1E1E]" : "text-slate-500 hover:text-slate-700"
                }`}
        >

            {children}
            {active && (
                <span className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-indigo-600 rounded-full" />
            )}
        </span>
    );
}

function EmptyListings() {
    return (
        <div className="flex flex-col items-center text-center gap-[0.6rem]]">

            <img src={Img1} alt="" className="w-[13.875rem] h-[13.875rem]" />
            <h4 className="mt-2 font-medium text-slate-800">No data available</h4>
            <h4 className="text-sm text-slate-500">No Recently listed opportunity found.</h4>
        </div>
    );
}
