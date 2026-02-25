import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from './JobCard';
import HiringChallenges from './HiringChallenges';
import ReviewSection from './ReviewSection';
import JobCardList from './JobCardList';
import JobDetailView from './JobDetailView';
import './styles.css';

// Sample job data
const jobsData = [
  {
    id: '1',
    role: 'Job Role',
    company: 'Company Name',
    location: 'New Delhi, India',
    isRemote: true,
    tags: ['Fresher', 'Fresher'],
    salary: '2 LPA',
    deadline: '2 days left',
    isActivelyHiring: true,
    category: 'Software Development'
  },
  {
    id: '2',
    role: 'UI/UX Designer',
    company: 'Tech Solutions',
    location: 'Bangalore, India',
    isRemote: true,
    tags: ['Fresher', 'Design'],
    salary: '3.5 LPA',
    deadline: '5 days left',
    isActivelyHiring: true,
    category: 'Design'
  },
  {
    id: '3',
    role: 'Frontend Developer',
    company: 'Web Innovations',
    location: 'Mumbai, India',
    isRemote: false,
    tags: ['React', 'JavaScript', '1-3 yrs'],
    salary: '5 LPA',
    deadline: '3 days left',
    isActivelyHiring: true,
    category: 'Software Development'
  },
  {
    id: '4',
    role: 'Data Analyst',
    company: 'DataTech',
    location: 'Hyderabad, India',
    isRemote: true,
    tags: ['SQL', 'Python', 'Fresher'],
    salary: '4 LPA',
    deadline: '1 day left',
    isActivelyHiring: true,
    category: 'Data Science'
  }
];

const JobLandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeView, setActiveView] = useState('main'); // 'main', 'list', 'detail'
  const categories = ['All', 'Software Development', 'Design', 'Data Science', 'Marketing'];
  
  // Filter jobs based on selected category
  const filteredJobs = selectedCategory === 'All' 
    ? jobsData 
    : jobsData.filter(job => job.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div
  className="relative bg-cover bg-center text-white py-16"
  style={{
    backgroundImage: 'url("/434e85d5e148cd711eadb8d438fb3c307e0b6ee3.jpg")',
  }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative z-10 container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-lg mb-6">Discover opportunities that match your skills and career goals</p>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/jobs/search" 
            className="bg-white text-indigo-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition duration-300"
          >
            Browse Jobs
          </Link>
          <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-indigo-600 transition duration-300">
            For Employers
          </button>
        </div>
      </div>
      <div className="lg:w-2/5">
        <img src="/4a58921945be34a8924c6cd3ab05cf325fec7ef4.png" alt="Job Search" className="w-full max-w-md mx-auto" />
      </div>
    </div>
  </div>
</div>

      {/* Hero Section */}

      
      {/* Added view toggle buttons */}
      <div className="container mx-auto px-4 py-4 flex justify-center gap-4">
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          onClick={() => setActiveView('list')}
        >
          View Job List Example
        </button>
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          onClick={() => setActiveView('detail')}
        >
          View Job Detail Example
        </button>
      </div>

      {/* Job Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-full transition ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
        
        {filteredJobs.length > 0 && (
          <div className="text-center mt-10">
            <button className="bg-white border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md font-medium hover:bg-indigo-50 transition duration-300">
              View All Jobs
            </button>
          </div>
        )}
      </div>
      
      {/* Add the Hiring Challenges Component */}
      <HiringChallenges />
      
      {/* Add the Review Section Component */}
      <ReviewSection />
    </div>
  );
};

export default JobLandingPage;