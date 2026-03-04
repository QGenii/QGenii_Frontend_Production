import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  { name: "Jobs", icon: <Briefcase size={18} />, url: "/coming-soon" },
  { name: "Internships", icon: <User size={18} />, url: "/coming-soon" },
  { name: "Competitions", icon: <Flag size={18} />, url: "/coming-soon" },
  { name: "Mentorships", icon: <Users size={18} />, url: "/coming-soon" },
  { name: "Scholarships", icon: <GraduationCap size={18} />, url: "/coming-soon" },
  { name: "Workshops", icon: <Wrench size={18} />, url: "/coming-soon" },
  { name: "Conferences", icon: <Layout size={18} />, url: "/coming-soon" },
];

  const handleClick = (url) => {
    window.location.href = url;
    console.log(url);

  };
  


export default function Section2() {
  const slides = [
    {
      title: "Skills That You Drive Forward",
      inputPlaceholder: "search for something",
      primaryCta: "Study Roadmaps",
      primaryLink: "/courses/allCourses?section=roadmaps",
      secondaryCta: "Try Roadmaps",
      secondaryLink: "/courses/allCourses?section=roadmaps",
      imageSrc: "/Instructor.png",
      imageAlt: "Instructor 1",
    },
    {
      title: "Study Python, Drive Your Skills",
      inputPlaceholder: "Search Python roadmaps",
      primaryCta: "Study Python",
      primaryLink: "/courses/allCourses",
      secondaryCta: "Try Python Compiler",
      secondaryLink: "/courses/allCourses",
      imageSrc: "/Instructor.png",
      imageAlt: "Instructor 2",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="bg-[#f2f2f2] w-full">
      <div className="max-w-full">
        <h2 className="text-xl font-bold px-4 md:px-8  mb-4">Top Trending</h2>

        <div className="rounded-md overflow-hidden border-2 border-blue-400 mx-0">
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-8 md:py-10 gap-8 bg-[#8c5c5c] shrink-0"
                >
                  {/* Left Content Box */}
                  <div className="bg-white p-6 rounded-md shadow-md w-[21rem] md:ml-36">
                    <h3 className="text-xl font-extrabold font-[cursive] mb-2 leading-tight">
                      {slide.title}
                    </h3>
                    <input
                      type="text"
                      placeholder={slide.inputPlaceholder}
                      className="w-full border-none text-sm text-gray-500 mb-4 mt-2 outline-none focus:ring-0"
                    />
                    <div className="flex justify-between">
                      <Link to={slide.primaryLink}>
                        <button className="bg-[#6c2bd9] hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                          {slide.primaryCta}
                        </button>
                      </Link>

                      <Link to={slide.secondaryLink}>
                        <button className="border border-[#6c2bd9] text-[#6c2bd9] hover:bg-purple-50 px-4 py-2 rounded-md text-sm font-semibold">
                          {slide.secondaryCta}
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="w-full md:w-1/2 flex items-end justify-center md:justify-end">
                    <img
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      className="max-w-[260px] w-full h-auto rounded-md object-cover"
                    />
                  </div>
                </div>
              ))}
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
            className="flex items-center gap-2 border border-white/50 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-500"
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