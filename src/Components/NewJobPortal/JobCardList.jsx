import React from 'react';
import { Link } from 'react-router-dom';

// Sample job data
const jobListings = [
  {
    id: '1',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New Delhi, India',
    applicants: 18,
    tags: ['Fresher', 'Undergraduate'],
    daysLeft: 3
  },
  {
    id: '2',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New Delhi, India',
    applicants: 18,
    tags: ['Fresher', 'Undergraduate'],
    daysLeft: 3
  },
  {
    id: '3',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New Delhi, India',
    applicants: 18,
    tags: ['Fresher', 'Undergraduate'],
    daysLeft: 3
  },
  {
    id: '4',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New Delhi, India',
    applicants: 18,
    tags: ['Fresher', 'Undergraduate'],
    daysLeft: 3
  },
  {
    id: '5',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New Delhi, India',
    applicants: 18,
    tags: ['Fresher', 'Undergraduate'],
    daysLeft: 3
  },
  {
    id: '6',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New Delhi, India',
    applicants: 18,
    tags: ['Fresher', 'Undergraduate'],
    daysLeft: 3
  },
  {
    id: '7',
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New Delhi, India',
    applicants: 18,
    tags: ['Fresher', 'Undergraduate'],
    daysLeft: 3
  }
];

const JobCardList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Jobs</h2>
      
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {jobListings.map((job, index) => (
          <div 
            key={job.id} 
            className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 relative ${
              index === 0 ? 'border-purple-200 border-2' : ''
            }`}
          >
            {/* Job Card Content */}
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
              
              {/* Job Details */}
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{job.role}</h3>
                <p className="text-gray-600 text-sm">{job.company}</p>
                
                {/* Location */}
                <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{job.location}</span>
                </div>
                
                {/* Applicants */}
                <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                  <span>{job.applicants} applicants</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-gray-700 text-xs px-2 py-1">+5</span>
                </div>
              </div>
            </div>
            
            {/* Days Left Badge */}
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 text-red-500 text-xs font-medium bg-white border border-red-100 rounded-md px-2 py-1 shadow-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
                <span>{job.daysLeft} days left</span>
              </div>
            </div>
            
            {/* First card has HR Avatar */}
            {index === 0 && (
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white border-4 border-purple-200 overflow-hidden">
                <img 
                  src="/assets/recruiter-avatar.jpg" 
                  alt="Recruiter" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E";
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCardList;
