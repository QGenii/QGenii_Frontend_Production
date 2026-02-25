import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

// Topic configuration
const topicConfig = {
  python: {
    title: 'Learn Python',
    description: 'Python is a versatile and user-friendly programming language known for its readability and efficiency. It\'s widely used for web development, data analysis, artificial intelligence, and more.',
    filterKeywords: ['python'],
    icon: '/cib_python.png',
  },
  c: {
    title: 'Learn C',
    description: 'C is a powerful general-purpose programming language. It is fast, portable and available in all platforms. Learn C programming to build a strong foundation in systems programming.',
    filterKeywords: ['c programming', 'c language'],
    icon: '/cib_python.png', // Update with C icon if available
  },
  cpp: {
    title: 'Learn C++',
    description: 'C++ is a powerful general-purpose programming language. It can be used to develop operating systems, browsers, games, and more. Master C++ for high-performance applications.',
    filterKeywords: ['c++', 'cpp'],
    icon: '/cib_python.png', // Update with C++ icon if available
  },
  'machine-learning': {
    title: 'Machine Learning',
    description: 'Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience. Master ML algorithms and build intelligent applications.',
    filterKeywords: ['machine learning', 'machine-learning'],
    icon: '/cib_python.png',
  },
  java: {
    title: 'Learn Java',
    description: 'Java is a high-level, class-based, object-oriented programming language. It is widely used for enterprise applications, Android development, and large-scale systems.',
    filterKeywords: ['java'],
    icon: '/cib_python.png', // Update with Java icon if available
  },
  'web-development': {
    title: 'Web Development',
    description: 'Web Development involves creating websites and web applications. Learn HTML, CSS, JavaScript, and modern frameworks to build responsive and interactive web experiences.',
    filterKeywords: ['web development', 'web-development', 'html', 'css', 'javascript', 'react'],
    icon: '/cib_python.png',
  },
  'c-sharp': {
    title: 'Learn C#',
    description: 'C# is a modern, object-oriented programming language developed by Microsoft. It is used for building Windows applications, web services, and games with Unity.',
    filterKeywords: ['c#', 'csharp', 'dotnet'],
    icon: '/cib_python.png',
  },
  kotlin: {
    title: 'Learn Kotlin',
    description: 'Kotlin is a modern programming language that makes development faster and more enjoyable. It is the preferred language for Android development and works seamlessly with Java.',
    filterKeywords: ['kotlin'],
    icon: '/cib_python.png',
  },
  rust: {
    title: 'Learn Rust',
    description: 'Rust is a systems programming language focused on safety and performance. It prevents segfaults and guarantees thread safety, making it ideal for system-level programming.',
    filterKeywords: ['rust'],
    icon: '/cib_python.png',
  },
  go: {
    title: 'Learn Go',
    description: 'Go (Golang) is a statically typed, compiled programming language designed at Google. It is known for its simplicity, efficiency, and excellent support for concurrent programming.',
    filterKeywords: ['go', 'golang'],
    icon: '/cib_python.png',
  },
  php: {
    title: 'Learn PHP',
    description: 'PHP is a popular server-side scripting language especially suited to web development. Learn PHP to build dynamic websites and web applications.',
    filterKeywords: ['php'],
    icon: '/cib_python.png',
  },
};

// ⭐ Reusable Card Component
function CourseCard({ course, onClick }) {
  const navigate = useNavigate();
  const rating = course.rating || 4.6;
  const reviews = course.reviews || course.reviewCount || 0;
  const learners = course.enrollmentCount || course.learners || '0';
  const level = course.level || 'Beginner';
  const description = course.description || course.shortDescription || 'Learn programming concepts with our practical course.';
  
  const handleClick = () => {
    if (onClick) {
      onClick(course);
    } else {
      navigate(`/coursecatalog/${course._id || course.id}`);
    }
  };

  return (
    <div className="bg-[#90E0EFB2] rounded-xl p-5 shadow-md hover:shadow-lg transition-all font-sans cursor-pointer" onClick={handleClick}>
      {/* Top Section: Icon + Title (vertical) */}
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-[#FFE379] w-10 h-10 rounded-md flex items-center justify-center">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-10 h-10 rounded-md object-cover" />
          ) : (
            <img src="/cib_python.png" alt={course.title} className="w-6 h-6" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1E3A8A]">{course.title}</h3>
          <span className="text-xs px-2 py-1 rounded-md font-medium mt-1 inline-block text-white bg-[#5B2EFF]">
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-800 mb-4 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Rating and Review */}
      <div className="flex items-center text-sm text-gray-700 gap-2 mb-1">
        <span className="text-yellow-400 text-[15px]">★★★★☆</span>
        <span className="text-sm text-[#1E3A8A] font-medium">
          {rating.toFixed(1)} ({reviews.toLocaleString()} ratings)
        </span>
      </div>

      {/* Course Count + Learners */}
      <p className="text-sm text-gray-700 font-normal">
        6 Courses • {typeof learners === 'number' ? `${(learners / 1000).toFixed(1)}k` : learners} learners
      </p>
    </div>
  );
}

// Algorithm Card Component
function AlgorithmCard({ course, onClick }) {
  const navigate = useNavigate();
  const rating = course.rating || 4.5;
  const reviews = course.reviews || course.reviewCount || 0;
  const learners = course.enrollmentCount || course.learners || '0';
  const level = course.level || 'Intermediate';
  const description = course.description || course.shortDescription || 'Learn advanced concepts and algorithms.';
  
  const handleClick = () => {
    if (onClick) {
      onClick(course);
    } else {
      navigate(`/coursecatalog/${course._id || course.id}`);
    }
  };

  return (
    <div className="bg-[#90E0EFB2] rounded-xl p-5 shadow-md hover:shadow-lg transition-all font-sans cursor-pointer" onClick={handleClick}>
      {/* Top Section: Icon + Title (vertical) */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-none bg-[#FFE379] flex items-center justify-center">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-10 h-10 object-cover" />
          ) : (
            <div className="w-full h-full bg-[#FFE379]"></div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1E3A8A]">{course.title}</h3>
          <span className="text-xs px-2 py-1 rounded-md font-medium mt-1 inline-block text-white bg-[#5B2EFF]">
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-800 mb-4 line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* Rating and Review */}
      <div className="flex items-center text-sm text-gray-700 gap-2 mb-1">
        <span className="text-yellow-400 text-[15px]">★★★★☆</span>
        <span className="text-sm text-[#1E3A8A] font-medium">
          {rating.toFixed(1)} ({reviews.toLocaleString()})
        </span>
      </div>

      {/* Course Count + Learners */}
      <p className="text-sm text-gray-700 font-normal">
        9 Courses • {typeof learners === 'number' ? `${(learners / 1000).toFixed(1)}k` : learners} learners
      </p>
    </div>
  );
}

// 🔷 Main Page Component
export default function LearnTopic({ topic = 'python' }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [basicCourses, setBasicCourses] = useState([]);
  const [algorithmCourses, setAlgorithmCourses] = useState([]);

  const config = topicConfig[topic] || topicConfig.python;

  useEffect(() => {
    fetchTopicCourses();
  }, [topic]);

  const fetchTopicCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses", {
        params: {
          page: 1,
          limit: 100,
          sort: "createdAt:-1",
        },
      });
      
      let allCourses = response?.data?.data || [];
      
      // Filter to show only published and approved courses (created by admin)
      allCourses = allCourses.filter(course => 
        course.isPublished === true && course.isApproved === true
      );
      
      console.log(`All Published & Approved Courses for ${config.title}:`, allCourses);
      
      // Filter courses by topic - STRICT matching (ONLY show courses with matching topic)
      const topicCourses = allCourses.filter((course) => {
        const courseTopic = course.topic?.toLowerCase();
        
        // STRICT: If course has a topic field, it MUST match exactly
        if (courseTopic) {
          // Only return true if topic matches exactly
          // This ensures Machine Learning courses (topic='machine-learning') 
          // don't show in Python section (topic='python')
          return courseTopic === topic;
        }
        
        // Only if course has NO topic field, then check tags and title as fallback
        const tags = Array.isArray(course.tags)
          ? course.tags.join(" ").toLowerCase()
          : "";
        const title = course.title?.toLowerCase() || "";
        
        // Check if course matches topic using filter keywords
        // Only match if keyword appears as a whole word/phrase
        const matchesTopic = config.filterKeywords.some(keyword => {
          const keywordLower = keyword.toLowerCase().trim();
          return (
            tags.includes(keywordLower) || 
            title.includes(keywordLower) ||
            title.startsWith(keywordLower) ||
            title.includes(` ${keywordLower} `)
          );
        });
        
        return matchesTopic;
      });
      
      console.log(`${config.title} Courses (filtered by topic):`, topicCourses);
      
      // Set featured course (first beginner course or first course)
      const beginnerCourses = topicCourses.filter(c => 
        (c.level || '').toLowerCase() === 'beginner'
      );
      setFeaturedCourse(beginnerCourses[0] || topicCourses[0] || null);
      
      // Set basic courses (beginner/intermediate, exclude advanced/algorithm)
      const basic = topicCourses.filter(c => {
        const level = (c.level || '').toLowerCase();
        const title = (c.title || '').toLowerCase();
        return (
          (level === 'beginner' || level === 'intermediate') &&
          !title.includes('algorithm') &&
          !title.includes('dsa') &&
          !title.includes('data structure')
        );
      });
      setBasicCourses(basic.slice(0, 10)); // Limit to 10
      
      // Set algorithm courses (advanced or contains algorithm/dsa)
      const algorithms = topicCourses.filter(c => {
        const level = (c.level || '').toLowerCase();
        const title = (c.title || '').toLowerCase();
        return (
          level === 'advanced' ||
          title.includes('algorithm') ||
          title.includes('dsa') ||
          title.includes('data structure')
        );
      });
      setAlgorithmCourses(algorithms.slice(0, 4)); // Limit to 4
      
      setCourses(topicCourses);
    } catch (error) {
      console.error(`Failed to fetch ${config.title} courses:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (course) => {
    navigate(`/coursecatalog/${course._id}`, {
      state: { title: course.title, description: course.description },
    });
  };

  if (loading) {
    return (
      <div className="w-full px-4 py-8 md:px-16 bg-white font-sans flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  const featured = featuredCourse || courses[0];
  const featuredRating = featured?.rating || 4.8;
  const featuredReviews = featured?.reviews || featured?.reviewCount || 18;
  const featuredLearners = featured?.enrollmentCount || 350400;

  return (
    <div className="w-full px-4 py-8 md:px-16 bg-white font-sans">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h1>
        <p className="text-gray-600 max-w-3xl text-[15px] leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Top Highlighted Card */}
      {featured && (
        <div className="mb-10">
          <p className="font-semibold mb-2 text-[15px] text-gray-800">New to {config.title.replace('Learn ', '')}? Start here</p>
          <div className="bg-[#0D71CF] text-white rounded-lg p-6 flex flex-col md:flex-row gap-6 justify-between items-start">
            <div className="flex flex-col md:w-2/3 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#FFFFFF] flex items-center justify-center">
                  {featured.thumbnail ? (
                    <img src={featured.thumbnail} alt={featured.title} className="w-10 h-10 rounded-md object-cover" />
                  ) : (
                    <img src={config.icon} alt={config.title} className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-[17px] leading-tight">
                    {featured.title}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md mt-1 inline-block">
                    {(featured.level || 'Beginner').charAt(0).toUpperCase() + (featured.level || 'Beginner').slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-white mt-3 flex items-center gap-3">
                <span className="text-yellow-400">★★★★☆</span>
                <span>{featuredRating.toFixed(1)} ({featuredReviews} ratings)</span>
              </div>
              <p className="text-sm text-white">
                6 Courses • {(featuredLearners / 1000).toFixed(1)}k learners
              </p>
              <button 
                className="bg-yellow-400 hover:bg-orange-400 text-black font-semibold text-sm mt-4 px-6 py-2 rounded-md w-64" 
                onClick={() => handleCourseClick(featured)}
              >
                Start Learning
              </button>
            </div>
            <div className="bg-[#0C316E] p-4 rounded-md text-sm text-white md:w-1/3">
              <p className="italic mb-3 leading-relaxed">
                "This module is excellent for both learning and practicing simultaneously. It provides a clear and deep understanding of concepts, unlike traditional learning methods."
              </p>
              <div>
                <p className="font-semibold text-white text-sm">pushingh-88</p>
                <p className="text-xs text-gray-300">Student</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Basic Course Cards */}
      {basicCourses.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic of {config.title.replace('Learn ', '')} ({basicCourses.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {basicCourses.map((course) => (
              <CourseCard key={course._id} course={course} onClick={handleCourseClick} />
            ))}
          </div>
        </>
      )}

      {/* Algorithms Section */}
      {algorithmCourses.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Algorithms ({algorithmCourses.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {algorithmCourses.map((course) => (
              <AlgorithmCard key={course._id} course={course} onClick={handleCourseClick} />
            ))}
          </div>
        </>
      )}

      {/* Show message if no courses found */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No {config.title} courses found. Create a course to get started!</p>
        </div>
      )}
    </div>
  );
}

