import React from 'react';
import { Link } from 'react-router-dom';

const JobApplicationSuccess = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted!</h1>
        <p className="text-gray-600 mb-6">
          Your job application has been successfully submitted. We will review your application and get back to you soon.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Link 
            to="/jobs"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Explore More Jobs
          </Link>
          <Link 
            to="/"
            className="text-indigo-600 hover:underline"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationSuccess;
