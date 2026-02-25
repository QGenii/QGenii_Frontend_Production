import React from 'react';
import { Link, useParams } from 'react-router-dom';
import JobDetailView from './JobDetailView';

// Sample similar job opportunities data
const similarJobsData = [
  {
    id: '1',
    role: 'Software Developer',
    company: 'Tech Solutions',
    location: 'Bangalore',
    badge: 'Actively Hiring',
    tags: ['3-5 Y', 'Frontend'],
    applied: '120+ applied'
  },
  {
    id: '2',
    role: 'Frontend Engineer',
    company: 'Web Innovations',
    location: 'Remote',
    badge: 'New',
    tags: ['1-3 Y', 'React'],
    applied: '45+ applied'
  },
  {
    id: '3',
    role: 'UI Developer',
    company: 'Design Masters',
    location: 'Mumbai',
    badge: 'Actively Hiring',
    tags: ['2-4 Y', 'UI/UX'],
    applied: '67+ applied'
  },
  {
    id: '4',
    role: 'Full Stack Developer',
    company: 'TechGuru',
    location: 'Delhi',
    badge: 'New',
    tags: ['3-5 Y', 'MERN'],
    applied: '89+ applied'
  }
];

// Sample recommended jobs based on profile
const recommendedJobsData = [
  {
    id: '1',
    role: 'Senior Frontend Developer',
    company: 'CodeMasters',
    location: 'Bangalore',
    badge: 'Recommended',
    tags: ['5-7 Y', 'React', 'Vue'],
    applied: '32+ applied'
  },
  {
    id: '2',
    role: 'UI/UX Engineer',
    company: 'Design Hub',
    location: 'Remote',
    badge: 'Perfect Match',
    tags: ['3-5 Y', 'Figma'],
    applied: '54+ applied'
  },
  {
    id: '3',
    role: 'JavaScript Developer',
    company: 'WebTech',
    location: 'Hyderabad',
    badge: 'Recommended',
    tags: ['2-4 Y', 'JS', 'TS'],
    applied: '78+ applied'
  },
  {
    id: '4',
    role: 'React Developer',
    company: 'AppCraft',
    location: 'Remote',
    badge: 'Perfect Match',
    tags: ['3-6 Y', 'Redux'],
    applied: '41+ applied'
  }
];

const JobDetails = () => {
  const { id } = useParams();
  
  return (
    <div>
        <div
  style={{
    width: '100%',
    height: '258px',
    backgroundImage: 'url("/3335abfeb0d4eb694cf21ced06368b1db1053ddb.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Optional overlay content */}
</div>
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Upper Section - Use JobDetailView Component */}
      <div className="mb-6">
        <JobDetailView />
      </div>
      
      {/* Apply Button */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <Link to={`/jobs/${id}/apply`}>
          <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
            Apply for this Position
          </button>
        </Link>
      </div>
      
      {/* Lower Sections - Similar Job Cards, Recommended Jobs, etc. */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Similar Job Opportunities */}
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-6">Similar Job Opportunities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {similarJobsData.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                {/* Badge */}
                <div className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 text-center">
                  {job.badge}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{job.role}</h3>
                  <p className="text-xs text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex gap-1 mb-2">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-xs px-1.5 py-0.5 rounded text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">{job.applied}</div>
                  <button className="w-full mt-2 bg-indigo-600 text-white text-xs py-1.5 rounded hover:bg-indigo-700">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommended Jobs Based on Profile */}
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Recommended Jobs For YOU</h2>
          <p className="text-sm text-gray-600 mb-4">Based on <span className="text-indigo-600 font-medium">CodeIQGenius</span> Profile</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedJobsData.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                {/* Badge */}
                <div className="bg-orange-500 text-white text-xs font-medium px-3 py-1 text-center">
                  {job.badge}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{job.role}</h3>
                  <p className="text-xs text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex gap-1 mb-2">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-xs px-1.5 py-0.5 rounded text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">{job.applied}</div>
                  <button className="w-full mt-2 bg-indigo-600 text-white text-xs py-1.5 rounded hover:bg-indigo-700">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              View All →
            </button>
          </div>
        </div>
        
        {/* Reviews */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-6">Reviews</h2>
          <div className="flex justify-center items-center gap-1">
            <button className="h-2 w-2 rounded-full bg-indigo-600"></button>
            <button className="h-2 w-2 rounded-full bg-gray-300"></button>
            <button className="h-2 w-2 rounded-full bg-gray-300"></button>
            <button className="h-2 w-2 rounded-full bg-gray-300"></button>
            <button className="h-2 w-2 rounded-full bg-gray-300"></button>
          </div>
          <div className="h-16 flex items-center justify-center text-gray-500">
            No reviews available yet
          </div>
        </div>
        
        {/* FAQs */}
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-6">FAQs</h2>
          <div className="text-gray-500 text-center py-4">
            No FAQs available for this job
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default JobDetails;
