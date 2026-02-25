import React from 'react';

import { Briefcase, User, Flag, Users, GraduationCap, Calendar, Wrench, Layout } from "lucide-react";

// const categories = [
//   { name: "Jobs", icon: <Briefcase size={18} /> },
  
//   { name: "Internships", icon: <User size={18} /> },
//   { name: "Competitions", icon: <Flag size={18} /> },
//   { name: "Mentorships", icon: <Users size={18} /> },
//   { name: "Scholarships", icon: <GraduationCap size={18} /> },
//   { name: "Cultural Events", icon: <Calendar size={18} /> },
//   { name: "Workshops", icon: <Wrench size={18} /> },
//   { name: "Conferences", icon: <Layout size={18} /> },
// ];

// import { Briefcase, User, Flag, Users, GraduationCap, Calendar, Wrench, Layout } from "lucide-react";

const categories = [
  { name: "Jobs", icon: <Briefcase size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/jobs" },
  { name: "Internships", icon: <User size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/internships" },
  { name: "Competitions", icon: <Flag size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/competition" },
  { name: "Mentorships", icon: <Users size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/mentorships" },
  { name: "Scholarships", icon: <GraduationCap size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/scholarships" },
  { name: "Cultural Events", icon: <Calendar size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/cultural" },
  { name: "Workshops", icon: <Wrench size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/workshops" },
  { name: "Conferences", icon: <Layout size={18} />, url: "https://codeiqgenius-frontend-nitesh.vercel.app/conference" },
];

  const handleClick = (url) => {
    window.location.href = url;
    console.log(url);

  };
  


export default function Section2() {
  return (
    <div className="bg-[#f2f2f2] w-full">
      <div className="max-w-full">
        <h2 className="text-xl font-bold px-4 md:px-8  mb-4">Top Trending</h2>

        <div className="rounded-md overflow-hidden border-2 border-blue-400 mx-0">
          <div className="bg-[#8c5c5c] flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-8 md:py-10 gap-8 w-full">

            {/* Left Content Box */}
            <div className="bg-white p-6 rounded-md shadow-md w-[21rem] md:ml-36">
              <h3 className="text-xl font-extrabold font-[cursive] mb-2 leading-tight">
                Skills That You Drive Forward
              </h3>
              <input
                type="text"
                placeholder="search for something"
                className="w-full border-none text-sm text-gray-500 mb-4 mt-2 outline-none focus:ring-0"
              />
              <div className="flex justify-between">
                <button className="bg-[#6c2bd9] hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                  Study Python
                </button>
                <button className="border border-[#6c2bd9] text-[#6c2bd9] hover:bg-purple-50 px-4 py-2 rounded-md text-sm font-semibold">
                  Try Python
                </button>
              </div>
            </div>

            {/* Image Container - Modified */}
            <div className="md:w-1/2 flex items-end justify-center md:justify-end">
              <img
                src="/Instructor.png"
                alt="Instructor"
                className="max-w-[260px] w-full h-auto rounded-md object-cover "
              />
            </div>

          </div>
        </div>
      </div>


 {/* <div className="w-full overflow-x-auto bg-[linear-gradient(91deg,var(--Brand-Color,#2800AE)_3.96%,#175ED4_100.37%)] py-3 mt-[3rem]">
      <div className="flex gap-3 px-4 min-w-max items-center justify-between" >

        {categories.map((item, index) => (
          // button
          <span
            key={index}
            className="flex items-center gap-2 border border-white/50 text-white px-4 py-2 rounded-full  "
          >
            {item.icon}
            <span className="whitespace-nowrap font-medium text-sm">{item.name}</span>
          </span>
        ))}
      </div>
    </div> */}
      <div className="w-full overflow-x-auto bg-[linear-gradient(91deg,var(--Brand-Color,#2800AE)_3.96%,#175ED4_100.37%)] py-3 mt-[3rem]">
      <div className="flex gap-3 px-4 min-w-max items-center justify-between">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item.url)}
            className="flex items-center gap-2 border border-white/50 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            {item.icon}
            <span className="whitespace-nowrap font-medium text-sm">{item.name}</span>
          </button>
        ))}
      </div>
    </div>


    </div>
  );
} 