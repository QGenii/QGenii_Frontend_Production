import React from 'react';

// Sample job detail data
const jobDetail = {
  id: '1',
  role: 'Software Engineer',
  company: 'Tech Corp',
  location: 'New Delhi, India',
  updatedDate: '22-9-2025',
  website: 'https://example.com',
  impressions: 136,
  daysLeft: 2,
  eligibility: [
    'Undergraduate',
    'Postgraduate',
    'Engineering Students',
    'Any Specialization',
    'Arts',
    'Commerce Sciences',
    'Other',
    'BCA/MCA'
  ],
  description: `About the Role
We seeking creative and motivated individuals for a UI/UX Designer Internship. This is a fully remote opportunity where you will gain hands-on experience designing user-friendly interfaces and enhancing the user experience on real-world projects. Collaborate with our team of developers and designers to bring digital products to life.`,
  responsibilities: [
    'Create wireframes, prototypes, and user flows for web and mobile applications',
    'Design intuitive and visually appealing UI elements and layouts',
    'Conduct user research and usability testing to inform design decisions',
    'Work closely with developers to ensure design feasibility and implementation',
    'Iterate designs based on feedback and evolving project requirements'
  ],
  requirements: [
    'Basic understanding of UI/UX principles and design thinking',
    'Familiarity with design tools like Figma, Adobe XD, or Sketch',
    'Strong attention to detail and a good sense of aesthetics',
    'Ability to communicate ideas clearly and collaborate remotely',
    'Pursuing or recently completed a degree/course in Design, HCI, or a related field',
    'Portfolio (even academic or personal projects) is a plus'
  ],
  benefits: [
    'Guidance and mentorship from senior designers and developers',
    'Internship Certificate upon successful completion',
    'Flexible working hours with milestone-based tasks',
    'An opportunity to grow your portfolio and showcase your work'
  ],
  isRemote: true,
  salary: '2 LPA',
  experienceLevel: 'Fresher',
  workingDays: '5 days a week',
  employmentType: 'Full-Time',
  jobType: 'Work From Home',
  applicationDeadline: 'Sep 22nd 2025, 12:00AM IST',
  organizerName: 'Name of the organizer',
  organizerEmail: 'xyz123@gmail.com'
};

const JobDetailView = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md mb-4 relative">
        {/* Top Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          <button className="p-1" aria-label="Save">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
          </button>
          <button className="p-1" aria-label="Share">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
            </svg>
          </button>
        </div>
        
        {/* HR Avatar */}
        <div className="absolute top-4 right-24">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 border-2 border-white">
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
        </div>
        
        {/* Job Header */}
        <div className="p-4">
          <div className="flex gap-4 items-start">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
            
            {/* Job Details */}
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{jobDetail.role}</h1>
              <p className="text-gray-600">{jobDetail.company}</p>
              
              {/* Location Badge */}
              <div className="inline-flex items-center gap-1 mt-3 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <span className="text-sm">{jobDetail.location}</span>
              </div>
              
              {/* Updated Date */}
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
                <span>Updated on: {jobDetail.updatedDate}</span>
              </div>
              
              {/* Website */}
              <div className="mt-1">
                <a 
                  href={jobDetail.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <span className="bg-green-500 text-white rounded-full p-0.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                  <span>Official Website</span>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </a>
              </div>
              
              {/* Impressions */}
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                </svg>
                <span>{jobDetail.impressions} impressions</span>
              </div>
            </div>
          </div>
          
          {/* Apply Button Row */}
          <div className="flex items-center justify-between mt-4">
            <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded">
              Easy Apply
            </button>
            
            {/* Days Left Badge */}
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span className="font-medium">{jobDetail.daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Eligibility Card */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-base font-semibold mb-2">Eligibility</h2>
        <div className="grid grid-cols-2 gap-2">
          {jobDetail.eligibility.map((item, index) => (
            <div key={index} className="flex items-center gap-1 text-sm">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Role Description Card */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-base font-semibold mb-2">Role Description</h2>
        <div className="text-sm text-gray-700 space-y-3">
          <p>{jobDetail.description}</p>
          
          <div>
            <h3 className="font-medium mb-1">Key Responsibilities:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {jobDetail.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">What We're Looking For:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {jobDetail.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">What YOU GAIN:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {jobDetail.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <p className="font-medium">
            Location: {jobDetail.isRemote ? 'Fully Remote' : jobDetail.location}
          </p>
        </div>
      </div>
      
      {/* Contact Organizers Card */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-base font-semibold mb-3">Contact the organisers</h2>
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1.5 px-3 rounded transition duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
          </svg>
          Send Queries to Organisers
        </button>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden">
              <img 
                src="/assets/recruiter-avatar.jpg" 
                alt="Organizer" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="text-sm">
              <p className="text-gray-500">{jobDetail.organizerName}</p>
              <p className="text-gray-700">{jobDetail.organizerEmail}</p>
            </div>
          </div>
          <button className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded">
            HR Details
          </button>
        </div>
      </div>
      
      {/* Additional Information Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Application Deadline */}
          <div className="bg-red-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <div className="mb-2">
              <svg className="w-8 h-8 text-black mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="font-medium text-base mb-1">Application Deadline</h3>
            <p className="text-sm">{jobDetail.applicationDeadline}</p>
          </div>
          
          {/* Salary */}
          <div className="bg-green-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <div className="mb-2">
              <svg className="w-8 h-8 text-black mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="font-medium text-base mb-1">Salary</h3>
            <p className="text-sm">{jobDetail.salary}</p>
          </div>
          
          {/* Experience Level */}
          <div className="bg-purple-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <div className="mb-2">
              <svg className="w-8 h-8 text-black mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
            </div>
            <h3 className="font-medium text-base mb-1">Experience Level</h3>
            <p className="text-sm">{jobDetail.experienceLevel}</p>
          </div>
          
          {/* Working Days */}
          <div className="bg-cyan-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <div className="mb-2">
              <svg className="w-8 h-8 text-black mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="font-medium text-base mb-1">Working Days</h3>
            <p className="text-sm">{jobDetail.workingDays}</p>
          </div>
          
          {/* Employment Type */}
          <div className="bg-yellow-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <div className="mb-2">
              <svg className="w-8 h-8 text-black mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028a4.96 4.96 0 00-1.535-.642A5.002 5.002 0 0010 11z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="font-medium text-base mb-1">Employment Type</h3>
            <p className="text-sm">{jobDetail.employmentType}</p>
          </div>
          
          {/* Job Type */}
          <div className="bg-pink-200 rounded-lg p-4 flex flex-col items-center justify-center text-center relative">
            <div className="mb-2">
              <svg className="w-8 h-8 text-black mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="font-medium text-base mb-1">Job Type</h3>
            <p className="text-sm">{jobDetail.jobType}</p>
            
            {/* Recruiter Avatar */}
            <div className="absolute bottom-4 right-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white overflow-hidden">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailView;

