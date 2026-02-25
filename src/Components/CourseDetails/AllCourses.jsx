import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../lib/api';

const AllCourses = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section');
  const [skillTests, setSkillTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (section === 'skilltest') {
      fetchSkillTests();
    }
  }, [section]);

  const fetchSkillTests = async () => {
    try {
      setLoading(true);
      const resp = await api.get('/skills');
      const skillsData = resp.data?.data || [];
      setSkillTests(skillsData);
    } catch (err) {
      console.error('Failed to load skill tests', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (questionCount) => {
    if (questionCount === 0) return '0 min';
    const minutes = Math.max(10, Math.ceil(questionCount * 1.2));
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} Hrs ${mins} Min` : `${mins} Min`;
  };

  const getLevel = (questionCount) => {
    if (questionCount === 0) return 'Beginner';
    if (questionCount <= 10) return 'Beginner';
    if (questionCount <= 20) return 'Intermediate';
    return 'Advanced';
  };

  // If section is skilltest, show skill tests table
  if (section === 'skilltest') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Skill Tests</h1>
          <p className="text-gray-600 mb-4">
            Test your knowledge in various programming skills. Get instant results and personalized recommendations to improve your coding skills.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading skill tests...</p>
          </div>
        ) : skillTests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No skill tests available yet.</p>
          </div>
        ) : (
          <div>
            {/* Table view similar to contest page */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr style={{backgroundColor: "#AFE8F3"}}>
                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Title</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Duration</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Questions</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Level</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skillTests.map((skill) => {
                    const questionCount = skill.questions?.length || 0;
                    const level = getLevel(questionCount);
                    const duration = calculateDuration(questionCount);
                    
                    return (
                      <tr key={skill._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Link to={`/practicetests/${skill.skillName.toLowerCase()}`} className="text-blue-600 hover:underline">
                            {skill.skillName} Online Test & Quiz
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{duration}</td>
                        <td className="px-4 py-3 text-gray-700">{questionCount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            level === 'Beginner' ? 'bg-green-100 text-green-700' :
                            level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {level}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link to={`/practicetests/${skill.skillName.toLowerCase()}`}>
                            <button 
                              className="bg-blue-900 hover:bg-blue-700 text-white text-sm font-medium py-1 px-4 rounded"
                              disabled={questionCount === 0}
                            >
                              {questionCount === 0 ? 'No Questions' : 'Take Test'}
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Sample data structure for instructors and their courses (original content)
  const instructorsData = [
    {
      id: 1,
      name: "Instructor Name 1",
      courses: [
        {
          id: 1,
          title: "The Complete Full-Stack Web Development",
          rating: 4.5,
          reviews: 1200,
          price: 499,
          originalPrice: 3599,
          isPremium: true,
          thumbnail: "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png"
        },
        // ... 3 more similar course objects for grid
      ]
    },
    {
      id: 2,
      name: "Instructor Name 2",
      courses: [
        // ... similar course objects
      ]
    },
    {
      id: 3,
      name: "Instructor Name 3",
      courses: [
        // ... similar course objects
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {instructorsData.map((instructor) => (
        <div key={instructor.id} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">More Courses By {instructor.name}</h2>
            <button className="text-blue-600 text-sm hover:underline">
              View All Courses
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {instructor.courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Course Thumbnail */}
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                  {course.isPremium && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-yellow-500 text-xs font-medium px-2 py-1 rounded-sm">
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center text-sm mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{course.rating}</span>
                    <span className="text-gray-500 text-xs ml-1">
                      ({course.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center">
                    <span className="font-bold text-lg">₹{course.price}</span>
                    {course.originalPrice && (
                      <>
                        <span className="text-gray-500 line-through text-sm ml-2">
                          ₹{course.originalPrice}
                        </span>
                        <span className="text-green-600 text-sm ml-2">
                          {Math.round((1 - course.price/course.originalPrice) * 100)}% off
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCourses;
