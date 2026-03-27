import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, User, Flag, Users, GraduationCap, Wrench, Layout } from "lucide-react";

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
};

export default function Section2() {
    const navigate = useNavigate();
    const [courses, setCourses] = React.useState([]);
    const [skills, setSkills] = React.useState([]);
    const [loadingCourses, setLoadingCourses] = React.useState(true);
    const [loadingSkills, setLoadingSkills] = React.useState(true);
    const [errorCourses, setErrorCourses] = React.useState(null);
    const [errorSkills, setErrorSkills] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:5000/courses?limit=5')
            .then(res => {
                console.log('Courses API response:', res.data);
                setCourses(res.data.data || []);
            })
            .catch((err) => {
                console.log('Courses API error:', err);
                setCourses([]);
            })
            .finally(() => setLoadingCourses(false));

        axios.get('http://localhost:5000/skills?limit=5')
            .then(res => {
                console.log('Skills API response:', res.data);
                setSkills(res.data.data || []);
            })
            .catch((err) => {
                console.log('Skills API error:', err);
                setSkills([]);
            })
            .finally(() => setLoadingSkills(false));
    }, []);

    return (
        <div className="flex flex-col items-start justify-center gap-8 py-[-1rem]">
            {/* Categories Bar */}
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

            <div className='px-4 sm:px-6 md:px-8 m-auto w-full'>
                {/* Top Section */}
                <div className="text-left flex flex-col items-start max-w-md mb-8">
                    <img src="/home2.png" alt="Study to Code" className="w-24 sm:w-28 md:w-44 mb-4" />
                    <h2 className="text-xl sm:text-2xl md:text-[1.75rem] font-bold text-gray-900 px-1">Study To Course</h2>
                </div>

                {/* Courses Section */}
                <div className="w-full mb-10">
                    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
                        {loadingCourses ? (
                            <div className="text-center w-full py-8 text-lg text-gray-500">Loading courses...</div>
                        ) : courses.length === 0 ? (
                            <div className="text-center w-full py-8 text-lg text-gray-500">No courses found.</div>
                        ) : (
                            courses.slice(0, 5).map((course) => (
                                <div
                                    key={course._id}
                                    className="relative bg-white border-2 border-[#6D28D9] rounded-2xl shadow-md p-4 flex flex-col items-center text-center flex-shrink-0 w-60 hover:shadow-lg hover:border-[#0C2D73] transition-all duration-300"
                                >
                                    {/* Level Badge */}
                                    <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                                        {course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1) : 'Beginner'}
                                    </div>

                                    {/* Icon/Thumbnail */}
                                    <div className="mb-4">
                                        <img 
                                            src={course.thumbnail || '/default-course-icon.png'} 
                                            alt={course.title} 
                                            className="w-14 h-14 object-contain"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 h-10">
                                        {course.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs text-gray-700 mb-4 line-clamp-3 h-12 leading-relaxed">
                                        {course.shortDescription || course.description}
                                    </p>

                                    {/* Rating and Learners */}
                                    <div className="flex items-center justify-between w-full mb-5 px-2">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold text-gray-800">{course.rating || '4.0'}</span>
                                            <span className="text-[#6D28D9] text-sm">★</span>
                                        </div>
                                        <span className="text-xs text-gray-600">{course.enrollmentCount || '230.5k'} Learners</span>
                                    </div>

                                    {/* View Button */}
                                    <button
                                        className="w-full border-2 border-[#6D28D9] bg-[#0C2D73] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#5B1FD5] hover:border-[#5B1FD5] transition-all duration-200 active:scale-95"
                                        onClick={() => navigate(`/courses/course-detail?id=${course._id}`)}
                                    >
                                        Enroll this Course
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* View All Courses Button */}
                <div className="flex justify-center w-full mb-12">
                    <button
                        className="px-8 py-3 text-white rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 active:scale-95"
                        style={{ backgroundColor: '#0C2D73' }}
                        onClick={() => navigate('/coursecatalog')}
                    >
                        View All Courses
                    </button>
                </div>

                {/* Skills Section */}
                <div className="w-full mb-10">
                    <h2 className="text-xl sm:text-2xl md:text-[1.75rem] font-bold text-gray-900 mb-6 px-1">Skill Check Test</h2>
                    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
                        {loadingSkills ? (
                            <div className="text-center w-full py-8 text-lg text-gray-500">Loading skills...</div>
                        ) : skills.length === 0 ? (
                            <div className="text-center w-full py-8 text-lg text-gray-500">No skills found.</div>
                        ) : (
                            skills.slice(0, 5).map((skill) => (
                                <div
                                    key={skill._id}
                                    className="relative bg-white border-2 border-[#6D28D9] rounded-2xl shadow-md p-4 flex flex-col items-center text-center flex-shrink-0 w-60 hover:shadow-lg hover:border-[#7C3AED] transition-all duration-300"
                                >
                                    {/* Difficulty Badge */}
                                    <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                                        Beginner
                                    </div>

                                    {/* Icon */}
                                    <div className="mb-4">
                                        <img 
                                            src={skill.icon || '/default-skill-icon.png'} 
                                            alt={skill.name} 
                                            className="w-14 h-14 object-contain"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 h-10">
                                        {skill.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs text-gray-700 mb-4 line-clamp-3 h-12 leading-relaxed">
                                        {skill.description}
                                    </p>

                                    {/* Rating and Learners */}
                                    <div className="flex items-center justify-between w-full mb-5 px-2">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold text-gray-800">4.0</span>
                                            <span className="text-[#6D28D9] text-sm">★</span>
                                        </div>
                                        <span className="text-xs text-gray-600">{skill.learners || '230.5k'} Learners</span>
                                    </div>

                                    {/* Take Test Button */}
                                    <button 
                                        className="w-full border-2 border-[#6D28D9] bg-[#0C2D73] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#5B1FD5] hover:border-[#5B1FD5] transition-all duration-200 active:scale-95"
                                        onClick={() => navigate(`/practicetests/${skill.name}`)}
                                    >
                                        Take Test
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* View All Skills Button */}
                <div className="flex justify-center w-full">
                    <button
                        className="px-8 py-3 text-white rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 active:scale-95"
                        style={{ backgroundColor: '#0C2D73' }}
                        onClick={() => navigate('/courses/allCourses?section=skilltest')}
                    >
                        View All Skill Test
                    </button>
                </div>
            </div>

            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}