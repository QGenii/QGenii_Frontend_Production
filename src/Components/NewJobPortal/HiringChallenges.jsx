import React from 'react';
import { Link } from 'react-router-dom';

// Sample data for hiring challenges
const challengesData = [
  {
    id: '1',
    role: 'Job Role',
    company: 'Company Name',
    location: 'New Delhi, India',
    isRemote: true,
    daysLeft: '7 days left',
    rating: '3.9/5'
  },
  {
    id: '2',
    role: 'Job Role',
    company: 'Company Name',
    location: 'New Delhi, India',
    isRemote: true,
    daysLeft: '3 days left',
    rating: '4.0/5'
  },
  {
    id: '3',
    role: 'Job Role',
    company: 'Company Name',
    location: 'New Delhi, India',
    isRemote: true,
    daysLeft: '5 days left',
    rating: '4.0/5'
  },
  {
    id: '4',
    role: 'Job Role',
    company: 'Company Name',
    location: 'New Delhi, India',
    isRemote: true,
    daysLeft: '2 days left',
    rating: '3.8/5'
  }
];

// Sample data for role suggestions
const roleData = [
  {
    id: '1',
    role: 'Data Analyst',
    companies: 'Top Companies'
  },
  {
    id: '2',
    role: 'Data Analyst',
    companies: 'Top Companies'
  },
  {
    id: '3',
    role: 'Data Analyst',
    companies: 'Top Companies'
  },
  {
    id: '4',
    role: 'Data Analyst',
    companies: 'Top Companies'
  },
  {
    id: '5',
    role: 'Data Analyst',
    companies: 'Top Companies'
  },
  {
    id: '6',
    role: 'Data Analyst',
    companies: 'Top Companies'
  },
  {
    id: '7',
    role: 'Data Analyst',
    companies: 'Top Companies'
  },
  {
    id: '8',
    role: 'Data Analyst',
    companies: 'Top Companies'
  }
];

// Background color variants for challenge cards
const getBgColor = (index) => {
  const colors = [
    'from-orange-300 to-orange-200', // Orange
    'from-purple-300 to-purple-200', // Purple
    'from-blue-300 to-blue-200',     // Blue
    'from-green-300 to-green-200'    // Green
  ];
  return colors[index % colors.length];
};

// Background color for role cards (all purple as in the image)
const getRoleBgColor = () => {
  return 'bg-purple-300';
};

const HiringChallenges = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hiring Challenges Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Hiring Challenges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challengesData.map((challenge, index) => (
            <div key={challenge.id} className="relative rounded-xl overflow-hidden shadow-sm">
              {/* Wavy Background */}
              <div className={`bg-gradient-to-b ${getBgColor(index)} h-28 w-full relative`}>
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wave' x='0' y='0' width='120' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M-40 9 Q-30 7 -20 9 Q-10 11 0 9 Q10 7 20 9 Q30 11 40 9 Q50 7 60 9 Q70 11 80 9 Q90 7 100 9 Q110 11 120 9 Q130 7 140 9' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3C/svg%3E')",
                    backgroundRepeat: "repeat"
                  }}
                ></div>
                
                {/* Company Logo Placeholder */}
                <div className="absolute top-4 left-4 bg-white w-16 h-16 rounded-md shadow"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white rounded-md py-1 px-2 text-xs font-medium flex items-center">
                  <span>{challenge.rating}</span>
                </div>
                
                {/* Days Left Badge */}
                <div className="absolute top-4 right-20 bg-white rounded-md py-1 px-2 text-xs font-medium flex items-center gap-1">
                  <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-red-500">{challenge.daysLeft}</span>
                </div>
              </div>
              
              {/* Challenge Content */}
              <div className="bg-white p-4">
                <h3 className="font-medium text-gray-800">{challenge.role}</h3>
                <p className="text-sm text-gray-600 mb-2">{challenge.company}</p>
                
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{challenge.location}</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  <span>Work From Home</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">Fresher</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">FreeFair</span>
                  </div>
                  <button className="bg-indigo-600 text-white text-xs px-3 py-1 rounded hover:bg-indigo-700 transition duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
              
              {/* Arrow Button */}
              <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <button className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition duration-300">
            View all
          </button>
        </div>
      </div>
      
      {/* Find the Right Role Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Find the <span className="text-indigo-600">Right Role</span> For you
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleData.map((role) => (
            <div key={role.id} className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Purple Header */}
              <div className={`${getRoleBgColor()} h-12 w-full relative rounded-t-lg flex items-center justify-center`}>
                <div className="flex items-center gap-2">
                  {/* Circle placeholders for company logos */}
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                </div>
              </div>
              
              {/* Role Content */}
              <div className="p-4">
                <h3 className="font-medium text-gray-800">{role.role}</h3>
                <p className="text-sm text-gray-600">{role.companies}</p>
              </div>
              
              {/* Arrow Button */}
              <button className="absolute right-2 bottom-4 bg-white rounded-full p-1 shadow-md">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Inspirational Quote Section */}
      <div className="rounded-full bg-gradient-to-r from-blue-200 to-blue-500 p-8 md:p-16 flex items-center justify-between relative overflow-hidden">
        {/* Quote Mark */}
        <div className="text-blue-600 font-bold text-8xl absolute left-8 top-4 opacity-90">
          "
        </div>
        
        <div className="max-w-2xl">
          <p className="text-xl md:text-2xl text-gray-800 font-medium ml-10">
            If opportunity doesn't knock, build a door."<br />
            <span className="text-lg">- Milton Berle</span>
          </p>
        </div>
        
        {/* Illustration */}
        <div className="hidden md:block">
          <img 
            src="/assets/job-search-illustration.png" 
            alt="Job Search" 
            className="w-48 h-48"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HiringChallenges;
