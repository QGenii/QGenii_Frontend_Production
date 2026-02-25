import React, { useState } from 'react';
import FrequentlyBought from './FrequentlyBought';
import CourseContent from './CourseContent';
import AllCourses from './AllCourses';
// import MainNavbar from '.././MainNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { courses } from './CourseCatalog/CourseCatalog.jsx';

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-screen bg-black bg-gradient-to-r from-purple-900/30 to-blue-900/20 p-4">
        <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-6">
          {/* Left preview */}
          <div className="lg:w-1/2">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl" style={{ backgroundImage: `url("${image}")`, backgroundSize: 'cover' }}>
              <div className="p-5 bg-gradient-to-br from-gray-800/80 to-gray-900/80 relative">
                <div className="rounded-md overflow-hidden mb-4 relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 flex items-center justify-center">
                    <img src={image} alt="Course background" className="w-full h-full object-cover opacity-60" />
                  </div>
                </div>

                <div className="text-center mt-2 mb-2">
                  <span className="text-sm text-gray-300">{course.badgeType ? `Badge: ${course.badgeType}` : 'Featured course'}</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium my-2 transition-colors" onClick={() => navigate('/payment')}>
                  Start Subscription
                </button>

                <div className="text-center text-sm text-gray-400 mt-1">
                  Starting at ₹500 per month, Cancel anytime
                </div>
              </div>
            </div>
          </div>

          {/* Right details */}
          <div className="lg:w-1/2">
            <div className="flex gap-2 mb-3">
              <span className="bg-purple-900/80 text-white text-xs px-2 py-1 rounded flex items-center">{course.badgeType || 'Popular'}</span>
              <span className="bg-yellow-500/80 text-black text-xs px-2 py-1 rounded flex items-center">{course.level || 'Beginner'}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
            <p className="text-gray-300 mb-4">{subtitle}</p>

            <div className="flex items-center text-sm text-gray-400 mb-4"> 
              <img src="/assets/instructor-avatar.jpg" alt="Instructor" className="w-6 h-6 rounded-full mr-2" />
              <span>{courses?.instructor || 'Course Instructor'}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-xs text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Last updated Aug 28, 2023
              </div>
              <div className="flex items-center text-xs text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                English (Main)
              </div>
            </div>

            <div className="flex items-center mb-4">
              <span className="bg-yellow-500 text-black text-xs px-1 py-0.5 rounded mr-1">{rating}</span>
              <div className="flex text-yellow-500 text-sm">★★★★★</div>
              <span className="text-xs text-gray-400 ml-1">({reviews} reviews)</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-white mr-2">{`₹${course.price || 545}`}</span>
                {course.originalPrice && <span className="text-gray-400 line-through mr-2">{`₹${course.originalPrice}`}</span>}
                {course.discount && <span className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">{course.discount}</span>}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium transition-colors">Buy Now</button>
              <button className="flex-1 border border-white text-white py-3 rounded font-medium hover:bg-white hover:bg-opacity-10 transition-colors">Add To Cart</button>
            </div>

            <div className="mt-4 text-center text-xs text-gray-400">
              <p>30-Day Money-Back Guarantee</p>
              <p>Full Lifetime Access</p>
            </div>
          </div>
        </div>
      </div>

      <CourseContent course={course} />
      <FrequentlyBought />
      <AllCourses />
    </div>
  );
};

export default CourseDetail;
