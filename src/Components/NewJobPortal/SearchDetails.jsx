import React, { useState } from 'react';
import JobCardList from './JobCardList';
import JobDetailView from './JobDetailView';

const SearchDetails = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  
  // Filter states
  const [workType, setWorkType] = useState({
    inOffice: false,
    remote: false,
    hybrid: false,
    fieldWork: false,
  });
  
  const [locations, setLocations] = useState({
    bangalore: false,
    pune: false,
    mumbai: false,
    delhi: false,
    chennai: false,
    kolkata: false,
    hyderabad: false
  });
  
  const [experienceLevel, setExperienceLevel] = useState({
    entry: false,
    mid: false,
    senior: false,
    director: false,
  });
  
  const [industryType, setIndustryType] = useState({
    technology: false,
    finance: false,
    healthcare: false,
    education: false,
    retail: false,
    marketing: false,
    government: false,
    manufacturing: false,
  });
  
  const [postedDate, setPostedDate] = useState({
    past24Hours: false,
    pastWeek: false,
    pastMonth: false,
    anyTime: false,
  });
  
  const [jobType, setJobType] = useState({
    fullTime: false,
    partTime: false,
  });
  
  const [careerType, setCareerType] = useState({
    fresher: false,
    professionals: false,
    collegeStudents: false,
  });
  
  // Toggle filter dropdowns
  const toggleFilter = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (category, key) => {
    switch (category) {
      case 'workType':
        setWorkType(prev => ({ ...prev, [key]: !prev[key] }));
        break;
      case 'locations':
        setLocations(prev => ({ ...prev, [key]: !prev[key] }));
        break;
      case 'experienceLevel':
        setExperienceLevel(prev => ({ ...prev, [key]: !prev[key] }));
        break;
      case 'industryType':
        setIndustryType(prev => ({ ...prev, [key]: !prev[key] }));
        break;
      case 'postedDate':
        setPostedDate(prev => ({ ...prev, [key]: !prev[key] }));
        break;
      case 'jobType':
        setJobType(prev => ({ ...prev, [key]: !prev[key] }));
        break;
      case 'careerType':
        setCareerType(prev => ({ ...prev, [key]: !prev[key] }));
        break;
      default:
        break;
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle apply button click
  const handleApplyFilters = () => {
    // Implement filter logic
    console.log('Filters applied');
    setActiveFilter(null);
  };
  
  // Simulate job selection
  const handleJobSelect = (jobId) => {
    setSelectedJob(jobId);
  };

  return (
    <div style={{ position: 'relative' }}>
<div
  style={{
    width: '100%',
    height: '258px',
    backgroundImage: 'url("/434e85d5e148cd711eadb8d438fb3c307e0b6ee3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Optional overlay content */}
</div>
    <div className="bg-gray-100 min-h-screen">


      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6 max-w-4xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search for jobs"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Filter Pills with Dropdown Functionality */}
        <div className="mb-6 relative">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`bg-white border ${activeFilter === 'workType' ? 'border-indigo-500 text-indigo-600' : 'border-gray-300'} rounded-full px-4 py-1.5 text-sm flex items-center gap-2`}
              onClick={() => toggleFilter('workType')}
            >
              Work Type 
              <svg className={`w-4 h-4 transition-transform ${activeFilter === 'workType' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button 
              className={`bg-white border ${activeFilter === 'salary' ? 'border-indigo-500 text-indigo-600' : 'border-gray-300'} rounded-full px-4 py-1.5 text-sm flex items-center gap-2`}
              onClick={() => toggleFilter('salary')}
            >
              Salary 
              <svg className={`w-4 h-4 transition-transform ${activeFilter === 'salary' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button 
              className={`bg-white border ${activeFilter === 'location' ? 'border-indigo-500 text-indigo-600' : 'border-gray-300'} rounded-full px-4 py-1.5 text-sm flex items-center gap-2`}
              onClick={() => toggleFilter('location')}
            >
              Location 
              <svg className={`w-4 h-4 transition-transform ${activeFilter === 'location' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button 
              className={`bg-white border ${activeFilter === 'industry' ? 'border-indigo-500 text-indigo-600' : 'border-gray-300'} rounded-full px-4 py-1.5 text-sm flex items-center gap-2`}
              onClick={() => toggleFilter('industry')}
            >
              Industry 
              <svg className={`w-4 h-4 transition-transform ${activeFilter === 'industry' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button 
              className={`bg-white border ${activeFilter === 'postedDate' ? 'border-indigo-500 text-indigo-600' : 'border-gray-300'} rounded-full px-4 py-1.5 text-sm flex items-center gap-2`}
              onClick={() => toggleFilter('postedDate')}
            >
              Posted date 
              <svg className={`w-4 h-4 transition-transform ${activeFilter === 'postedDate' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button 
              className={`bg-white border ${activeFilter === 'experienceLevel' ? 'border-indigo-500 text-indigo-600' : 'border-gray-300'} rounded-full px-4 py-1.5 text-sm flex items-center gap-2`}
              onClick={() => toggleFilter('experienceLevel')}
            >
              Experience level 
              <svg className={`w-4 h-4 transition-transform ${activeFilter === 'experienceLevel' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button 
              className={`bg-white border ${activeFilter === 'careerType' ? 'border-indigo-500 text-indigo-600' : 'border-gray-300'} rounded-full px-4 py-1.5 text-sm flex items-center gap-2`}
              onClick={() => toggleFilter('careerType')}
            >
              Career Type 
              <svg className={`w-4 h-4 transition-transform ${activeFilter === 'careerType' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          
          {/* Filter Dropdown Panels */}
          {activeFilter && (
            <div className="absolute z-20 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-3xl">
              {/* Work Type Filter */}
              {activeFilter === 'workType' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={workType.inOffice}
                      onChange={() => handleCheckboxChange('workType', 'inOffice')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>In Office</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={workType.remote}
                      onChange={() => handleCheckboxChange('workType', 'remote')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Remote</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={workType.hybrid}
                      onChange={() => handleCheckboxChange('workType', 'hybrid')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Hybrid</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={workType.fieldWork}
                      onChange={() => handleCheckboxChange('workType', 'fieldWork')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Field work</span>
                  </label>
                </div>
              )}
              
              {/* Salary Filter */}
              {activeFilter === 'salary' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="minimum" className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum
                    </label>
                    <input
                      type="text"
                      id="minimum"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      placeholder="₹"
                    />
                  </div>
                  <div>
                    <label htmlFor="maximum" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum
                    </label>
                    <input
                      type="text"
                      id="maximum"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      placeholder="₹"
                    />
                  </div>
                </div>
              )}
              
              {/* Location Filter */}
              {activeFilter === 'location' && (
                <div>
                  <div className="mb-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Search Cities"
                      />
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(locations).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={value}
                          onChange={() => handleCheckboxChange('locations', key)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="capitalize">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Industry Filter */}
              {activeFilter === 'industry' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(industryType).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={value}
                        onChange={() => handleCheckboxChange('industryType', key)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {/* Posted Date Filter */}
              {activeFilter === 'postedDate' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={postedDate.past24Hours}
                      onChange={() => handleCheckboxChange('postedDate', 'past24Hours')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Past 24 Hours</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={postedDate.pastWeek}
                      onChange={() => handleCheckboxChange('postedDate', 'pastWeek')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Past Week</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={postedDate.pastMonth}
                      onChange={() => handleCheckboxChange('postedDate', 'pastMonth')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Past Month</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={postedDate.anyTime}
                      onChange={() => handleCheckboxChange('postedDate', 'anyTime')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Any Time</span>
                  </label>
                </div>
              )}
              
              {/* Experience Level Filter */}
              {activeFilter === 'experienceLevel' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={experienceLevel.entry}
                      onChange={() => handleCheckboxChange('experienceLevel', 'entry')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Entry level</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={experienceLevel.mid}
                      onChange={() => handleCheckboxChange('experienceLevel', 'mid')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Mid level</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={experienceLevel.senior}
                      onChange={() => handleCheckboxChange('experienceLevel', 'senior')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Senior level</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={experienceLevel.director}
                      onChange={() => handleCheckboxChange('experienceLevel', 'director')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Director</span>
                  </label>
                </div>
              )}
              
              {/* Career Type Filter */}
              {activeFilter === 'careerType' && (
                <div>
                  <p className="text-sm mb-3">Select your user type</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={careerType.fresher}
                        onChange={() => handleCheckboxChange('careerType', 'fresher')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Fresher</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={careerType.professionals}
                        onChange={() => handleCheckboxChange('careerType', 'professionals')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Professionals</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={careerType.collegeStudents}
                        onChange={() => handleCheckboxChange('careerType', 'collegeStudents')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>College Students</span>
                    </label>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleApplyFilters} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Job Listings and Detail View */}
          <div className="flex-1 flex flex-col md:flex-row gap-6">
            {/* Job List */}
            <div className="flex-1" style={{ maxWidth: '350px' }}>
              {/* Custom job list for demo with onClick */}
              <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                {/* Job Card 1 - Selected */}
                <div 
                  className="border-2 border-purple-300 rounded-lg p-4 relative cursor-pointer"
                  onClick={() => handleJobSelect('1')}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium">Software Engineer</h3>
                      <p className="text-sm text-gray-600">Tech Corp</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        New Delhi, India
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                        </svg>
                        18 applicants
                      </div>
                      <div className="flex gap-1 mt-2">
                        <span className="bg-gray-100 text-xs px-2 py-0.5 rounded">Fresher</span>
                        <span className="bg-gray-100 text-xs px-2 py-0.5 rounded">Undergraduate</span>
                        <span className="text-gray-500 text-xs py-0.5">+5</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Days Left Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center text-xs text-red-500 bg-white rounded-md px-2 py-1 shadow-sm border border-red-100">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      3 days left
                    </div>
                  </div>
                  
                  {/* HR Avatar */}
                  <div className="absolute -top-3 -right-3">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-purple-300 overflow-hidden">
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
                
                {/* 6 more job cards - unselected */}
                {[2, 3, 4, 5, 6, 7].map(id => (
                  <div 
                    key={id}
                    className="border border-gray-200 rounded-lg p-4 relative cursor-pointer hover:border-gray-300"
                    onClick={() => handleJobSelect(id.toString())}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium">Software Engineer</h3>
                        <p className="text-sm text-gray-600">Tech Corp</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                          </svg>
                          New Delhi, India
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                          </svg>
                          18 applicants
                        </div>
                        <div className="flex gap-1 mt-2">
                          <span className="bg-gray-100 text-xs px-2 py-0.5 rounded">Fresher</span>
                          <span className="bg-gray-100 text-xs px-2 py-0.5 rounded">Undergraduate</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Days Left Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center text-xs text-red-500 bg-white rounded-md px-2 py-1 shadow-sm border border-red-100">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        3 days left
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Job Detail View */}
            <div className="flex-1">
              <JobDetailView />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SearchDetails;
