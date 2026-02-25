import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Section3() {
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
            description: 'Learn JavaScript programming from basics to advanced with hands-on projects and real-world applications.',
            rating: 4.0,
            learners: '230.5k',
        },
    ];

    return (
        <div className="flex flex-col items-start justify-center gap-8 px-4 sm:px-6 md:px-8 py-12 bg-[#f2f2f2]">
            {/* Top Section */}
            <div className=' mx-auto flex flex-col gap-5 '>

                <div>
                    <div className="text-left flex flex-col items-start max-w-md mb-6">
                        <img src="/home2.png" alt="Study to Code" className="w-28 sm:w-36 md:w-44 mb-4" />
                        <h2 className="text-[1.5rem] font-semibold">Study To Code</h2>
                    </div>

                    {/* First Scrollable Course Section */}
                    <div className="w-full ">
                        <div className="overflow-x-auto pl-5">
                            <div className="flex gap-4 sm:gap-6 flex-nowrap min-w-max md:justify-center ">
                                {courses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="relative bg-white border-[2px] border-[#5B2EFF] rounded-xl shadow-md w-60 p-4 flex flex-col items-center text-center flex-shrink-0"
                                        style={{ backgroundColor: '#FCF0F0' }}
                                    >
                                        <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold rounded shadow-sm">
                                            Beginner
                                        </div>
                                        {/* Icon */}
                                        <img src={course.icon} alt={course.title} className="w-12 h-12 mb-4 mr-35" />
                                        <p className="text-sm text-gray-800 mb-4 text-left w-full">{course.description}</p>
                                        <div className="flex justify-between items-center text-xs text-gray-600 mb-4 w-full px-1">
                                            <div className="flex items-center gap-1">
                                                <span>{course.rating}</span>
                                                <span className="text-[#5B2EFF]">★</span>
                                            </div>
                                            <span>{course.learners} Learners</span>
                                        </div>
                                        <button className="border-2 [border-color:#5B2EFF] [color:#5B2EFF] rounded-md px-10 py-2 text-sm font-semibold hover:bg-purple-50 transition" onClick={() => navigate('/coursecatalog/LearnPython')}>
                                            view this course
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Practice Coding Contests Section */}
                <div className="w-full">
                    <h2 className="text-[1.5rem] font-semibold mb-6 pr-5">
                        Practice Coding Challenge
                    </h2>


                    <div className="overflow-x-auto pl-5">
                        <div className="flex gap-4 sm:gap-6 flex-nowrap min-w-max md:justify-center  ">
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white border-[2px] border-[#5B2EFF] rounded-xl shadow-md w-60 p-4 flex flex-col items-center text-center flex-shrink-0"
                                    style={{ backgroundColor: '#FCF0F0' }}
                                >
                                    <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold rounded shadow-sm">
                                        Beginner
                                    </div>
                                    {/* Icon */}
                                    <img src={course.icon} alt={course.title} className="w-12 h-12 mb-4 mr-35" />
                                    <p className="text-sm text-gray-800 mb-4 text-left w-full">{course.description}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4 w-full px-1">
                                        <div className="flex items-center gap-1">
                                            <span>{course.rating}</span>
                                            <span className="text-[#5B2EFF]">★</span>
                                        </div>
                                        <span>{course.learners} Learners</span>
                                    </div>
                                    <button className="border-2 [border-color:#5B2EFF] [color:#5B2EFF] rounded-md px-10 py-2 text-sm font-semibold hover:bg-purple-50 transition" onClick={() => navigate('/coursecatalog')}>
                                        Start Practice
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Upcoming Coding Contests Section */}
                <div className="w-full">
                    <h2 className="text-[1.5rem] font-semibold mb-6 pr-5">
                        Upcoming Coding Challenge
                    </h2>


                    <div className="overflow-x-auto pl-5">
                        <div className="flex gap-4 sm:gap-6 flex-nowrap min-w-max md:justify-center gap-6 sm:gap-10 ">
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white border-[2px] border-[#5B2EFF] rounded-xl shadow-md w-60 p-4 flex flex-col items-center text-center flex-shrink-0"
                                    style={{ backgroundColor: '#FCF0F0' }}
                                >
                                    <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold rounded shadow-sm">
                                        Beginner
                                    </div>
                                    {/* Icon */}
                                    <img src={course.icon} alt={course.title} className="w-12 h-12 mb-4 mr-35" />
                                    <p className="text-sm text-gray-800 mb-4 text-left w-full">{course.description}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4 w-full px-1">
                                        <div className="flex items-center gap-1">
                                            <span>{course.rating}</span>
                                            <span className="text-[#5B2EFF]">★</span>
                                        </div>
                                        <span>{course.learners} Learners</span>
                                    </div>
                                    <button className="border-2 [border-color:#5B2EFF] [color:#5B2EFF] rounded-md px-10 py-2 text-sm font-semibold hover:bg-purple-50 transition" onClick={() => navigate('/coursecatalog')}>
                                        Take Challenge
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Take Skill Test Section */}
                <div className="w-full">
                    <h2 className="text-[1.5rem] font-semibold mb-6 pr-5">
                        Skill Check Test
                    </h2>


                    <div className="overflow-x-auto pl-5">
                        <div className="flex gap-4 sm:gap-6 flex-nowrap min-w-max md:justify-center gap-6 sm:gap-10 ">
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white border-[2px] border-[#5B2EFF] rounded-xl shadow-md w-60 p-4 flex flex-col items-center text-center flex-shrink-0"
                                    style={{ backgroundColor: '#FCF0F0' }}
                                >
                                    <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold rounded shadow-sm">
                                        Beginner
                                    </div>
                                    {/* Icon */}
                                    <img src={course.icon} alt={course.title} className="w-12 h-12 mb-4 mr-35" />
                                    <p className="text-sm text-gray-800 mb-4 text-left w-full">{course.description}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4 w-full px-1">
                                        <div className="flex items-center gap-1">
                                            <span>{course.rating}</span>
                                            <span className="text-[#5B2EFF]">★</span>
                                        </div>
                                        <span>{course.learners} Learners</span>
                                    </div>
                                    <button className="border-2 [border-color:#5B2EFF] [color:#5B2EFF] rounded-md px-10 py-2 text-sm font-semibold hover:bg-purple-50 transition" onClick={() => navigate('/practicetests/python')}>
                                        Take test
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



                {/* View All Courses Button */}
                <div className="flex justify-center w-full mt-8">
                    <button
                        className="px-8 py-3 text-white rounded-lg text-base font-medium"
                        style={{ backgroundColor: '#0C2D73' }}
                        onClick={() => navigate('/coursecatalog')}
                    >
                        View All Courses
                    </button>
                </div>

            </div>
        </div>
    );
}
