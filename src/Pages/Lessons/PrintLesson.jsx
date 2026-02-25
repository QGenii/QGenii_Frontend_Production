import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../HomeAfterLogin/Header';
import { Star } from 'lucide-react';

// Circular progress component
const CircularProgress = ({ percentage }) => {
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-500"
          strokeWidth="8"
          strokeDasharray={`${percentage * 2.51} 251`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-medium text-gray-700">{percentage}%</span>
      </div>
    </div>
  );
};

export default function PrintLesson() {
  return (
    <div className="bg-white min-h-screen font-sans">
     
      
      {/* Breadcrumb navigation */}
      {/* <div className="bg-[#003478] text-white py-2 px-8">
        <div className="container mx-auto flex items-center text-sm">
          <Link to="/all-courses" className="hover:underline">All Courses</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/catalog" className="hover:underline">Catalog</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/topics" className="hover:underline">Topics</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/learn-python" className="hover:underline">Learn Python</Link>
          <span className="mx-2">&gt;</span>
          <Link to="/learn-python-programming" className="hover:underline">Learn Python Programming</Link>
          <span className="mx-2">&gt;</span>
          <span>Module Test: Output / Print in Python</span>
        </div>
      </div> */}
      
      {/* Main content */}
      <div className="container mx-auto px-8 py-6">
        {/* Free Lesson Badge */}
        <div className="inline-block mb-3">
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Free Lesson | LESSON 2</span>
        </div>
        
        {/* Lesson Title */}
        <h1 className="text-2xl font-bold mb-4">Print text and Numbers using single print</h1>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left column - Course completion */}
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center justify-center h-64">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm font-medium">Course Completed:</span>
            </div>
            <CircularProgress percentage={20} />
            <button className="mt-4 bg-[#003478] text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-900">
              Keep going
            </button>
          </div>
          
          {/* Middle column - Test Your Knowledge */}
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center justify-center h-64">
            <h3 className="text-lg font-semibold mb-2">Test Your Knowledge</h3>
            <p className="text-sm text-center text-gray-600 mb-4">Take a quiz to cement your learnings</p>
            
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            
            <button className="bg-white border border-gray-300 text-gray-800 py-2 px-6 rounded-md text-sm font-medium hover:bg-gray-100">
              Take test
            </button>
          </div>
          
          {/* Right column - Illustration */}
          <div className="relative h-64 flex items-center justify-center">
            <img 
              src="/Rectangle 776.png" 
              alt="Students studying" 
              className="w-full h-full object-contain" 
            />
          
            
          </div>
        </div>
        
        {/* Rate the Lesson section */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h3 className="text-sm font-medium mb-2">Rate the Lesson</h3>
          <p className="text-xs text-gray-600 mb-2">This will help us to improve!!!!!!</p>
          
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-gray-300 hover:text-yellow-400">
                <Star className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Premium Upgrade Banner */}
        <div className="bg-[#fff9f0] border border-[#ffe9c8] rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-1">Want to unlock all lessons of Learning python programming? and Earn Certificate</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-green-600 font-medium">Unlock More Benefits and Surprises</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md font-medium">
                Become a Pro Member
              </button>
              <img 
                src="/Group.png" 
                alt="Pro badges" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
