import React, { useState } from 'react';
import FrequentlyBought from './FrequentlyBought';
import CourseContent from './CourseContent';
import AllCourses from './AllCourses';
// import MainNavbar from '.././MainNavbar';
import { useNavigate } from 'react-router-dom';

const CourseDetailsTeam = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();
  
  return (
    <>
      {/* <MainNavbar />     */}
    <div>
    <div className="min-h-screen bg-black bg-gradient-to-r from-purple-900/30 to-blue-900/20 p-4 flex items-center justify-center"
      style={{
    backgroundImage: `url("/0dda1fa336a1a543fe3b688cab9267feab02720f.jpg")`,
  }}>
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-6">
        {/* Left section - Course preview card */}
        <div className="lg:w-1/2"   style={{
    backgroundImage: `url("/3f973620a7f76a59b59892a497bc026ec66d1472.jpg")`,
  }}>
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
            {/* Tab navigation */}
            <div className="flex">
              <button
                className={`flex-1 py-3 px-4 text-center ${activeTab === 'personal' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-gray-400'}`}
                onClick={() => setActiveTab('personal')}
              >
                Personal
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center ${activeTab === 'teams' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-gray-400'}`}
                onClick={() => setActiveTab('teams')}
              >
                Teams
              </button>
            </div>

            {/* Preview content */}
            <div className="p-5 bg-gradient-to-br from-gray-800 to-gray-900 relative" style={{
    backgroundImage: `url("/0dda1fa336a1a543fe3b688cab9267feab02720f.jpg")`,
  }}>
              {/* Course preview image */}
              <div className="rounded-md overflow-hidden mb-4 relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 flex items-center justify-center">
                  <img 
                    src="/3f973620a7f76a59b59892a497bc026ec66d1472.jpg" 
                    alt="Course background" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/30 rounded-full p-4 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Premium badge */}
              <div className="text-center mt-2 mb-2">
                <span className="text-sm text-gray-300">This Premium course is included in plans</span>
              </div>

              {/* Subscription button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium my-2 transition-colors" onClick={() => navigate('/payment')}>
                Start Subscription
              </button>

              {/* Price info */}
              <div className="text-center text-sm text-gray-400 mt-1">
                Starting at ₹500 per month, Cancel anytime
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Course details */}
        <div className="lg:w-1/2">
          {/* Badge section */}
          <div className="flex gap-2 mb-3">
            <span className="bg-purple-900/80 text-white text-xs px-2 py-1 rounded flex items-center">
              <span className="mr-1">⭐</span> Best Seller
            </span>
            <span className="bg-yellow-500/80 text-black text-xs px-2 py-1 rounded flex items-center">
              <span className="mr-1">🔰</span> Premium
            </span>
          </div>

          {/* Course title */}
          <h1 className="text-3xl font-bold text-white mb-3">
            The Complete AI Guide: Learn ChatGPT, Generative AI & More
          </h1>

          {/* Course subtitle */}
          <p className="text-gray-300 mb-4">
            50+ Generative AI Tools to 10x Business, Productivity, Creativity, ChatGPT, Artificial Intelligence, Prompt Engineering
          </p>

          {/* Instructors */}
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <img src="/assets/instructor-avatar.jpg" alt="Instructor" className="w-6 h-6 rounded-full mr-2" />
            <span>Julian Melanson, Reina Morgan, Leap Year Learning</span>
          </div>

          {/* Course info */}
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
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Any Language
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="bg-yellow-500 text-black text-xs px-1 py-0.5 rounded mr-1">4.7</span>
            <div className="flex text-yellow-500 text-sm">★★★★★</div>
            <span className="text-xs text-gray-400 ml-1">(1000+ reviews)</span>
          </div>

          {/* Price section */}
          <div className="mb-4">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-white mr-2">₹545</span>
              <span className="text-gray-400 line-through mr-2">₹805</span>
              <span className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">30% off</span>
            </div>
            <div className="text-red-500 text-sm mt-1">
              1 Day left at this price!
            </div>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium transition-colors">
              Buy Now
            </button>
            <button className="flex-1 border border-white text-white py-3 rounded font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
              Add To Cart
            </button>
          </div>

          {/* Money-back guarantee */}
          <div className="mt-4 text-center text-xs text-gray-400">
            <p>30-Day Money-Back Guarantee</p>
            <p>Full Lifetime Access</p>
          </div>
        </div>
      </div>
     
    </div>
     <CourseContent />
      <FrequentlyBought />
      <AllCourses />
    </div>
  </>
  );
};

export default CourseDetailsTeam;
