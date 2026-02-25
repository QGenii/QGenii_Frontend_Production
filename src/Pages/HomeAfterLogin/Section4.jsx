import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function Section4() {
  const categories = [
    'Data Science', 'IT Certificate', 'Leadership', 'Web Development',
    'Communication', 'Business Analytics & Intelligence', 'Programming Bootcamps'
  ];

  const subcategoryMap = {
    'Data Science': [
      'Chatgpt', 'Data Science', 'Python', 'Machine Learning', 'Deep Learning',
      'Artificial Intelligence', 'Statistics', 'Networking', 'Prompt Engineering', 'Robotics'
    ],
    'IT Certificate': ['CompTIA', 'AWS', 'Azure', 'Google Cloud', 'ITIL'],
    'Leadership': ['Team Building', 'Decision Making', 'Strategic Thinking'],
    'Web Development': ['React', 'Vue.js', 'Angular', 'Next.js', 'Tailwind'],
    'Communication': ['Public Speaking', 'Email Writing', 'Negotiation'],
    'Business Analytics & Intelligence': ['Excel', 'Tableau', 'Power BI'],
    'Programming Bootcamps': ['Full Stack', 'Frontend', 'Backend', 'DSA'],
  };

  const generateCourses = (base) =>
    Array.from({ length: 10 }, (_, i) => `${base} Course ${i + 1}`);

  const courseMap = {
    'Data Science': generateCourses('Data Science'),
    'IT Certificate': generateCourses('IT Cert'),
    'Leadership': generateCourses('Leadership'),
    'Web Development': generateCourses('Web Dev'),
    'Communication': generateCourses('Comm'),
    'Business Analytics & Intelligence': generateCourses('Analytics'),
    'Programming Bootcamps': generateCourses('Bootcamp'),
  };

  const [selectedCategory, setSelectedCategory] = useState('Data Science');

  return (
    <div>
      {/* Skill Highlight Section */}
      <div className="w-full mt-16 px-4 sm:px-6 md:px-8 bg-[#f2f2f2]">
        <div className="max-w-4xl text-left bg-[#f2f2f2]">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your One-Stop Destination For All Skills
          </h2>
          <p className="text-base text-gray-600">
            From critical skills to technical topics CODE IQ GENIUS supports your professional development
          </p>
        </div>
      </div>
      <br/><br/>
    <div className="bg-[#fdf1f5] py-10 font-sans">
      {/* Changed from max-w-7xl mx-auto to full width */}
      <div className="w-full px-6">

        

        {/* Category Tabs */}
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap gap-6 text-sm font-medium text-gray-700 mb-4 w-max">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`relative pb-2 transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'text-black font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black'
                    : 'hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        <div className="overflow-x-auto mb-10">
          <div className="flex flex-nowrap gap-3 mt-4 w-max">
            {subcategoryMap[selectedCategory]?.map((sub, index) => (
              <span
                key={index}
                className="px-4 py-1.5 text-sm rounded-full bg-[#dce0f2] text-gray-700 hover:bg-[#c9cee2] cursor-pointer transition whitespace-nowrap"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

       
        <div className="overflow-x-auto  cursor-pointer">
          <div className="flex space-x-4 w-max pb-4  " onClick={() => (window.location.href = 'https://codeiqgenius-frontend-nitesh.vercel.app/course-detail')}>
            {courseMap[selectedCategory]?.map((courseName, index) => (
              <div
                key={index}
                className="bg-[#0C316E] text-white p-4 rounded-lg w-60 shrink-0 shadow-md"
              >
                <div className="bg-white rounded-md h-20 sm:h-24 md:h-28 mb-4"></div>
                <p className="text-xs sm:text-sm mb-2 break-words whitespace-normal leading-snug">
                  {courseName}: Learn from scratch with hands-on lessons and real-world examples.
                </p>
                <div className="flex items-center text-xs sm:text-sm mb-1">
                  <FaStar className="text-yellow-400 mr-1" /> 4.{(index % 5) + 1}
                  <span className="ml-1 text-gray-300">| {index * 10 + 100} reviews</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span>${499 + index * 10}</span>
                  <span>({index * 50 + 100})</span>
                  <span>${2999 - index * 100}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
