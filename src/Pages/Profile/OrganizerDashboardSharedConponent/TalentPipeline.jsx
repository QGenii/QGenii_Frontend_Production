import React, { useState } from "react";
import Img from "../../../assets/Profile/Img1.png"; // replace with your illustration
import {FilterDropdown} from "./TalentPipeline/FilterDropDown";

const TalentPipeline = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Last 7 days");

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Talent Pipeline</h1>
        <p className="text-sm text-slate-500">
          All the candidates who have engaged with your opportunities will be listed below.
        </p>
      </div>

      {/* Search + Filter Row */}
      <div className="w-full max-w-5xl flex flex-col justify-between sm:flex-row items-center gap-3 mb-8 ">
        {/* Search bar */}
        <div className="flex w-[37.4rem] items-center  border border-slate-300 rounded-full bg-white px-4 py-2 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-400 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-3.5-3.5" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name, Email, Number & Organization"
            className="w-[37.5rem] text-[0.652rem] text-slate-700 placeholder-slate-400 outline-none"
          />
        </div>

        {/* Dropdown */}
        {/* <div className="relative">

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none border border-slate-300 bg-white text-sm text-slate-700 rounded-full px-4 py-2 pr-8 shadow-sm cursor-pointer"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            ▼
          </span>
        </div> */}

        <FilterDropdown value={filter} onChange={setFilter} />
      </div>

      {/* Empty state card */}
      <div className="w-[59rem] h-[23.68rem]  bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-16">
        <img src={Img} alt="Empty state" className="h-32 w-32 mb-4" />
        <h4 className="text-slate-700 text-sm font-medium mb-1">
          No candidates registered yet!
        </h4>
        <p className="text-xs text-slate-500">
          Once candidates register, their details will be visible here.
        </p>
      </div>
    </div>
  );
};

export default TalentPipeline;
