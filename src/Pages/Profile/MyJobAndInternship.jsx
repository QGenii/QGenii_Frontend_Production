import React, { useMemo, useState } from "react";

import Img1 from '../../assets/Profile/Img1.png'

import MyRound from './MyJobInternshipComponentShared/MyRound'
import Certificate from './MyJobInternshipComponentShared/Certificate'
import Registration from './MyJobInternshipComponentShared/Registration'


import { FaFlagCheckered } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { GiHammerSickle } from "react-icons/gi";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { FaRegNewspaper } from "react-icons/fa";
// import Tab from './MyOpportunities'

const SideNavItem = ({ label, active = false }) => (
    <span
        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors
      ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
        aria-current={active ? "page" : undefined}
    >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-slate-200 text-[10px]">•</span>
        <span>{label}</span>
    </span>
);

const TopRightAction = () => (
    <button
        className="inline-flex mt-[1rem] items-center  justify-center gap-[0.3125rem] px-[1.125rem] py-[0.375rem] rounded-[0.3125rem] bg-[var(--Brand-Color,#2800AE)] "
    ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="white" />
        </svg>
        <h4 className="text-[0.875rem]">    Host Jobs / Internships</h4>
    </button>
);

// internship
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

            <h4 className="mb-3 text-sm text-slate-600">No jobs and internships, apply here</h4>
            <button
                onClick={onAction}
                className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Go to jobs
            </button>

        </div>
    </div>
);

// opportunities

const itemsOpportunities = [
    { key: "all", label: "All" },
    { key: "competitions", label: "Competitions" },
    { key: "quizzes", label: "Quizzes" },
    { key: "Hackathons", label: "Hackathons" },
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






const item = [

    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <g clip-path="url(#clip0_5431_22894)">
                <path d="M0.6875 13.0625V21.3125M8.25 17.1875H11.6875C12.4168 17.1875 13.1163 17.4772 13.632 17.993C14.1478 18.5087 14.4375 19.2082 14.4375 19.9375H0.6875V14.4375H5.5C6.22935 14.4375 6.92882 14.7272 7.44454 15.243C7.96027 15.7587 8.25 16.4582 8.25 17.1875ZM8.25 17.1875H5.5M6.64583 11.6875V5.27084C6.64583 4.78461 6.83899 4.31829 7.1828 3.97447C7.52662 3.63066 7.99294 3.4375 8.47917 3.4375H19.4792C19.9654 3.4375 20.4317 3.63066 20.7755 3.97447C21.1193 4.31829 21.3125 4.78461 21.3125 5.27084V11.6875C21.3125 12.1737 21.1193 12.64 20.7755 12.9839C20.4317 13.3277 19.9654 13.5208 19.4792 13.5208H10.0833M6.64583 7.10417H21.3125M13.9792 7.10417V8.9375M16.7292 3.4375H11.2292L11.5601 1.45384C11.5957 1.23933 11.7065 1.04448 11.8726 0.904101C12.0386 0.763721 12.2492 0.686951 12.4667 0.687503H15.4917C15.7086 0.687603 15.9186 0.764668 16.0841 0.904991C16.2496 1.04531 16.3599 1.23979 16.3955 1.45384L16.7292 3.4375Z" stroke="#1E1E1E" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_5431_22894">
                    <rect width="22" height="22" fill="white" />
                </clipPath>
            </defs>
        </svg>,
        title: "My jobs / internships",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M6.87533 7.33333H19.7087C20.2587 7.33333 20.6253 6.96667 20.6253 6.41667C20.6253 5.86667 20.2587 5.5 19.7087 5.5H6.87533C6.32533 5.5 5.95866 5.86667 5.95866 6.41667C5.95866 6.96667 6.32533 7.33333 6.87533 7.33333ZM19.7087 10.0833H10.542C9.99199 10.0833 9.62533 10.45 9.62533 11C9.62533 11.55 9.99199 11.9167 10.542 11.9167H19.7087C20.2587 11.9167 20.6253 11.55 20.6253 11C20.6253 10.45 20.2587 10.0833 19.7087 10.0833ZM19.7087 14.6667H14.2087C13.6587 14.6667 13.292 15.0333 13.292 15.5833C13.292 16.1333 13.6587 16.5 14.2087 16.5H19.7087C20.2587 16.5 20.6253 16.1333 20.6253 15.5833C20.6253 15.0333 20.2587 14.6667 19.7087 14.6667ZM3.20866 5.5C2.65866 5.5 2.29199 5.86667 2.29199 6.41667C2.29199 6.96667 2.65866 7.33333 3.20866 7.33333C3.75866 7.33333 4.12533 6.96667 4.12533 6.41667C4.12533 5.86667 3.75866 5.5 3.20866 5.5ZM6.87533 10.0833C6.32533 10.0833 5.95866 10.45 5.95866 11C5.95866 11.55 6.32533 11.9167 6.87533 11.9167C7.42533 11.9167 7.79199 11.55 7.79199 11C7.79199 10.45 7.42533 10.0833 6.87533 10.0833ZM10.542 14.6667C9.99199 14.6667 9.62533 15.0333 9.62533 15.5833C9.62533 16.1333 9.99199 16.5 10.542 16.5C11.092 16.5 11.4587 16.1333 11.4587 15.5833C11.4587 15.0333 11.092 14.6667 10.542 14.6667Z" fill="#1E1E1E" />
        </svg>,
        title: "My Opportunities",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M6.41667 16.502C6.41667 17.2314 6.7064 17.9308 7.22212 18.4466C7.73785 18.9623 8.43732 19.252 9.16667 19.252C9.89601 19.252 10.5955 18.9623 11.1112 18.4466C11.6269 17.9308 11.9167 17.2314 11.9167 16.502M6.41667 16.502C6.41667 15.7727 6.7064 15.0732 7.22212 14.5575C7.73785 14.0418 8.43732 13.752 9.16667 13.752M6.41667 16.502H1.375M11.9167 16.502C11.9167 15.7727 11.6269 15.0732 11.1112 14.5575C10.5955 14.0418 9.89601 13.752 9.16667 13.752M11.9167 16.502H16.5M9.16667 13.752V5.0437M16.5 16.502C16.5 17.2271 16.5275 17.7702 16.566 18.1736C16.626 18.8143 17.2068 19.1113 17.7852 18.8281C18.2893 18.578 18.7804 18.3024 19.2564 18.0022C19.635 17.7691 20.0003 17.5151 20.3505 17.2413C20.8711 16.8274 20.8711 16.1762 20.3505 15.7627C20.0874 15.5533 19.7326 15.2998 19.256 15.0019C18.78 14.7015 18.2889 14.4257 17.7847 14.1755C17.2068 13.8923 16.6265 14.1888 16.566 14.8296C16.528 15.2334 16.5 15.7765 16.5 16.502ZM9.16667 3.83828C9.16667 3.26995 9.67542 2.85286 10.2254 2.9977C11.0307 3.2099 12.2806 3.5839 13.9228 4.21045C14.5054 4.4304 15.0809 4.66885 15.6484 4.92545C16.7585 5.43282 16.7585 6.48836 15.6484 6.99574C15.1947 7.2029 14.6286 7.44124 13.9223 7.71074C10.8652 8.8772 9.16667 9.1687 9.16667 9.1687V3.83828Z" stroke="#1E1E1E" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        title: "My rounds",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 11.6875C11 11.8698 10.9276 12.0447 10.7986 12.1736C10.6697 12.3026 10.4948 12.375 10.3125 12.375H6.1875C6.00516 12.375 5.8303 12.3026 5.70136 12.1736C5.57243 12.0447 5.5 11.8698 5.5 11.6875C5.5 11.5052 5.57243 11.3303 5.70136 11.2014C5.8303 11.0724 6.00516 11 6.1875 11H10.3125C10.4948 11 10.6697 11.0724 10.7986 11.2014C10.9276 11.3303 11 11.5052 11 11.6875ZM10.3125 8.25H6.1875C6.00516 8.25 5.8303 8.32243 5.70136 8.45136C5.57243 8.5803 5.5 8.75516 5.5 8.9375C5.5 9.11984 5.57243 9.2947 5.70136 9.42364C5.8303 9.55257 6.00516 9.625 6.1875 9.625H10.3125C10.4948 9.625 10.6697 9.55257 10.7986 9.42364C10.9276 9.2947 11 9.11984 11 8.9375C11 8.75516 10.9276 8.5803 10.7986 8.45136C10.6697 8.32243 10.4948 8.25 10.3125 8.25ZM19.9375 13.8763V19.25C19.9386 19.3712 19.9076 19.4905 19.8477 19.5959C19.7878 19.7013 19.7011 19.789 19.5964 19.85C19.4917 19.9111 19.3728 19.9434 19.2516 19.9437C19.1303 19.944 19.0112 19.9122 18.9062 19.8516L16.8438 18.6708L14.7812 19.8516C14.6763 19.9122 14.5572 19.944 14.436 19.9437C14.3147 19.9434 14.1958 19.9111 14.0911 19.85C13.9864 19.789 13.8997 19.7013 13.8398 19.5959C13.7799 19.4905 13.7489 19.3712 13.75 19.25V17.1875H3.4375C3.07283 17.1875 2.72309 17.0426 2.46523 16.7848C2.20737 16.5269 2.0625 16.1772 2.0625 15.8125V4.8125C2.0625 4.44783 2.20737 4.09809 2.46523 3.84023C2.72309 3.58237 3.07283 3.4375 3.4375 3.4375H18.5625C18.9272 3.4375 19.2769 3.58237 19.5348 3.84023C19.7926 4.09809 19.9375 4.44783 19.9375 4.8125V7.43617C20.3721 7.85235 20.718 8.3522 20.9542 8.90561C21.1905 9.45901 21.3123 10.0545 21.3123 10.6562C21.3123 11.258 21.1905 11.8535 20.9542 12.4069C20.718 12.9603 20.3721 13.4601 19.9375 13.8763ZM13.75 15.8125V13.8763C13.0008 13.1538 12.5273 12.1924 12.4113 11.1581C12.2952 10.1237 12.5438 9.08128 13.1142 8.21067C13.6847 7.34006 14.5411 6.69587 15.5358 6.38927C16.5304 6.08266 17.6009 6.13288 18.5625 6.53125V4.8125H3.4375V15.8125H13.75ZM18.5625 14.7812C18.018 15.0087 17.4338 15.1259 16.8438 15.1259C16.2537 15.1259 15.6695 15.0087 15.125 14.7812V18.0658L16.5 17.2786C16.6039 17.2192 16.7215 17.188 16.8412 17.188C16.9608 17.188 17.0784 17.2192 17.1823 17.2786L18.5573 18.0658L18.5625 14.7812ZM19.9375 10.6562C19.9375 10.0444 19.7561 9.44622 19.4161 8.93745C19.0762 8.42869 18.593 8.03216 18.0277 7.798C17.4624 7.56384 16.8403 7.50257 16.2402 7.62195C15.6401 7.74132 15.0888 8.03597 14.6561 8.46864C14.2235 8.90131 13.9288 9.45256 13.8094 10.0527C13.6901 10.6528 13.7513 11.2749 13.9855 11.8402C14.2197 12.4055 14.6162 12.8887 15.125 13.2286C15.6337 13.5686 16.2319 13.75 16.8438 13.75C17.25 13.75 17.6523 13.67 18.0277 13.5145C18.403 13.359 18.7441 13.1311 19.0314 12.8439C19.3186 12.5566 19.5465 12.2155 19.702 11.8402C19.8575 11.4648 19.9375 11.0625 19.9375 10.6562Z" fill="#1E1E1E" />
        </svg>,
        title: "Certifications",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <g clip-path="url(#clip0_5432_22901)">
                <path d="M5.16554 8.9375H16.8365M5.16554 4.8125H16.8365M2.1552 15.4688C2.1552 15.7847 2.21744 16.0976 2.33837 16.3896C2.45929 16.6815 2.63654 16.9468 2.85998 17.1702C3.08342 17.3937 3.34868 17.5709 3.64062 17.6918C3.93256 17.8128 4.24546 17.875 4.56145 17.875C4.87745 17.875 5.19035 17.8128 5.48229 17.6918C5.77423 17.5709 6.03949 17.3937 6.26293 17.1702C6.48637 16.9468 6.66361 16.6815 6.78454 16.3896C6.90546 16.0976 6.9677 15.7847 6.9677 15.4688C6.9677 14.8306 6.71419 14.2185 6.26293 13.7673C5.81167 13.316 5.19963 13.0625 4.56145 13.0625C3.92328 13.0625 3.31124 13.316 2.85998 13.7673C2.40872 14.2185 2.1552 14.8306 2.1552 15.4688ZM8.43437 21.3125C8.15412 20.5089 7.63078 19.8123 6.93691 19.3194C6.24304 18.8265 5.41302 18.5618 4.56191 18.5618C3.7108 18.5618 2.88078 18.8265 2.18691 19.3194C1.49304 19.8123 0.969704 20.5089 0.689453 21.3125H8.43437ZM15.0353 15.4688C15.0353 16.1069 15.2888 16.719 15.7401 17.1702C16.1913 17.6215 16.8034 17.875 17.4415 17.875C18.0797 17.875 18.6918 17.6215 19.143 17.1702C19.5943 16.719 19.8478 16.1069 19.8478 15.4688C19.8478 14.8306 19.5943 14.2185 19.143 13.7673C18.6918 13.316 18.0797 13.0625 17.4415 13.0625C16.8034 13.0625 16.1913 13.316 15.7401 13.7673C15.2888 14.2185 15.0353 14.8306 15.0353 15.4688ZM21.3135 21.3125C21.0333 20.5089 20.51 19.8123 19.8161 19.3194C19.1222 18.8265 18.2922 18.5618 17.4411 18.5618C16.59 18.5618 15.7599 18.8265 15.0661 19.3194C14.3722 19.8123 13.8489 20.5089 13.5686 21.3125H21.3135ZM4.81354 6.875C4.81354 8.51603 5.46543 10.0898 6.62581 11.2502C7.78619 12.4106 9.36001 13.0625 11.001 13.0625C12.6421 13.0625 14.2159 12.4106 15.3763 11.2502C16.5366 10.0898 17.1885 8.51603 17.1885 6.875C17.1885 5.23397 16.5366 3.66016 15.3763 2.49978C14.2159 1.3394 12.6421 0.6875 11.001 0.6875C9.36001 0.6875 7.78619 1.3394 6.62581 2.49978C5.46543 3.66016 4.81354 5.23397 4.81354 6.875Z" stroke="#1E1E1E" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.66545 0.832031C8.55494 4.83885 8.71832 9.09189 10.133 13.0017M12.3348 0.832031C12.8197 2.57553 13.0645 4.3777 13.0626 6.1872C13.0665 8.51086 12.6631 10.8172 11.871 13.0017" stroke="#1E1E1E" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_5432_22901">
                    <rect width="22" height="22" fill="white" />
                </clipPath>
            </defs>
        </svg>,
        title: "My Referrals",
    }, {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M13.7503 3.66797C12.7779 3.66797 11.8452 4.05428 11.1576 4.74191C10.47 5.42954 10.0837 6.36217 10.0837 7.33464C10.0837 8.3071 10.47 9.23973 11.1576 9.92736C11.8452 10.615 12.7779 11.0013 13.7503 11.0013C14.7228 11.0013 15.6554 10.615 16.343 9.92736C17.0307 9.23973 17.417 8.3071 17.417 7.33464C17.417 6.36217 17.0307 5.42954 16.343 4.74191C15.6554 4.05428 14.7228 3.66797 13.7503 3.66797ZM13.7503 5.40964C14.0031 5.40964 14.2534 5.45943 14.487 5.55617C14.7205 5.65291 14.9328 5.7947 15.1115 5.97345C15.2903 6.15221 15.4321 6.36442 15.5288 6.59797C15.6255 6.83152 15.6753 7.08184 15.6753 7.33464C15.6753 7.58743 15.6255 7.83775 15.5288 8.0713C15.4321 8.30485 15.2903 8.51706 15.1115 8.69582C14.9328 8.87457 14.7205 9.01636 14.487 9.1131C14.2534 9.20984 14.0031 9.25964 13.7503 9.25964C13.4975 9.25964 13.2472 9.20984 13.0137 9.1131C12.7801 9.01636 12.5679 8.87457 12.3891 8.69582C12.2104 8.51706 12.0686 8.30485 11.9719 8.0713C11.8751 7.83775 11.8253 7.58743 11.8253 7.33464C11.8253 6.82409 12.0281 6.33446 12.3891 5.97345C12.7502 5.61245 13.2398 5.40964 13.7503 5.40964ZM3.66699 6.41797V9.16797H0.916992V11.0013H3.66699V13.7513H5.50033V11.0013H8.25033V9.16797H5.50033V6.41797H3.66699ZM13.7503 11.918C11.3028 11.918 6.41699 13.1371 6.41699 15.5846V18.3346H21.0837V15.5846C21.0837 13.1371 16.1978 11.918 13.7503 11.918ZM13.7503 13.6596C16.4728 13.6596 19.342 14.998 19.342 15.5846V16.593H8.15866V15.5846C8.15866 14.998 11.0003 13.6596 13.7503 13.6596Z" fill="#1E1E1E" />
        </svg>,
        title: "Registeration & Application",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8.25 4.125V7.5625M8.25 8.9375V13.75M8.25 15.125V17.875M2.0625 17.1875H19.9375V13.75C19.25 13.5204 17.875 12.65 17.875 11C17.875 8.9375 19.9375 8.9375 19.9375 8.25V4.8125H2.0625V8.25C2.75 8.47962 4.125 9.35 4.125 11C4.125 13.0625 2.0625 13.0625 2.0625 13.75V17.1875Z" stroke="#1E1E1E" stroke-width="1.375" stroke-linejoin="round" />
        </svg>,
        title: "My Studying",
    },
    {
        title: <h4 className="text-[#2800AE] font-[Poppins] text-base font-normal leading-normal">Billing & Subscriptions</h4>,
    }


]

export default function JobsInternshipsDashboard() {
    const [active, setTabActive] = useState("My jobs / internships");
    // jobs and internships
    const [tab, setTab] = useState("all");
    const [date, setDate] = useState("");
    // opportunities
    const [tab2, setTab2] = useState("all");
    const [underlineActive, setUnderlineActive] = useState("Live");
    const [hover, setHover] = useState("false");
    // rounds

    // In a real app, filter data by tab & date.
    const results = useMemo(() => [], [tab, date]);



    return (
        <div className="min-h-screen bg-slate-50">
            {/* App Shell */}
            <div className=" flex w-[62.125rem] gap-6 ">
                {/* Sidebar */}
                <aside className=" flex flex-col items-center gap-[0.625rem] bg-white shadow-[-1px_4px_12px_0_rgba(40,0,174,0.10)] w-[19rem] h-[65.0625rem] px-[1.5625rem] py-[3.4375rem] shrink-0">

                    {
                        item.map((items) => (

                            <span onClick={() => {
                                setTabActive(items.title)


                            }}
                                className={`flex items-center gap-[0.625rem] p-[0.625rem]  rounded-[0.3125rem] self-stretch  w-[16.75rem] ${active === items.title ? "bg-[#DED9FF]" : "bg-white"} `}
                            >
                                {/* <div key={items.title} className="flex justify-start py-4 gap-2 items-center text-[1rem]"> */}
                                {items.icon}
                                <h4 className="text-[0.875rem]">{items.title}</h4>
                                {/* </div> */}
                            </span>


                        ))
                    }

                </aside>

                {/* Main content */}

                {
                    active === "My jobs / internships" && (
                        <main className="flex-1  ">
                            {/* Header bar */}

                            <div className=" flex justify-end bg"><TopRightAction /></div>

                            <div className="">
                                <div className=" mt-[2rem] flex justify-start items-center gap-[0.625rem] self-stretch h-[3.875rem] px-[4.875rem] py-[0.9375rem] rounded-t-[1.25rem] bg-[#4013D4]">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                        <path d="M0.8125 15.4375V25.1875M9.75 20.3125H13.8125C14.6745 20.3125 15.5011 20.6549 16.1106 21.2644C16.7201 21.8739 17.0625 22.7006 17.0625 23.5625H0.8125V17.0625H6.5C7.36195 17.0625 8.1886 17.4049 8.7981 18.0144C9.40759 18.6239 9.75 19.4506 9.75 20.3125ZM9.75 20.3125H6.5M7.85417 13.8125V6.22917C7.85417 5.65453 8.08244 5.10343 8.48877 4.69711C8.8951 4.29078 9.4462 4.0625 10.0208 4.0625H23.0208C23.5955 4.0625 24.1466 4.29078 24.5529 4.69711C24.9592 5.10343 25.1875 5.65453 25.1875 6.22917V13.8125C25.1875 14.3871 24.9592 14.9382 24.5529 15.3446C24.1466 15.7509 23.5955 15.9792 23.0208 15.9792H11.9167M7.85417 8.39584H25.1875M16.5208 8.39584V10.5625M19.7708 4.0625H13.2708L13.6619 1.71817C13.7041 1.46466 13.835 1.23439 14.0312 1.06848C14.2275 0.902579 14.4763 0.811851 14.7333 0.812503H18.3083C18.5648 0.812622 18.8128 0.903699 19.0084 1.06953C19.204 1.23537 19.3344 1.46521 19.3765 1.71817L19.7708 4.0625Z" stroke="white" stroke-width="1.625" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <h1 className="text-sm font-semibold text-white">My Jobs & Internships</h1>


                                </div>

                                <div className="w-[62.125rem] h-[36.125rem] flex-shrink-0 bg-blue-50">
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





                        </main>
                    )
                }

                {/* opportunities */}
                {
                    active === "My Opportunities" && (
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
                                        <div className="mb-4 flex items-center gap-1 mx-auto ">
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
                    )
                }

                {/* My round */}

                {
                    active === "My rounds" && (

                        <MyRound />


                    )

                }

                {/* certificate */}
                {active === "Certifications" && <Certificate />}
                {active === "Registeration & Application" && <Registration />}






            </div>
        </div>
    );
}
