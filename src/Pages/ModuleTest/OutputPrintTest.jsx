import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../HomeAfterLogin/Header';

export default function OutputPrintTest() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* <Header /> */}
      
      {/* Breadcrumb navigation - dark blue background */}
      {/* <div className="bg-[#003478] text-white py-2 px-8">
        <div className="flex items-center text-sm">
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
      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Module test title and timer */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-medium mb-4">Module test: Output / print in python</h1>
          
          {/* Timer indicators */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-xs">01 Min</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span className="text-xs">30 Sec</span>
            </div>
          </div>
        </div>
        
        {/* Question counter */}
        <div className="text-center mb-10">
          <div className="text-sm text-gray-600 mb-3">Total Questions: 8/8</div>
          
          {/* Attempt counters */}
          <div className="flex justify-center gap-10">
            {/* Attempted counter */}
            <div className="w-44 h-32 bg-green-50 border border-green-200 rounded-md flex flex-col items-center justify-center">
              <div className="text-5xl font-semibold text-green-500 mb-2">00</div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Total Attempted</span>
              </div>
            </div>
            
            {/* Unattempted counter */}
            <div className="w-44 h-32 bg-red-50 border border-red-200 rounded-md flex flex-col items-center justify-center">
              <div className="text-5xl font-semibold text-red-500 mb-2">00</div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-700">Total Unattempted</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {/* Back to assessment button with tutor image */}
          <div className="relative">
            <button className="bg-[#003478] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-900">
              Back To Assessment
            </button>
            <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <img 
                src="/tutor-avatar.png"
                alt="Tutor"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40";
                }}
              />
            </div>
          </div>
          
          {/* Submit button with tutor image */}
          <div className="relative">
            <button className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium hover:bg-gray-50">
              Submit
            </button>
            <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <img 
                src="/tutor-avatar.png"
                alt="Tutor"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
