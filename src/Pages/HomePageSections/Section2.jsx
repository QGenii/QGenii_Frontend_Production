import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, User, Flag, Users, GraduationCap, Calendar, Wrench, Layout } from "lucide-react";

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
    const navigate = useNavigate();
    const courses = [
        {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            title: 'Python',
            description: 'Learn Python programming from scratch with interactive lessons, real-world projects, and beginner-friendly guidance.',
            rating: 4.0,
            learners: '230.5k',
        },
        {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
            title: 'Java',
            description: 'Learn Java programming from basics to advanced with hands-on projects, interactive lessons, and real-world applications.',
            rating: 4.0,
            learners: '230.5k',
        },
        {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
            title: 'C++',
            description: 'Learn C++ programming from basics to advanced with hands-on projects, interactive lessons, and real-world applications.',
            rating: 4.0,
            learners: '230.5k',
        },
        {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
            title: 'C',
            description: 'Learn C programming from basics to advanced with hands-on projects, interactive lessons, and real-world applications.',
            rating: 4.0,
            learners: '230.5k',
        },
        {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            title: 'JavaScript',
            description: 'Learn JavaScript programming from basics to advanced with hands-on projects,and real-world applications.',
            rating: 4.0,
            learners: '230.5k',
        },
    ];

    const coursesData = [
        {
            section: 'Skill Check Test',
            courses: courses,
        }
    ];

    return (
        <div className="flex flex-col items-start justify-center gap-8  py-4 ">
            {/* <div className="w-full  bg-[linear-gradient(91deg,var(--Brand-Color,#2800AE)_3.96%,#175ED4_100.37%)] py-3 mt-[3rem] ">

      <div className="flex gap-3 px-4  items-center justify-between w-full">

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


    <div className='sm:px-6 md:px-8  m-auto'>
            {/* Top Section */}
            <div className="text-left flex flex-col items-start max-w-md mb-6">
                <img src="/home2.png" alt="Study to Code" className="w-28 sm:w-36 md:w-44 mb-4" />
                <h2 className="text-[1.5rem] font-semibold">Study To Code</h2>
            </div>

            {/* First Scrollable Course Section */}
            <div className="w-full  py-0 flex flex-col bg-white mb-[2rem]">
                <div className="overflow-x-auto  ">
                    <div className="flex gap-4 sm:gap-6 flex-nowrap min-w-max  md:justify-center">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="relative bg-white border-[2px] border-[#5B2EFF] rounded-xl shadow-md w-60 p-4 flex flex-col items-center text-center flex-shrink-0"
                            >
                                {/* Beginner Badge */}
                                <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold rounded shadow-sm">
                                    Beginner
                                </div>

                                {/* Icon */}
                                <img src={course.icon} alt={course.title} className="w-12 h-12 mb-4 mr-35" />

                                <p className="text-sm text-gray-800 mb-4 text-left w-full">{course.description}</p>

                                <div className="flex justify-between items-center text-xs text-gray-600 mb-4 w-full px-1">
                                    <div className="flex items-center gap-1">
                                        <span>4.0</span>
                                        <span className="text-[#5B2EFF]">★</span>
                                    </div>
                                    <span>{course.learners} Learners</span>
                                </div>

                                {/* View Button */}
                                <button className="border-2 [border-color:#5B2EFF] [color:#5B2EFF] rounded-md px-10 py-2 text-sm font-semibold hover:bg-purple-50 transition" onClick={() => navigate('/coursecatalog/learnpython')}>
                                    view this course
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Scrollable Sections */}
            {coursesData.map((section, index) => (
                <div key={index} className="w-full px-6 py-0  bg-white">
                    <h2 className="text-[1.5rem] font-semibold  mb-6">
                        {section.section}
                    </h2>
                    <div className="overflow-x-auto pl-5">
                        <div className="flex gap-4 sm:gap-6 flex-nowrap min-w-max  md:justify-center">
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white border-[2px] border-[#5B2EFF] rounded-xl shadow-md w-60 p-4 flex flex-col items-center text-center flex-shrink-0"
                                >
                                    {/* Beginner Badge */}
                                    <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold rounded shadow-sm">
                                        Beginner
                                    </div>

                                    {/* Icon */}
                                    <img src={course.icon} alt={course.title} className="w-12 h-12 mb-4 mr-35" />

                                    <p className="text-sm text-gray-800 mb-4 text-left w-full">{course.description}</p>

                                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4 w-full px-1">
                                        <div className="flex items-center gap-1">
                                            <span>4.0</span>
                                            <span className="text-[#5B2EFF]">★</span>
                                        </div>
                                        <span>{course.learners} Learners</span>
                                    </div>

                                    {/* View Button */}
                                    <button className="border-2 [border-color:#5B2EFF] [color:#5B2EFF] rounded-md px-10 py-2 text-sm font-semibold hover:bg-purple-50 transition" onClick={() => navigate('/practicetests/python')}>
                                        Take Test
                                    </button>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            ))}

            {/* View All Button */}
            <div className="flex justify-center w-full mt-8">
                <button
                    className="px-8 py-3 text-white rounded-lg text-base font-medium  md:justify-center"
                    style={{ backgroundColor: '#0C2D73' }} onClick={() => navigate('/coursecatalog')}
                >
                    View All Courses
                </button>
            </div>
            
</div>
        </div>
    );
}
