import React from 'react'
import { useState, useMemo } from 'react';
import Img1 from '../../../assets/Profile/Img1.png'
const Tabs = ({ value, onChange }) => {

    const items = [
        { key: "all", label: "All" },
        { key: "jobs", label: "Jobs" },
        { key: "internships", label: "Internships" },
    ];


    return (
        <div className="mb-4 flex items-center gap-2">
            {items.map((t) => (
                <span
                    key={t.key}
                    onClick={() => onChange(t.key)}
                    className={`rounded-full px-[2.5rem] py-[0.625rem] text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${value === t.key ? "bg-[#2800AE] text-white" : "bg-white border  "}`}
                    role="tab"
                    aria-selected={value === t.key}
                >
                    {t.label}
                </span>
            ))}
        </div>
    );
};

const TopRightAction = () => (
    <button
        className="inline-flex mt-[1rem] items-center  justify-center gap-[0.3125rem] px-[1.125rem] py-[0.375rem] rounded-[0.3125rem] bg-[var(--Brand-Color,#2800AE)] "
    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" />
        </svg>
        <h4 className="text-[0.875rem]">    Host Jobs / Internships</h4>
    </button>
);

const DateFilter = ({ value, onChange }) => (
    <label className="ml-auto inline-flex items-center gap-2 text-xs text-slate-600">
        <span className="hidden sm:inline">Filter by date</span>
        <input
            type="date"
            className="rounded-md border border-slate-200 px-2 py-1 text-xs shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </label>
);

const EmptyState = ({ onAction }) => (
    <div className=" flex justify-center items-center">
        <div className="flex w-[55.24rem] h-[24.4rem] flex-col items-center justify-center bg-white gap-[0.46875rem] self-stretch  py-[0.46875rem] px-0 rounded-[0.3125rem] ">
            {/* Simple illustration */}
            <img src={Img1} alt="" className="w-[13.875rem] h-[13.875rem] shrink-0 aspect-square" />

            <h4 className="mb-3 text-sm text-slate-600">No opportunities listed here</h4>
            <button
                onClick={onAction}
                className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Go to jobs
            </button>

        </div>
    </div>
);

const MyJobAndInternship = () => {
    const [tab, setTab] = useState("all");
    const [date, setDate] = useState("");

    // In a real app, filter data by tab & date.
    const results = useMemo(() => [], [tab, date]);
    return (
        <div>
            
            <main className="flex flex-col w-full gap-4 bg-white">
            {/* Header bar */}

            <div className="  flex justify-end bg-white"><TopRightAction /></div>

            <div className="">
                <div className=" flex justify-start items-center gap-[0.625rem] self-stretch h-[3.875rem] px-[4.875rem] py-[0.9375rem] rounded-t-[1.25rem] bg-[#4013D4]">

                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <path d="M0.8125 15.4375V25.1875M9.75 20.3125H13.8125C14.6745 20.3125 15.5011 20.6549 16.1106 21.2644C16.7201 21.8739 17.0625 22.7006 17.0625 23.5625H0.8125V17.0625H6.5C7.36195 17.0625 8.1886 17.4049 8.7981 18.0144C9.40759 18.6239 9.75 19.4506 9.75 20.3125ZM9.75 20.3125H6.5M7.85417 13.8125V6.22917C7.85417 5.65453 8.08244 5.10343 8.48877 4.69711C8.8951 4.29078 9.4462 4.0625 10.0208 4.0625H23.0208C23.5955 4.0625 24.1466 4.29078 24.5529 4.69711C24.9592 5.10343 25.1875 5.65453 25.1875 6.22917V13.8125C25.1875 14.3871 24.9592 14.9382 24.5529 15.3446C24.1466 15.7509 23.5955 15.9792 23.0208 15.9792H11.9167M7.85417 8.39584H25.1875M16.5208 8.39584V10.5625M19.7708 4.0625H13.2708L13.6619 1.71817C13.7041 1.46466 13.835 1.23439 14.0312 1.06848C14.2275 0.902579 14.4763 0.811851 14.7333 0.812503H18.3083C18.5648 0.812622 18.8128 0.903699 19.0084 1.06953C19.204 1.23537 19.3344 1.46521 19.3765 1.71817L19.7708 4.0625Z" stroke="white" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h1 className="text-sm font-semibold text-white">My Jobs & Internships</h1>


                </div>

                <div className="w-[64.125rem] h-[36.125rem] flex-shrink-0 bg-blue-50">
                    {/* Controls */}
                    <div className="px-[2rem] py-[1rem] flex items-center gap-3  w-[55.5rem] mx-auto">
                        <Tabs value={tab} onChange={setTab} />
                        <DateFilter value={date} onChange={setDate} />
                    </div>
                    <hr className="w-[55.125rem] h-[0.0625rem] bg-[rgba(134,134,161,0.29)] border-[#1E1E1E]  mb-3 mx-auto" />

                    {/* Results area */}
                    <section className=" ">
                        {results.length === 0 ? (
                            <EmptyState onAction={() => alert("Navigate to Jobs page")} />
                        ) : (
                            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Example cards if there were results */}
                            </ul>
                        )}
                    </section>
                </div>

            </div>





        </main></div>
    )
}

export default MyJobAndInternship