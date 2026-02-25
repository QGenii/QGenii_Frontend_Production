import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  User,
  Flag,
  GraduationCap,
  Calendar,
  Wrench,
  Layout,
  BookText,
  Monitor,
  Plus,

} from "lucide-react";

const menuItems = [
  { name: "Jobs", icon: <Briefcase size={20} /> },
  { name: "Internship", icon: <User size={20} /> },
  { name: "Competition", icon: <Flag size={20} /> },
  { name: "Scholarship", icon: <GraduationCap size={20} /> },
  { name: "Cultural Events", icon: <Calendar size={20} /> },
  { name: "Workshops", icon: <Wrench size={20} /> },
  { name: "Conferences", icon: <Layout size={20} /> },
  { name: "Blogs", icon: <BookText size={20} /> },
  { name: "Teach On Qgenii", icon: <Monitor size={20} /> },
  { name: "Create Contest", icon: <Plus size={20} /> },
];

export default function Section1() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="w-full h-[500px] bg-[#fff5f5] py-[1.68rem] px-4 sm:px-6">
             {/* Toggle Button */}
      <div className="w-full   flex justify-end px-4 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-white font-medium bg-transparent border border-white/40 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z"
              fill="currentColor"
            />
          </svg>
          Host
        </button>
      </div>

      {/* Sidebar Options */}
      {isOpen && (
        <div className="absolute right-0  bg-[#F6F4FF] w-64 rounded-lg shadow-md mt-2  p-4 transition-all duration-300">
          <ul className="flex flex-col gap-3 justify-end">
            {menuItems.map((item, index) => (
             <div > <li
                key={index}
                className="flex items-center gap-3 text-gray-800 font-medium px-3 py-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                {item.icon}
                <span>{item.name}</span>
              </li></div>
            ))}
          </ul>
        </div>
      )}
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1f2a56] sm:whitespace-nowrap">
                        Learn.Code.Grow With CodeIQGenius
                    </h1>

                    <p className="text-gray-600 mt-4 text-sm md:text-base max-w-md mx-auto md:mx-0">
                        Let me know vibe you're going for professional, fun, inspiring...
                        and I can tailor it more!
                    </p>

                    {/* Email Input + Button */}
                    <div className="mt-6 flex flex-col sm:flex-row w-full sm:w-auto max-w-md mx-auto md:mx-0">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="px-4 py-3 h-[55px] w-full font-poppins font-medium text-[18px] leading-[100%] tracking-[0] capitalize bg-[#FFFFFF] shadow-[0px_1px_1px_0px_#00000040] border rounded-l-full p-2 border-gray-300 text-sm sm:w-64 focus:outline-none sm:rounded-t-none sm:rounded-l-md"
                        />
                        <button
                            className="bg-[#0C316E] text-white px-5 py-3 h-[55px] w-full text-sm font-medium hover:bg-[#0a2d74]/90  sm:w-auto rounded-r-md sm:rounded-l-none"
                            onClick={() => navigate('/home')}
                        >
                            Start Studying Today
                        </button>
                    </div>

                    <p className="text-xl font-bold text-black mt-3 px-5 flex justify-center md:justify-start items-center gap-2">
                        Or Sign Up With{" "}
                        <button className="border px-2 py-2 rounded h-[40px] w-[150px] bg-[#FFFFFF] text-[8px] flex items-center justify-center gap-1">
                            <i className="ri-google-fill text-[#0C316E] text-4xl"></i>
                            <span className="text-[20px]">Google</span>
                        </button>
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <img
                        src="public/home1.png"
                        alt="Students studying"
                        className="w-full max-w-md object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
