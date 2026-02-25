import React, { useMemo, useState,useEffect,useRef       } from "react";
import { Search, ChevronDown } from "lucide-react";
import Img1 from '../../../assets/Profile/Img1.png'
/**
 * Evaluate Candidates — Opportunities/Assessment page
 * TailwindCSS required. No external UI kit.
 */
export default function EvaluateCandidates() {
  const [tab, setTab] = useState("Opportunities");
  const [selectedType, setSelectedType] = useState("All");
  const [query, setQuery] = useState("");
  const [evaluation, setEvaluation] = useState("Evaluation");
  const [status, setStatus] = useState("Status");



  

  const types = useMemo(
    () => [
      "All",
      "Competitions",
      "Quizzes",
      "Hackathons",
      "Scholarships",
      "Workshops",
      "Conferences",
      "Creative Events",
      "Jobs",
      "Internships",
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Evaluate Candidates</h1>

        {/* Top Tabs */}
        <div className="mt-4 flex gap-6 text-sm">
          {(["Opportunities", "Assessment"] ).map((t) => (
            <span
              key={t}
              className={
                "relative pb-2 font-medium transition " +
                (tab === t
                  ? "text-slate-900 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-indigo-600"
                  : "text-slate-500 hover:text-slate-700")
              }
              onClick={() => setTab(t)}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {types.map((t) => (
            <span
              key={t}
              onClick={() => setSelectedType(t)}
              className={
                "rounded-full border px-4 py-2 text-sm transition shadow-sm " +
                (selectedType === t
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")
              }
            >
              {t}
            </span>
          ))}
        </div>

        {/* Search & dropdown row */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="md:col-span-7">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Opportunity"
                className="w-full rounded-full border border-slate-300 bg-white px-10 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Right dropdowns */}
          <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-3">
            <DropdownPill value={evaluation} onChange={setEvaluation} options={["Evaluation", "Pending", "Completed", ]} />
            <DropdownPill value={status} onChange={setStatus} options={["Status", "Live", "Draft","under moderation","Rejected","Need Review","Completed","Expired","Upcoming"] } />
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-12 px-5 py-3 text-xs font-medium text-slate-500 border-b border-slate-200">
            <div className="col-span-1">S.NO</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Owner</div>
            <div className="col-span-3">Assigned Candidate</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
          <img src={Img1} alt="" className="w-[13.875rem] h-[13.875rem]" />
            <p className="mt-3 font-medium text-slate-800">No data available</p>
            <p className="text-sm text-slate-500">No Recently listed opportunity found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



function DropdownPill({ value, onChange, options }) {

    
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
        
      <span
        type="span"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
      >
       
        {value}
        <ChevronDown className="h-4 w-4" />
      </span>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <ul className="max-h-64 overflow-auto py-1 text-sm">
            {options.map((opt) => (
              <li key={opt}>
                <span
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="w-full flex gap-2 text-left px-4 py-2 hover:bg-slate-50"
                >
                    <input type="checkbox" />
                  <h4>{opt}</h4>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


