import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProblemDetail = () => {
  const [activeTab, setActiveTab] = useState('statement');

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb navigation */}
      <div className="bg-blue-900 text-white px-6 py-2">
        <div className="container mx-auto">
          <div className="flex items-center text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/practice" className="hover:underline">Practice</Link>
            <span className="mx-2">›</span>
            <Link to="/practice/programming-languages" className="hover:underline">Programming Languages</Link>
            <span className="mx-2">›</span>
            <Link to="/practice/c-plus-plus" className="hover:underline">Practice C++</Link>
            <span className="mx-2">›</span>
            <span>Code Output-MCQ</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row">
        {/* Left panel - Problem statement with partial blur effect */}
        <div className="md:w-1/2 bg-white border border-gray-200 rounded-md shadow-sm mr-4 relative">
          {/* Tab navigation - fully visible */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button 
                className={`px-4 py-3 text-sm ${activeTab === 'statement' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-700'}`}
                onClick={() => setActiveTab('statement')}
              >
                Statement
              </button>
              <button 
                className={`px-4 py-3 text-sm ${activeTab === 'help' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-700'}`}
                onClick={() => setActiveTab('help')}
              >
                AI Help
              </button>
            </div>
          </div>
          
          {/* Top content - visible normally */}
          <div className="p-4">
            <div className="mb-4">
              <h1 className="text-lg font-medium mb-2">Project - Guess the number</h1>
              <p className="text-gray-600 text-sm mb-3">
                Welcome to our Guess the Number game challenge!
              </p>
              <p className="text-gray-600 text-sm mb-3">
                In this module we will build a program step by step that will ask the user to guess a number. When the user gets it right we will tell them a series of fun facts.
              </p>
              <p className="text-gray-600 text-sm mb-3">
                In this module we will build a simple Guess the number game.
              </p>
            </div>
          </div>
          
          {/* Bottom content - visible but blurred with overlay */}
          <div className="relative">
            {/* Blurred content */}
            <div className="filter blur-sm p-4 pt-0">
              <div className="mb-4">
                <h2 className="font-medium mb-2">Time to start!</h2>
                <p className="text-gray-600 text-sm mb-3">
                  Take our first function to use, called with the game or the console, to understand how it functions. The project will take some time to reach the final form. Please be patient.
                </p>
              </div>
              
              <div className="mb-4">
                <h2 className="font-medium mb-2">Requirements:</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Implement a basic number guessing program</li>
                  <li>Tell the user if their guess is too high or too low</li>
                  <li>When the user guesses correctly, display a congratulations message</li>
                </ul>
              </div>
              
              {/* Extra space for the overlay */}
              <div className="h-40"></div>
            </div>

            {/* Pro membership overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-60 z-10">
              <div className="text-center p-4">
                <div className="inline-block bg-white rounded-full p-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Don't pause your progress - become a Pro member Today!</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel - User forms & features */}
        <div className="md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
            <h2 className="font-bold mb-4">User forms, Don't Miss out!</h2>
            <p className="text-gray-600 text-sm mb-4">Check out how this module can accelerate your learning</p>
            
            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Feature 1 */}
              <div className="p-4 flex flex-col items-center text-center">
                <div className="mb-2">
                  <img src="/lightbulb-icon.png" alt="Light bulb icon" className="w-12 h-12" />
                </div>
                <p className="text-xs text-gray-600">Find solutions to EVERY problem without leaving the platform!</p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-4 flex flex-col items-center text-center">
                <div className="mb-2">
                  <img src="/computer-icon.png" alt="Computer icon" className="w-12 h-12" />
                </div>
                <p className="text-xs text-gray-600">Learn real-life coding practices for future job opportunities</p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-4 flex flex-col items-center text-center">
                <div className="mb-2">
                  <img src="/chat-icon.png" alt="Chat icon" className="w-12 h-12" />
                </div>
                <p className="text-xs text-gray-600">Access expert answers and AI tutoring from technical professionals</p>
              </div>
              
              {/* Feature 4 */}
              <div className="p-4 flex flex-col items-center text-center">
                <div className="mb-2">
                  <img src="/trophy-icon.png" alt="Trophy icon" className="w-12 h-12" />
                </div>
                <p className="text-xs text-gray-600">Level up and earn certificates for completing projects</p>
              </div>
            </div>
            
            {/* Python Challenge Banner */}
            <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Ready to test your Python Project for beginners Challenge?</p>
                  <button className="mt-2 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-600">
                    Unlock Pro Premium NOW!
                  </button>
                  <p className="mt-1 text-xs text-gray-500">Your success starts here!</p>
                </div>
                <div>
                  <img src="/graduation-hat.png" alt="Graduation hat" className="w-16 h-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User profile circle at bottom */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-white rounded-full h-12 w-12 border-2 border-gray-200 shadow-lg overflow-hidden">
          <img src="/avatar.png" alt="User avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
// export default ProblemDetail;
