import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to generate URL slug from roadmap title
const generateRoadmapSlug = (title) => {
  if (title.includes('Python')) {
    return 'pythonroadmap';
  } else if (title.includes('C++')) {
    return 'cplusroadmap';
  } else if (title.includes('Java')) {
    return 'javaroadmap';
  } else if (title.includes('C language') || title.includes('C Language')) {
    return 'croadmap';
  } else if (title.includes('SQL')) {
    return 'sqlroadmap';
  } else if (title.includes('Frontend') || title.includes('HTML/CSS/JS')) {
    return 'frontendroadmap';
  }
  // Default: convert to lowercase, replace spaces and special chars
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/withbeginnedsa/g, 'roadmap');
};

// Unique roadmaps array - removed duplicates
const roadmaps = [
  {
    title: 'Python with Beginner DSA',
    courses: 8,
    learners: '471.0k',
    description:
      'Learn the basics of Python and data structures. Use practical modules to boost your coding and logic.',
    color: 'from-yellow-200 via-orange-300 to-pink-300',
    icon: 'https://img.icons8.com/color/48/000000/python.png',
  },
  {
    title: 'C++ with Beginner DSA',
    courses: 6,
    learners: '422.4k',
    description:
      'Learn core C++ programming concepts with a focus on problem-solving and data structure practice.',
    color: 'from-blue-100 via-blue-300 to-blue-500',
    icon: 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png',
  },
  {
    title: 'Java with Beginner DSA',
    courses: 6,
    learners: '359.4k',
    description:
      'Master core Java programming focused on data structures and algorithms. Sharpen your skills with challenges.',
    color: 'from-orange-200 via-orange-300 to-orange-400',
    icon: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png',
  },
  {
    title: 'C language with Beginner DSA',
    courses: 7,
    learners: '257.9k',
    description:
      'Learn the essentials of C programming concepts. Enhance your skills with 600+ targeted coding problems.',
    color: 'from-indigo-100 via-indigo-300 to-indigo-500',
    icon: 'https://img.icons8.com/ios-filled/50/000000/c.png',
  },
  {
    title: 'SQL Roadmap for Data Analytics',
    courses: 6,
    learners: '410.9k',
    description:
      'Learn SQL to analyze and manipulate large data with our real-world case studies-based practical roadmap.',
    color: 'from-green-200 via-green-400 to-green-500',
    icon: 'https://img.icons8.com/color/48/000000/sql.png',
  },
  {
    title: 'Frontend Roadmap using HTML/CSS/JS',
    courses: 5,
    learners: '344.6k',
    description:
      'Master front-end web development with our HTML, CSS, and JS roadmap. Start with HTML and CSS basics.',
    color: 'from-orange-200 via-orange-300 to-pink-400',
    icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png',
  },
];

export default function RoadMaps() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">All Roadmaps</h1>
      <p className="text-gray-600 mb-6 text-base max-w-2xl">
        Gain expertise in programming concepts with our guided roadmaps. Our
        comprehensive, step-by-step courses make learning easy and help you become job-ready.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {roadmaps.map((item, index) => {
          const roadmapSlug = generateRoadmapSlug(item.title);
          return (
          <div
            key={index}
            className="relative w-[280px] h-[290px] bg-white rounded-[5px] border border-[#9B51E0] shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={() => {navigate(`/roadmaps/${roadmapSlug}`)}}
          >
            {/* Gradient Header */}
            <div className={`bg-gradient-to-r ${item.color} h-[60px] `}></div>

            {/* Floating Icon */}
            <div className="absolute top-[45px] left-4">
              <div className="bg-white p-2 rounded-xl shadow-md w-[48px] h-[48px] flex items-center justify-center">
                <img
                  src={item.icon}
                  alt="icon"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            

            {/* Content */}
            <div className="pt-10 px-4 text-left">
              <h3 className="font-semibold text-base text-gray-900 mb-1">
                {item.title}
              </h3>

              {/* Stats: Courses + Learners in one line */}
              <div className="flex items-center text-[13px] text-gray-500 font-medium mb-2 text-[#868686]">
                <span>{item.courses} Courses</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>{item.learners} learners</span>
              </div>

              <br/>

              {/* Description */}
              <p className="text-[13px] text-gray-600 leading-snug">
                {item.description.length > 100
                  ? item.description.slice(0, 90) + '...'
                  : item.description}
              </p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
