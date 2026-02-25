import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../lib/api'

// import flag from "public/FlagRoadmapIcon.png"

// Function to get roadmap details from slug
const getRoadmapDetails = (slug) => {
  const roadmapMap = {
    'pythonroadmap': {
      title: 'Python with Beginner DSA',
      icon: '/cib_python.png',
      gradient: 'from-[#7474BF] to-[#348AC7]',
      description: 'Learn the basics of Python and data structures. Like practice modules to boost your coding and logic. End the roadmap with projects to showcase your Python abilities.'
    },
    'cplusroadmap': {
      title: 'C++ with Beginner DSA',
      icon: 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png',
      gradient: 'from-blue-200 via-blue-400 to-blue-600',
      description: 'Learn core C++ programming concepts with a focus on problem-solving and data structure practice.'
    },
    'javaroadmap': {
      title: 'Java with Beginner DSA',
      icon: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png',
      gradient: 'from-orange-300 via-orange-400 to-orange-500',
      description: 'Master core Java programming focused on data structures and algorithms. Sharpen your skills with challenges.'
    },
    'croadmap': {
      title: 'C language with Beginner DSA',
      icon: 'https://img.icons8.com/ios-filled/50/000000/c.png',
      gradient: 'from-indigo-200 via-indigo-400 to-indigo-600',
      description: 'Learn the essentials of C programming concepts. Enhance your skills with 600+ targeted coding problems.'
    },
    'sqlroadmap': {
      title: 'SQL Roadmap for Data Analytics',
      icon: 'https://img.icons8.com/color/48/000000/sql.png',
      gradient: 'from-green-300 via-green-500 to-green-600',
      description: 'Learn SQL to analyze and manipulate large data with our real-world case studies-based practical roadmap.'
    },
    'frontendroadmap': {
      title: 'Frontend Roadmap using HTML/CSS/JS',
      icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png',
      gradient: 'from-yellow-300 via-orange-400 to-pink-500',
      description: 'Master front-end web development with our HTML, CSS, and JS roadmap. Start with HTML and CSS basics.'
    }
  };
  
  return roadmapMap[slug] || roadmapMap['pythonroadmap']; // Default to Python if not found
};

// Function to map roadmap slug to tech stack keywords for fetching multiple courses
const getTechStackKeywords = (slug) => {
  const slugToKeywords = {
    'pythonroadmap': ['python'],
    'cplusroadmap': ['c++', 'cpp'],
    'javaroadmap': ['java'],
    'croadmap': ['c programming', 'c language'],
    'sqlroadmap': ['sql'],
    'frontendroadmap': ['html', 'css', 'javascript', 'js'],
    'reactroadmap': ['javascript', 'js', 'react'],
  };
  return slugToKeywords[slug] || ['python'];
};

export default function PythonRoadmap() {
    const { roadmapSlug } = useParams();
    const navigate = useNavigate();
    const roadmap = getRoadmapDetails(roadmapSlug);
    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get language keywords and topic from roadmap slug
    const getLanguageKeywords = (slug) => {
        const keywordMap = {
            'pythonroadmap': { keywords: ['python'], topic: 'python' },
            'cplusroadmap': { keywords: ['c++', 'cpp', 'c plus plus'], topic: 'cpp' },
            'javaroadmap': { keywords: ['java'], topic: 'java' },
            'croadmap': { keywords: ['c', 'c programming'], topic: 'c' },
            'sqlroadmap': { keywords: ['sql'], topic: 'sql' },
            'frontendroadmap': { keywords: ['frontend', 'html', 'css', 'javascript', 'js'], topic: 'web-development' },
        };
        return keywordMap[slug] || { keywords: ['python'], topic: 'python' };
    };
    
    // Fetch all courses and modules based on roadmap slug
    useEffect(() => {
        const fetchAllCoursesData = async () => {
            try {
                setLoading(true);
                const languageData = getLanguageKeywords(roadmapSlug);
                const languageKeywords = languageData.keywords;
                const languageTopic = languageData.topic;
                
                // Fetch all published and approved courses
                const allCoursesRes = await api.get('/courses', {
                    params: {
                        page: 1,
                        limit: 100,
                        sort: 'createdAt:-1',
                    },
                });
                
                let allCourses = allCoursesRes?.data?.data || [];
                
                // Filter to only published and approved courses
                allCourses = allCourses.filter(course => 
                    course.isPublished === true && course.isApproved === true
                );
                
                console.log(`Total published & approved courses: ${allCourses.length}`);
                
                // Get language name for matching
                const getLanguageNameForMatching = () => {
                    if (roadmapSlug === 'pythonroadmap') return 'python';
                    if (roadmapSlug === 'javaroadmap') return 'java';
                    if (roadmapSlug === 'cplusroadmap') return 'c++';
                    if (roadmapSlug === 'croadmap') return 'c';
                    if (roadmapSlug === 'sqlroadmap') return 'sql';
                    if (roadmapSlug === 'frontendroadmap') return 'frontend';
                    return 'python';
                };
                
                const languageName = getLanguageNameForMatching();
                
                // Filter courses to only include "Learn [Language] Programming" pattern
                // Examples: "Learn C Programming", "Learn Python Programming", "Learn Java Programming"
                const matchingCourses = allCourses.filter((course) => {
                    const title = (course.title || '').toLowerCase();
                    
                    // Must contain "learn" and "programming"
                    const hasLearn = title.includes('learn');
                    const hasProgramming = title.includes('programming');
                    
                    if (!hasLearn || !hasProgramming) {
                        return false;
                    }
                    
                    // Handle language-specific matching
                    if (roadmapSlug === 'cplusroadmap') {
                        // For C++, match "c++" or "cpp" or "c plus plus"
                        return title.includes('c++') || title.includes('cpp') || title.includes('c plus plus');
                    } else {
                        // For other languages, match the language name
                        const learnPattern = `learn ${languageName}`;
                        return title.includes(learnPattern);
                    }
                });
                
                console.log(`Found ${matchingCourses.length} courses for ${roadmapSlug}:`, matchingCourses);
                
                // Set the first course as the primary course (for navigation)
                if (matchingCourses.length > 0) {
                    setCourse(matchingCourses[0]);
                }
                
                // Fetch modules from all matching courses
                const allModules = [];
                for (const courseItem of matchingCourses) {
                    try {
                        const modulesRes = await api.get(`/courses/${courseItem._id}/modules`);
                        const modulesData = modulesRes.data.data || [];
                        
                        // Fetch contents for each module if not included
                        const modulesWithContents = await Promise.all(
                            modulesData.map(async (module) => {
                                if (module.contents && module.contents.length > 0) {
                                    return { ...module, courseId: courseItem._id, courseTitle: courseItem.title };
                                }
                                try {
                                    const moduleRes = await api.get(`/courses/${courseItem._id}/modules/${module._id}`);
                                    return { ...moduleRes.data.data || module, courseId: courseItem._id, courseTitle: courseItem.title };
                                } catch (err) {
                                    console.error(`Error fetching contents for module ${module._id}:`, err);
                                    return { ...module, courseId: courseItem._id, courseTitle: courseItem.title };
                                }
                            })
                        );
                        
                        allModules.push(...modulesWithContents);
                    } catch (err) {
                        console.error(`Error fetching modules for course ${courseItem._id}:`, err);
                    }
                }
                
                // Remove duplicate modules (by title) - keep the first occurrence
                const uniqueModules = [];
                const seenTitles = new Set();
                allModules.forEach(module => {
                    if (!seenTitles.has(module.title)) {
                        seenTitles.add(module.title);
                        uniqueModules.push(module);
                    }
                });
                
                // Filter out unwanted modules (case-insensitive)
                const filteredModules = uniqueModules.filter(module => {
                    const title = (module.title || '').toLowerCase();
                    // Remove "introduction to dsa in python" or similar variations
                    return !title.includes('introduction to dsa');
                });
                
                // Sort modules by order if available
                const sortedModules = [...filteredModules].sort((a, b) => {
                    if (a.order !== undefined && b.order !== undefined) {
                        return a.order - b.order;
                    }
                    return 0;
                });
                
                setModules(sortedModules);
                console.log(`Total unique modules: ${sortedModules.length}`, sortedModules);
            } catch (err) {
                console.error('Error fetching courses for roadmap:', roadmapSlug, err);
                setCourse(null);
                setModules([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchAllCoursesData();
    }, [roadmapSlug]);
    
    // Get language name from course title or roadmap slug
    const getLanguageName = () => {
        if (course?.title) {
            const title = course.title.toLowerCase();
            if (title.includes('python')) return 'Python';
            if (title.includes('java')) return 'Java';
            if (title.includes('c++') || title.includes('cpp')) return 'C++';
            if (title.includes('c language') || (title.includes(' c ') && !title.includes('c++'))) return 'C';
            if (title.includes('sql')) return 'SQL';
            if (title.includes('frontend') || title.includes('html') || title.includes('javascript')) return 'Frontend';
        }
        // Fallback to roadmap slug
        if (roadmapSlug === 'pythonroadmap') return 'Python';
        if (roadmapSlug === 'javaroadmap') return 'Java';
        if (roadmapSlug === 'cplusroadmap') return 'C++';
        if (roadmapSlug === 'croadmap') return 'C';
        if (roadmapSlug === 'sqlroadmap') return 'SQL';
        if (roadmapSlug === 'frontendroadmap') return 'Frontend';
        return 'Python';
    };
    
    // Calculate problem counts for a module
    const calculateModuleCounts = (module) => {
        if (!module || !module.contents || !Array.isArray(module.contents)) {
            return { textContent: 0, mcq: 0, codingMcq: 0, total: 0 };
        }
        
        let textContent = 0;
        let mcq = 0;
        let codingMcq = 0;
        
        module.contents.forEach((content) => {
            // Count text content (content type is "text" and has textContent)
            if (content.type === 'text' && content.textContent && content.textContent.trim() !== '') {
                textContent++;
            }
            
            // Count questions
            if (content.questions && Array.isArray(content.questions)) {
                content.questions.forEach((question) => {
                    if (question.type === 'mcq-coding') {
                        codingMcq++;
                    } else if (question.type === 'mcq' || !question.type) {
                        mcq++;
                    }
                });
            }
        });
        
        const total = textContent + mcq + codingMcq;
        return { textContent, mcq, codingMcq, total };
    };
    
    // Calculate total problem counts for all modules
    const calculateTotalCounts = () => {
        if (!modules || modules.length === 0) {
            return { textContent: 0, mcq: 0, codingMcq: 0, total: 0 };
        }
        
        let totalTextContent = 0;
        let totalMcq = 0;
        let totalCodingMcq = 0;
        
        modules.forEach((module) => {
            const counts = calculateModuleCounts(module);
            totalTextContent += counts.textContent;
            totalMcq += counts.mcq;
            totalCodingMcq += counts.codingMcq;
        });
        
        const total = totalTextContent + totalMcq + totalCodingMcq;
        return { textContent: totalTextContent, mcq: totalMcq, codingMcq: totalCodingMcq, total };
    };
    
    // Handle Start button click - navigate to first module's introduction page
    const handleStartCourse = async () => {
        if (!course?._id) {
            // If no course set, try to use the first module's courseId
            if (modules.length > 0 && modules[0].courseId) {
                const firstModule = modules[0];
                if (firstModule.contents && Array.isArray(firstModule.contents) && firstModule.contents.length > 0) {
                    const sortedContents = [...firstModule.contents].sort((a, b) => {
                        if (a.order !== undefined && b.order !== undefined) {
                            return a.order - b.order;
                        }
                        return 0;
                    });
                    const firstLesson = sortedContents[0];
                    if (firstLesson) {
                        navigate(`/coursecatalog/${firstModule.courseId}/problems/${firstLesson._id}?q=0`);
                        return;
                    }
                }
            }
            return;
        }

        try {
            // Use modules from state
            const modulesWithContents = modules;
            
            if (!modulesWithContents || modulesWithContents.length === 0) {
                // Fallback: navigate to course catalog
                navigate(`/coursecatalog/${course._id}`);
                return;
            }

            // Sort modules by order
            const sortedModules = [...modulesWithContents].sort((a, b) => {
                if (a.order !== undefined && b.order !== undefined) {
                    return a.order - b.order;
                }
                return 0;
            });

            // Get the first module
            const firstModule = sortedModules[0];
            
            if (!firstModule) {
                console.error('No modules found');
                navigate(`/coursecatalog/${course._id}`);
                return;
            }

            // Get the first lesson/content from the first module
            let firstLesson = null;
            if (firstModule.contents && Array.isArray(firstModule.contents) && firstModule.contents.length > 0) {
                // Sort contents by order if available
                const sortedContents = [...firstModule.contents].sort((a, b) => {
                    if (a.order !== undefined && b.order !== undefined) {
                        return a.order - b.order;
                    }
                    return 0;
                });
                firstLesson = sortedContents[0];
            }

            if (!firstLesson) {
                console.error('No lesson found in first module:', firstModule.title);
                // Fallback: navigate to course catalog page
                const courseIdToUse = firstModule.courseId || course._id;
                navigate(`/coursecatalog/${courseIdToUse}`);
                return;
            }

            // Use the courseId from the module if available, otherwise use the primary course
            const courseIdToUse = firstModule.courseId || course._id;
            // Navigate to the first lesson
            navigate(`/coursecatalog/${courseIdToUse}/problems/${firstLesson._id}?q=0`);
        } catch (error) {
            console.error('Error navigating to first lesson:', error);
            // Fallback: navigate to course catalog
            navigate(`/coursecatalog/${course._id}`);
        }
    };
    
    return (
        <div>
           
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className={`flex flex-col lg:flex-row justify-between items-start bg-gradient-to-r ${roadmap.gradient} rounded-2xl p-6 sm:p-8 text-white`}>
  {/* Left Section */}
  <div className="flex-1 lg:pr-6 w-full">
    
    {/* Icon and Heading in One Line */}
    <div className="flex items-center gap-4 mb-3">
      <div className="w-10 h-10 rounded-md bg-[#FFFFFF] flex items-center justify-center">
        <img src={roadmap.icon} alt={roadmap.title} className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        {roadmap.title}
      </h2>
    </div>

    {/* Rating and Reviews */}
    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
      <div className="flex items-center bg-[#FFAF3B] text-xs sm:text-sm font-bold h-7 sm:h-8 px-2 rounded">
        ⭐ 4.6 <span className="text-white font-medium ml-1 text-[11px] sm:text-sm">(119.3k+)</span>
      </div>
      <div className="text-[#f1f1f1] text-xs sm:text-sm underline underline-offset-2 font-medium">
        119.3k+ Reviews
      </div>
    </div>

    {/* Description */}
    <p className="text-[#f1f1f1] text-sm sm:text-base mb-5 leading-relaxed max-w-full lg:max-w-2xl">
      {roadmap.description}
    </p>
  </div>
</div>



                <br /><br /> 

                {/* Stats and What you'll learn sections */}
                <div className="mt-6 mb-8">
                    {/* Stats section with 3 cards and button in the same line */}
                    <div className="flex justify-center border-b border-gray-100 pb-6">
                        <div className="flex flex-row items-center justify-between w-full max-w-4xl">
                            <div className="flex space-x-10">
                                {/* Card 1 */}
                                <div className="flex flex-row items-center">
                                    <div className="w-10 h-10 bg-[#FFAC33] rounded flex items-center justify-center mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium">6 Courses</div>
                                </div>

                                {/* Card 2 */}
                                <div className="flex flex-row items-center">
                                    <div className="w-10 h-10 bg-[#FFAC33] rounded flex items-center justify-center mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium">6 months</div>
                                </div>

                                {/* Card 3 */}
                                <div className="flex flex-row items-center">
                                    <div className="w-10 h-10 bg-[#FFAC33] rounded flex items-center justify-center mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                            <path d="M2 17l10 5 10-5"></path>
                                            <path d="M2 12l10 5 10-5"></path>
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium">710 Problems</div>
                                </div>
                            </div>
                            
                            {/* Button on the same line */}
                            <button className="bg-[#003366] text-white font-medium py-2.5 px-6 rounded hover:bg-[#002244] transition duration-300">
                                Start Roadmap Now
                            </button>
                        </div>
                    </div>
   


                    {/* What you'll learn section - adjusted to match image alignment */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 8v8M8 12h8"></path>
                                </svg>
                            </div>
                            <h2 className="text-sm font-medium">What you'll learn</h2>
                        </div>

                        {/* Two column layout for the orange boxes - adjusted to horizontal alignment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                            {/* Left column */}
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-[#FFAC33] rounded flex-shrink-0 mr-3"></div>
                                <span className="text-sm">Basic Syntax</span>
                            </div>
                            
                            {/* Right column */}
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-[#FFAC33] rounded flex-shrink-0 mr-3"></div>
                                <span className="text-sm">Basic Syntax</span>
                            </div>
                            
                            {/* Row 2 - Left */}
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-[#FFAC33] rounded flex-shrink-0 mr-3"></div>
                                <span className="text-sm">Basic Syntax</span>
                            </div>
                            
                            {/* Row 2 - Right */}
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-[#FFAC33] rounded flex-shrink-0 mr-3"></div>
                                <span className="text-sm">Basic Syntax</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">

                    {/* Left Content */}
                    <div className="flex-1 mt-6 lg:mt-10 w-full">
          


                        <div className="bg-white rounded-xl px-4 sm:px-6 py-5 sm:py-6 shadow-sm mt-6 sm:mt-10 w-full">
                            {/* Header */}
                            <div className="flex items-start mb-4 sm:mb-6">
                                {/* Vertical Stripe and Icon */}
                                <div className="relative mr-3 sm:mr-4 flex-shrink-0">
                             <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center z-10 relative">
  <div className="p-0.5 sm:p-1 bg-white rounded-sm">
    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 flex items-center justify-center">
      <span className="text-black font-bold text-xs sm:text-sm">1</span>
    </div>
  </div>
</div>


                                    <div className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-3 sm:w-4 bg-repeat-y rounded-l-xl"></div>
                                </div>

                                {/* Title and Meta */}
                                <div className="w-full">
                                    <p className="text-xs sm:text-sm text-gray-500">Level 1</p>
                                    <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-800">
                                        Learn {getLanguageName()}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1 font-bold">
                                        Build Foundational Knowledge &nbsp; &nbsp; &nbsp;• 2 Courses &nbsp; &nbsp; &nbsp; • 4 weeks to complete
                                    </p>
                                    <br />
                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed font-bold">
                                        Start the journey with getting a strong command over {getLanguageName()}. Revise the important
                                        concepts if you are already familiar with the language.
                                    </p>
                                </div>
                            </div>



                            <div className="flex relative">
                                {/* Left vertical bar with icon and line */}
                                <div className="flex flex-col items-center w-10 mr-3 sm:mr-4 relative bg-[#90E0EF]">
                                    {/* Vertical striped bar */}
                                    <div className="relative w-8 z-0 h-[1000px] overflow-hidden rounded-full">
                                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,_#90E0EF_54.81%,_#FFFFFF_100%)]" />

                                    </div>


                                    {/* Top Icon */}
                                    <div className="bg-[#F9A21E]  w-8 h-8 flex items-center justify-center z-10 -mt-2 sm:-mt-4 relative mb-[10px] absolute -top-240">
                                        <img src="/LearnBooksImage.png" alt="Learn Icon" className="w-4 h-4" />
                                    </div>


                                    {/* Spacer for visual vertical rhythm */}
                                    <div className="h-6 sm:h-8" />

                                    {/* Middle Icon */}
                                    <div className="bg-[#F9A21E]  w-8 h-8 flex items-center justify-center z-10 mt-2 relative mb-[10px] absolute -top-130">
                                        <img src="/LearnBooksImage.png" alt="Learn Icon" className="w-4 h-4" />
                                    </div>

                                    <div className="h-6 sm:h-8" />

                                    {/* Bottom Icon */}
                                    <div className="bg-[#F9A21E]  w-8 h-8 flex items-center justify-center z-10 mt-2 mb-2 relative mb-[10px] absolute -top-70">
                                        <img src="/LearnBooksImage.png" alt="Learn Icon" className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Cards Section */}
                                <div className="flex flex-col space-y-4 sm:space-y-6 w-full">
                                    {/* 1. Learn Course Card - Dynamic */}
                                    <div className="bg-[#f0f6ff] rounded-xl p-4 sm:p-6 border border-[#d6e3fa] z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#90E0EF] rounded-xl px-3 sm:px-4 py-3 mb-4 sm:mb-6">
                                            <div className="w-full sm:w-auto">
                                                <h4 className="text-lg sm:text-2xl font-bold text-[#0C316E] flex items-center gap-1">
                                                    Learn {getLanguageName()} Programming
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#003366] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10m0-10h10v10" />
                                                    </svg>
                                                </h4>
                                                <br className="hidden sm:block" />
                                                <p className="text-xs sm:text-sm text-black-600 font-bold">
                                                    Learn Course &nbsp; &nbsp;•   &nbsp;&nbsp; {calculateTotalCounts().total} Problems
                                                </p>
                                            </div>
                                            <button 
                                                onClick={handleStartCourse}
                                                className="mt-3 sm:mt-0 bg-[#003366] text-white text-sm sm:text-md font-semibold px-3 sm:px-4 py-1.5 rounded-md hover:bg-[#002244] transition w-full sm:w-28"
                                            >
                                                Start
                                            </button>
                                        </div>

                                     <div className="relative pl-3 sm:pl-4 space-y-2 sm:space-y-3">
                                        {loading ? (
                                            <div className="text-gray-500 text-sm">Loading modules...</div>
                                        ) : modules.length > 0 ? (
                                            modules.map((module, idx) => {
                                                const counts = calculateModuleCounts(module);
                                                const hasCounts = counts.textContent > 0 || counts.mcq > 0 || counts.codingMcq > 0;
                                                return (
                                                    <div key={module._id || idx} className="flex items-start">
                                                        <span className="w-2.5 h-2.5 bg-[#0C316E] rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-gray-700 text-sm">{module.title}</span>
                                                                {hasCounts && (
                                                                    <div className="text-gray-500 text-xs ml-2 flex gap-2 flex-wrap">
                                                                        {counts.textContent > 0 && <span>Text: {counts.textContent}</span>}
                                                                        {counts.mcq > 0 && <span>MCQ: {counts.mcq}</span>}
                                                                        {counts.codingMcq > 0 && <span>Coding MCQ: {counts.codingMcq}</span>}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-gray-500 text-sm">No modules available</div>
                                        )}
                                    </div>

                                    </div>

                                    {/* 2. Practice Python Card */}
                                    <div className="bg-[#f0f6ff] rounded-xl p-4 sm:p-6 border border-[#d6e3fa] z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#90E0EF] rounded-xl px-3 sm:px-4 py-3 mb-4 sm:mb-6">
                                            <div className="w-full sm:w-auto">
                                                <h4 className="text-lg sm:text-2xl font-bold text-[#0C316E] flex items-center gap-1">
                                                    Practice Python
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#003366] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10m0-10h10v10" />
                                                    </svg>
                                                </h4>
                                                <br className="hidden sm:block" />
                                                <p className="text-xs sm:text-sm text-black-600 font-bold">Practice Course &nbsp; &nbsp;•   &nbsp;&nbsp; 192 Problems</p>
                                            </div>
                                            <button className="mt-3 sm:mt-0 bg-[#003366] text-white text-sm sm:text-md font-semibold px-3 sm:px-4 py-1.5 rounded-md hover:bg-[#002244] transition w-full sm:w-28">
                                                Start
                                            </button>
                                        </div>

                                        <div className="relative pl-3 sm:pl-4 space-y-2 sm:space-y-3">
                                            {[
                                                "Output / Print in Python",
                                                "Variables and datatypes",
                                                "Strings",
                                                "Taking input from users",
                                            ].map((topic, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <span className="w-2.5 h-2.5 bg-[#0C316E] rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{topic}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 3. Python Online Test & Quiz Card */}
                                    <div className="bg-[#f0f6ff] rounded-xl p-4 sm:p-6 border border-[#d6e3fa] z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#90E0EF] rounded-xl px-3 sm:px-4 py-3 mb-4 sm:mb-6">
                                            <div className="w-full sm:w-auto">
                                                <h4 className="text-lg sm:text-2xl font-bold text-[#0C316E] flex items-center gap-1">
                                                    Python Online Test & Quiz
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#003366] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10m0-10h10v10" />
                                                    </svg>
                                                </h4>
                                                <br className="hidden sm:block" />
                                                <p className="text-xs sm:text-sm text-black-600 font-bold">Skill Test &nbsp; &nbsp;•   &nbsp;&nbsp; 300 Problems</p>
                                            </div>
                                            <button className="mt-3 sm:mt-0 bg-[#003366] text-white text-sm sm:text-md font-semibold px-3 sm:px-4 py-1.5 rounded-md hover:bg-[#002244] transition w-full sm:w-28">
                                                Start
                                            </button>
                                        </div>

                                        <div className="relative pl-3 sm:pl-4 space-y-2 sm:space-y-3 ">
                                            <div className="flex items-start">
                                                <span className="w-2.5 h-2.5 bg-[#0C316E] rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">The test will be 1 hour 30 minutes long duration</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />
                            {/* Header */}
                            <div className="flex items-start mb-4 sm:mb-6">
                                {/* Vertical Stripe and Icon */}
                                <div className="relative mr-3 sm:mr-4 flex-shrink-0">
                                 <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center z-10 relative">
  <div className="p-0.5 sm:p-1 bg-white rounded-sm">
    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 flex items-center justify-center">
      <span className="text-black font-bold text-xs sm:text-sm">2</span>
    </div>
  </div>
</div>

                                    <div className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l-xl"></div>
                                </div>

                                {/* Title and Meta */}
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">Level 2</p>
                                    <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-800">Learn Python</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1 font-bold">
                                        Build Foundational Knowledge &nbsp; &nbsp; &nbsp;• 2 Courses &nbsp; &nbsp; &nbsp; • 4 weeks to complete
                                    </p>
                                    <br />
                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed font-bold">
                                        Start the journey with getting a strong command over Python. Revise the important
                                        concepts if you are already familiar with the language.
                                    </p>
                                </div>
                            </div>

                            <div className="flex relative">
                                {/* Left vertical bar with icon and line */}
                                <div className="flex flex-col items-center w-10 mr-3 sm:mr-4 relative">
                                    {/* Vertical striped bar */}
                                    <div className="relative w-8 z-0 h-[1000px] overflow-hidden rounded-full">
                                         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,_#90E0EF_54.81%,_#FFFFFF_100%)]" />
                                    </div>

                                    {/* Top Icon */}
                                    <div className="bg-[#F9A21E] w-8 h-8 flex items-center justify-center z-10 mt-2 sm:mt-4 relative mb-[10px] absolute -top-240">
                                        <img src="/LearnBooksImage.png" alt="Learn Icon" className="w-4 h-4" />
                                    </div>

                                    <div className="h-6 sm:h-8" />

                                    {/* Middle Icon */}
                                    <div className="bg-[#F9A21E]  w-8 h-8 flex items-center justify-center z-10 mt-2 relative mb-[10px] absolute -top-140">
                                        <img src="/LearnBooksImage.png" alt="Learn Icon" className="w-4 h-4" />
                                    </div>

                                    <div className="h-6 sm:h-8" />

                                    {/* Bottom Icon */}
                                    <div className="bg-[#F9A21E] w-8 h-8 flex items-center justify-center z-10 mt-2 mb-2 relative mb-[10px] absolute -top-80">
                                        <img src="/LearnBooksImage.png" alt="Learn Icon" className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Cards Section */}
                                <div className="flex flex-col space-y-4 sm:space-y-6 w-full">
                                    {/* 1. Learn Python Programming Card */}
                                    <div className="bg-[#f0f6ff] rounded-xl p-4 sm:p-6 border border-[#d6e3fa] z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#90E0EF] rounded-xl px-3 sm:px-4 py-3 mb-4 sm:mb-6">
                                            <div className="w-full sm:w-auto">
                                                <h4 className="text-lg sm:text-2xl font-bold text-[#0C316E] flex items-center gap-1">
                                                    Learn Python Programming
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#003366] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10m0-10h10v10" />
                                                    </svg>
                                                </h4>
                                                <br className="hidden sm:block" />
                                                <p className="text-xs sm:text-sm text-black-600 font-bold">Learn Course &nbsp; &nbsp;•   &nbsp;&nbsp; 240 Problems</p>
                                            </div>
                                            <button className="mt-3 sm:mt-0 bg-[#003366] text-white text-sm sm:text-md font-semibold px-3 sm:px-4 py-1.5 rounded-md hover:bg-[#002244] transition w-full sm:w-28">
                                                Start
                                            </button>
                                        </div>

                                        <div className="relative pl-3 sm:pl-4 space-y-2 sm:space-y-3 ">
                                            {[
                                                "Output / Print in Python",
                                                "Variables and datatypes",
                                                "Strings",
                                                "Taking input from users",
                                                "Conditional statements",
                                                "How to debug your code",
                                                "Arrays and Loops",
                                                "Functions in python",
                                                "Tuples and Dictionary",
                                                "Getting started with algorithmic problems",
                                            ].map((topic, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <span className="w-2.5 h-2.5 bg-[#0C316E] rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{topic}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 2. Practice Python Card */}
                                    <div className="bg-[#f0f6ff] rounded-xl p-4 sm:p-6 border border-[#d6e3fa] z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#90E0EF] rounded-xl px-3 sm:px-4 py-3 mb-4 sm:mb-6">
                                            <div className="w-full sm:w-auto">
                                                <h4 className="text-lg sm:text-2xl font-bold text-[#0C316E] flex items-center gap-1">
                                                    Practice Python
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#003366] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10m0-10h10v10" />
                                                    </svg>
                                                </h4>
                                                <br className="hidden sm:block" />
                                                <p className="text-xs sm:text-sm text-black-600 font-bold">Practice Course &nbsp; &nbsp;•   &nbsp;&nbsp; 192 Problems</p>
                                            </div>
                                            <button className="mt-3 sm:mt-0 bg-[#003366] text-white text-sm sm:text-md font-semibold px-3 sm:px-4 py-1.5 rounded-md hover:bg-[#002244] transition w-full sm:w-28">
                                                Start
                                            </button>
                                        </div>

                                        <div className="relative pl-3 sm:pl-4 space-y-2 sm:space-y-3 ">
                                            {[
                                                "Output / Print in Python",
                                                "Variables and datatypes",
                                                "Strings",
                                                "Taking input from users",
                                            ].map((topic, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <span className="w-2.5 h-2.5 bg-[#0C316E] rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{topic}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 3. Python Online Test & Quiz Card */}
                                    <div className="bg-[#f0f6ff] rounded-xl p-4 sm:p-6 border border-[#d6e3fa] z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#90E0EF] rounded-xl px-3 sm:px-4 py-3 mb-4 sm:mb-6">
                                            <div className="w-full sm:w-auto">
                                                <h4 className="text-lg sm:text-2xl font-bold text-[#0C316E] flex items-center gap-1">
                                                    Python Online Test & Quiz
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#003366] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10m0-10h10v10" />
                                                    </svg>
                                                </h4>
                                                <br className="hidden sm:block" />
                                                <p className="text-xs sm:text-sm text-black-600 font-bold">Skill Test &nbsp; &nbsp;•   &nbsp;&nbsp; 300 Problems</p>
                                            </div>
                                            <button className="mt-3 sm:mt-0 bg-[#003366] text-white text-sm sm:text-md font-semibold px-3 sm:px-4 py-1.5 rounded-md hover:bg-[#002244] transition w-full sm:w-28">
                                                Start
                                            </button>
                                        </div>

                                        <div className="relative pl-3 sm:pl-4 space-y-2 sm:space-y-3">
                                            <div className="flex items-start">
                                                <span className="w-2.5 h-2.5 bg-[#0C316E] rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm">The test will be 1 hour 30 minutes long duration</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>



                    <div className="flex flex-col items-center w-full lg:w-auto mt-4 lg:mt-10">
                        {/* Card */}

                        

                        <br /><br />

                        <div className="max-w-full sm:max-w-sm mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 text-center text-black w-full sm:w-[350px] h-auto sm:h-[330px] mt-4 sm:mt-6">
                            {/* Certificate Image */}
                            <div className="border-[3px] border-[#002366] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                                <div className="flex flex-col items-center">
                                    <img src="/solar_cup-star-bold.png" alt="Medal" className="w-9 h-9 sm:w-10 sm:h-10 mb-3 sm:mb-4" />
                                    
                                    <p className="font-semibold text-[14px] sm:text-[16px] mb-2">Up Next</p>
                    <p className="font-semibold">Completion: Completion obtain your certificate by completeing the course</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
