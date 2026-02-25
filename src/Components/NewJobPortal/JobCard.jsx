import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  // Define header background colors based on category
  const getHeaderBgClass = (category) => {
    switch(category) {
      case 'Software Development':
        return 'bg-gradient-to-r from-orange-400 to-red-400';
      case 'Design':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Data Science':
        return 'bg-gradient-to-r from-cyan-400 to-blue-500';
      case 'Finance':
        return 'bg-gradient-to-r from-green-400 to-emerald-500';
      case 'Marketing':
        return 'bg-gradient-to-r from-yellow-200 to-rose-300';
      default:
        return 'bg-gradient-to-r from-blue-400 to-indigo-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden relative">
      {/* Card Header with colored background based on job category */}
      <div className={`${getHeaderBgClass(job.category)} h-16 relative overflow-hidden`}>
        {/* Company logo in circle */}
        <div className="absolute -bottom-5 left-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
            {job.companyLogo ? (
              <img 
                src={job.companyLogo} 
                alt={job.company} 
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-gray-400 font-semibold">{job.company?.charAt(0) || 'C'}</span>
            )}
          </div>
        </div>
        
        {/* Rating on right side of header */}
        <div className="absolute top-3 right-3 bg-white rounded py-1 px-2 flex items-center gap-1 text-xs font-semibold shadow-sm">
          <span>4.5</span>
          <span className="text-yellow-400">★</span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4 pt-6">
        {/* Job Title and Company */}
        <h3 className="font-semibold text-gray-800 text-lg mb-1">{job.role}</h3>
        <p className="text-gray-600 text-sm mb-3">{job.company}</p>
        
        {/* Job Location */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
          </svg>
          <span>{job.location}</span>
        </div>
        
        {/* Job Experience */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
          <span>{job.tags?.includes('Fresher') ? 'Fresher' : job.tags?.find(tag => tag.includes('yrs')) || 'Experience'}</span>
        </div>
        
        {/* Salary Information */}
        <div className="flex justify-between items-center my-3">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
            </svg>
            <span className="text-green-600 font-medium">{job.salary}</span>
          </div>
          <div className="text-xs text-gray-500">{job.isRemote ? 'Remote' : 'On-site'}</div>
        </div>
        
        {/* Footer with deadline and apply button */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
          <div className="text-xs text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            {job.deadline}
          </div>
          <Link to={`/jobs/${job.id}/details`}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded transition duration-300">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
      
      {/* Easy Apply Badge */}
      {job.isActivelyHiring && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
          Easy Apply
        </div>
      )}
      
      {/* New Badge - can be conditionally shown */}
      {job.isNew && (
        <div className="absolute top-3 right-12 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
          New
        </div>
      )}
    </div>
  );
};

export default JobCard;