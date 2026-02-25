import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import MainNavbar from '../MainNavbar';
import JobCard from './JobCard';
import './JobPortal.css';

const JobPortalPage = () => {
  // State for jobs, filters, and search
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Filter states
  const [jobTypeFilters, setJobTypeFilters] = useState([]);
  const [postedDateFilter, setPostedDateFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [salaryFilter, setSalaryFilter] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('Recency');

  // Mobile filter collapse states
  const [expandedFilter, setExpandedFilter] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

  // Remote filter dropdown state
  const [showRemoteDropdown, setShowRemoteDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Detect window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle filter expansion on mobile
  const toggleFilter = (filterName) => {
    if (expandedFilter === filterName) {
      setExpandedFilter('');
    } else {
      setExpandedFilter(filterName);
    }
  };

  // Mock data for jobs
  useEffect(() => {
    // Simulate API call to fetch jobs
    setTimeout(() => {
      const mockJobs = [
        {
          id: '1',
          title: 'Software Engineer',
          company: 'Tech Corp',
          location: 'Remote',
          type: 'Full-time',
          postedDate: '2023-09-15',
          industry: 'Technology',
          experienceLevel: 'Mid-Senior',
          salary: '80K-100K'
        },
        {
          id: '2',
          title: 'Product Designer',
          company: 'Design Studio',
          location: 'New York, USA',
          type: 'Full-time',
          postedDate: '2023-09-18',
          industry: 'Design',
          experienceLevel: 'Senior',
          salary: '90K-120K'
        },
        // {
        //   id: '3',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'Remote',
        //   type: 'Part-time',
        //   postedDate: '2023-09-10',
        //   industry: 'Design',
        //   experienceLevel: 'Mid-level',
        //   salary: '60K-80K'
        // },
        // {
        //   id: '4',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'London, UK',
        //   type: 'Full-time',
        //   postedDate: '2023-09-05',
        //   industry: 'Marketing',
        //   experienceLevel: 'Junior',
        //   salary: '50K-70K'
        // },
        // {
        //   id: '5',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'Remote',
        //   type: 'Contract',
        //   postedDate: '2023-09-20',
        //   industry: 'Technology',
        //   experienceLevel: 'Senior',
        //   salary: '100K-130K'
        // },
        // {
        //   id: '6',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'Berlin, Germany',
        //   type: 'Full-time',
        //   postedDate: '2023-09-12',
        //   industry: 'Design',
        //   experienceLevel: 'Mid-level',
        //   salary: '70K-90K'
        // },
        // {
        //   id: '7',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'Remote',
        //   type: 'Full-time',
        //   postedDate: '2023-09-08',
        //   industry: 'Technology',
        //   experienceLevel: 'Senior',
        //   salary: '90K-110K'
        // },
        // {
        //   id: '8',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'San Francisco, USA',
        //   type: 'Part-time',
        //   postedDate: '2023-09-03',
        //   industry: 'Marketing',
        //   experienceLevel: 'Junior',
        //   salary: '40K-60K'
        // },
        // {
        //   id: '9',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'Remote',
        //   type: 'Contract',
        //   postedDate: '2023-09-17',
        //   industry: 'Healthcare',
        //   experienceLevel: 'Mid-level',
        //   salary: '65K-85K'
        // },
        // {
        //   id: '10',
        //   title: 'Product Designer',
        //   company: 'Design Studio',
        //   location: 'Toronto, Canada',
        //   type: 'Full-time',
        //   postedDate: '2023-09-01',
        //   industry: 'Manufacturing',
        //   experienceLevel: 'Senior',
        //   salary: '85K-105K'
        // }
      ];

      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...jobs];

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job => 
        job?.title.toLowerCase().includes(term) || 
        job?.company.toLowerCase().includes(term) ||
        job?.location.toLowerCase().includes(term)
      );
    }

    // Job Type filter
    if (jobTypeFilters.length > 0) {
      result = result.filter(job => jobTypeFilters.includes(job.type));
    }

    // Posted Date filter
    if (postedDateFilter) {
      const today = new Date();
      
      switch(postedDateFilter) {
        case 'Past 24 Hours':
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          result = result.filter(job => new Date(job.postedDate) >= yesterday);
          break;
        case 'Past Week':
          const lastWeek = new Date(today);
          lastWeek.setDate(lastWeek.getDate() - 7);
          result = result.filter(job => new Date(job.postedDate) >= lastWeek);
          break;
        case 'Past Month':
          const lastMonth = new Date(today);
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          result = result.filter(job => new Date(job.postedDate) >= lastMonth);
          break;
        case 'Any Time':
        default:
          // No filter applied
          break;
      }
    }

    // Industry filter
    if (industryFilter) {
      result = result.filter(job => job.industry === industryFilter);
    }

    // Experience Level filter
    if (experienceLevelFilter) {
      result = result.filter(job => job.experienceLevel === experienceLevelFilter);
    }

    // Location filter
    if (locationFilter) {
      switch(locationFilter) {
        case 'Remote Only':
          result = result.filter(job => job.location === 'Remote');
          break;
        case 'Hybrid':
          result = result.filter(job => job.location.includes('Hybrid'));
          break;
        case 'On-site':
          result = result.filter(job => !job.location.includes('Remote') && !job.location.includes('Hybrid'));
          break;
        default:
          // No filter applied
          break;
      }
    }
    
    // Salary filter
    if (salaryFilter.min || salaryFilter.max) {
      result = result.filter(job => {
        // Extract numeric values from salary ranges (e.g., "80K-100K")
        const jobSalaryParts = job.salary.split('-');
        const jobMinSalary = parseInt(jobSalaryParts[0].replace(/[^0-9]/g, '')) * (jobSalaryParts[0].includes('K') ? 1000 : 1);
        const jobMaxSalary = parseInt(jobSalaryParts[1].replace(/[^0-9]/g, '')) * (jobSalaryParts[1].includes('K') ? 1000 : 1);
        
        const filterMinSalary = salaryFilter.min ? parseInt(salaryFilter.min) : 0;
        const filterMaxSalary = salaryFilter.max ? parseInt(salaryFilter.max) : Infinity;
        
        return jobMaxSalary >= filterMinSalary && jobMinSalary <= filterMaxSalary;
      });
    }

    // Sort the filtered results
    if (sortBy) {
      switch(sortBy) {
        case 'Recency':
          result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
          break;
        case 'Highest Salary':
          result.sort((a, b) => {
            const aSalary = parseInt(a.salary.split('-')[1].replace(/[^0-9]/g, ''));
            const bSalary = parseInt(b.salary.split('-')[1].replace(/[^0-9]/g, ''));
            return bSalary - aSalary;
          });
          break;
        case 'Most Relevant':
          // For demo purposes, we're just using the default order
          break;
        case 'A to Z':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          // Default sort by recency
          result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      }
    }

    setFilteredJobs(result);
  }, [jobs, searchTerm, jobTypeFilters, postedDateFilter, industryFilter, experienceLevelFilter, locationFilter, sortBy]);

  const handleJobTypeChange = (e) => {
    const { value, checked } = e.target;
    setJobTypeFilters(prev => 
      checked ? [...prev, value] : prev.filter(type => type !== value)
    );
  };

  const handleRemoteFilterChange = (value) => {
    setLocationFilter(value);
    setShowRemoteDropdown(false);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };

  return (
    <div className="job-portal bg-gray-100">
      {/* <MainNavbar /> */}
      
      <div className="search-container bg-light py-4">
        <Container>
          <div className="search-bar">
            <Form.Control
              type="search"
              placeholder="Search for jobs"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <Button variant="primary" className="search-btn">
              Search
            </Button>
          </div>
        </Container>
      </div>
      
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2 className="section-title mb-0">Job Listings</h2>
          
          <div className="d-flex gap-3 filter-actions">
            <div className="dropdown-container">
              <button 
                className={`filter-dropdown-btn ${locationFilter ? 'active' : ''}`}
                onClick={() => {
                  setShowRemoteDropdown(!showRemoteDropdown);
                  setShowSortDropdown(false);
                }}
              >
                Remote {locationFilter ? '▲' : '▼'}
              </button>
              
              {showRemoteDropdown && (
                <div className="filter-dropdown-menu">
                  <div 
                    className={`dropdown-item ${locationFilter === 'Remote Only' ? 'active' : ''}`}
                    onClick={() => handleRemoteFilterChange('Remote Only')}
                  >
                    Remote Only
                  </div>
                  <div 
                    className={`dropdown-item ${locationFilter === 'Hybrid' ? 'active' : ''}`}
                    onClick={() => handleRemoteFilterChange('Hybrid')}
                  >
                    Hybrid
                  </div>
                  <div 
                    className={`dropdown-item ${locationFilter === 'On-site' ? 'active' : ''}`}
                    onClick={() => handleRemoteFilterChange('On-site')}
                  >
                    On-site
                  </div>
                </div>
              )}
            </div>
            
            <div className="dropdown-container">
              <button 
                className="filter-dropdown-btn"
                onClick={() => {
                  setShowSortDropdown(!showSortDropdown);
                  setShowRemoteDropdown(false);
                }}
              >
                Sort by {sortBy ? '▲' : '▼'}
              </button>
              
              {showSortDropdown && (
                <div className="filter-dropdown-menu">
                  <div 
                    className={`dropdown-item ${sortBy === 'Recency' ? 'active' : ''}`}
                    onClick={() => handleSortChange('Recency')}
                  >
                    Recency
                  </div>
                  <div 
                    className={`dropdown-item ${sortBy === 'Highest Salary' ? 'active' : ''}`}
                    onClick={() => handleSortChange('Highest Salary')}
                  >
                    Highest Salary
                  </div>
                  <div 
                    className={`dropdown-item ${sortBy === 'Most Relevant' ? 'active' : ''}`}
                    onClick={() => handleSortChange('Most Relevant')}
                  >
                    Most Relevant
                  </div>
                  <div 
                    className={`dropdown-item ${sortBy === 'A to Z' ? 'active' : ''}`}
                    onClick={() => handleSortChange('A to Z')}
                  >
                    A to Z
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Row>
          <Col md={9} className="mb-4">
            <div className="job-listings">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading job listings...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-5">
                  <p>No jobs found matching your criteria.</p>
                  <Button 
                    variant="outline-primary"
                    onClick={() => {
                      setSearchTerm('');
                      setJobTypeFilters([]);
                      setPostedDateFilter('');
                      setIndustryFilter('');
                      setExperienceLevelFilter('');
                      setLocationFilter('');
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </div>
          </Col>
          
          <Col md={3} className="mb-4">
            <div className="filter-sidebar">
              <div className={`filter-section ${expandedFilter === 'jobType' ? 'active' : ''}`}>
                <h5 
                  className="filter-title" 
                  onClick={() => isMobileView && toggleFilter('jobType')}
                >
                  Job Type
                  {isMobileView && <span className="filter-toggle-icon">{expandedFilter === 'jobType' ? '-' : '+'}</span>}
                </h5>
                <div className="filter-options" style={isMobileView && expandedFilter !== 'jobType' ? {display: 'none'} : {}}>
                  <Form.Check 
                    type="checkbox"
                    id="full-time"
                    label="Full-Time"
                    value="Full-time"
                    onChange={handleJobTypeChange}
                    checked={jobTypeFilters.includes('Full-time')}
                  />
                  <Form.Check 
                    type="checkbox"
                    id="part-time"
                    label="Part-Time"
                    value="Part-time"
                    onChange={handleJobTypeChange}
                    checked={jobTypeFilters.includes('Part-time')}
                  />
                    <Form.Check 
                    type="checkbox"
                    id="internship"
                    label="Internship"
                    value="Internship"
                    onChange={handleJobTypeChange}
                    checked={jobTypeFilters.includes('Internship')}
                  />
                    <Form.Check   
                    type="checkbox"
                    id="Freelancing"
                    label="Freelancing"
                    value="Freelancing"
                    onChange={handleJobTypeChange}
                    checked={jobTypeFilters.includes('Freelancing')}
                  />
                </div>
              </div>
              
              <div className={`filter-section ${expandedFilter === 'postedDate' ? 'active' : ''}`}>
                <h5 
                  className="filter-title" 
                  onClick={() => isMobileView && toggleFilter('postedDate')}
                >
                  Posted Date
                  {isMobileView && <span className="filter-toggle-icon">{expandedFilter === 'postedDate' ? '-' : '+'}</span>}
                </h5>
                <div className="filter-options" style={isMobileView && expandedFilter !== 'postedDate' ? {display: 'none'} : {}}>
                  <Form.Check 
                    type="radio"
                    name="postedDate"
                    id="past-24-hours"
                    label="Past 24 Hours"
                    value="Past 24 Hours"
                    onChange={e => setPostedDateFilter(e.target.value)}
                    checked={postedDateFilter === 'Past 24 Hours'}
                  />
                  <Form.Check 
                    type="radio"
                    name="postedDate"
                    id="past-week"
                    label="Past Week"
                    value="Past Week"
                    onChange={e => setPostedDateFilter(e.target.value)}
                    checked={postedDateFilter === 'Past Week'}
                  />
                  <Form.Check 
                    type="radio"
                    name="postedDate"
                    id="past-month"
                    label="Past Month"
                    value="Past Month"
                    onChange={e => setPostedDateFilter(e.target.value)}
                    checked={postedDateFilter === 'Past Month'}
                  />
                  <Form.Check 
                    type="radio"
                    name="postedDate"
                    id="any-time"
                    label="Any Time"
                    value="Any Time"
                    onChange={e => setPostedDateFilter(e.target.value)}
                    checked={postedDateFilter === 'Any Time'}
                  />
                </div>
              </div>
              
              <div className={`filter-section ${expandedFilter === 'industry' ? 'active' : ''}`}>
                <h5 
                  className="filter-title" 
                  onClick={() => isMobileView && toggleFilter('industry')}
                >
                  Industry
                  {isMobileView && <span className="filter-toggle-icon">{expandedFilter === 'industry' ? '-' : '+'}</span>}
                </h5>
                <div className="filter-options" style={isMobileView && expandedFilter !== 'industry' ? {display: 'none'} : {}}>
                  <Form.Check 
                    type="radio"
                    name="industry"
                    id="technology"
                    label="Technology"
                    value="Technology"
                    onChange={e => setIndustryFilter(e.target.value)}
                    checked={industryFilter === 'Technology'}
                  />
                  <Form.Check 
                    type="radio"
                    name="industry"
                    id="healthcare"
                    label="Healthcare"
                    value="Healthcare"
                    onChange={e => setIndustryFilter(e.target.value)}
                    checked={industryFilter === 'Healthcare'}
                  />
                  <Form.Check 
                    type="radio"
                    name="industry"
                    id="design"
                    label="Design"
                    value="Design"
                    onChange={e => setIndustryFilter(e.target.value)}
                    checked={industryFilter === 'Design'}
                  />
                  <Form.Check 
                    type="radio"
                    name="industry"
                    id="marketing"
                    label="Marketing"
                    value="Marketing"
                    onChange={e => setIndustryFilter(e.target.value)}
                    checked={industryFilter === 'Marketing'}
                  />
                  <Form.Check 
                    type="radio"
                    name="industry"
                    id="manufacturing"
                    label="Manufacturing"
                    value="Manufacturing"
                    onChange={e => setIndustryFilter(e.target.value)}
                    checked={industryFilter === 'Manufacturing'}
                  />
                </div>
              </div>
              
              <div className={`filter-section ${expandedFilter === 'experience' ? 'active' : ''}`}>
                <h5 
                  className="filter-title" 
                  onClick={() => isMobileView && toggleFilter('experience')}
                >
                  Experience Level
                  {isMobileView && <span className="filter-toggle-icon">{expandedFilter === 'experience' ? '-' : '+'}</span>}
                </h5>
                <div className="filter-options" style={isMobileView && expandedFilter !== 'experience' ? {display: 'none'} : {}}>
                  <Form.Check 
                    type="radio"
                    name="experienceLevel"
                    id="junior"
                    label="Junior"
                    value="Junior"
                    onChange={e => setExperienceLevelFilter(e.target.value)}
                    checked={experienceLevelFilter === 'Junior'}
                  />
                  <Form.Check 
                    type="radio"
                    name="experienceLevel"
                    id="mid-level"
                    label="Mid-level"
                    value="Mid-level"
                    onChange={e => setExperienceLevelFilter(e.target.value)}
                    checked={experienceLevelFilter === 'Mid-level'}
                  />
                  <Form.Check 
                    type="radio"
                    name="experienceLevel"
                    id="senior"
                    label="Senior"
                    value="Senior"
                    onChange={e => setExperienceLevelFilter(e.target.value)}
                    checked={experienceLevelFilter === 'Senior'}
                  />
                  <Form.Check 
                    type="radio"
                    name="experienceLevel"
                    id="mid-senior"
                    label="Mid-Senior"
                    value="Mid-Senior"
                    onChange={e => setExperienceLevelFilter(e.target.value)}
                    checked={experienceLevelFilter === 'Mid-Senior'}
                  />
                </div>
              </div>
              
              <div className={`filter-section ${expandedFilter === 'salary' ? 'active' : ''}`}>
                <h5 
                  className="filter-title" 
                  onClick={() => isMobileView && toggleFilter('salary')}
                >
                  Salary Range
                  {isMobileView && <span className="filter-toggle-icon">{expandedFilter === 'salary' ? '-' : '+'}</span>}
                </h5>
                <div className="filter-options" style={isMobileView && expandedFilter !== 'salary' ? {display: 'none'} : {}}>
                  <div className="salary-range-inputs">
                    <div className="salary-range-row">
                      <div className="salary-input-label">Minimum</div>
                      <div className="salary-input-label">Maximum</div>
                    </div>
                    <div className="salary-range-row">
                      <Form.Control 
                        type="text" 
                        placeholder="" 
                        className="salary-input"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                      />
                      <Form.Control 
                        type="text" 
                        placeholder="" 
                        className="salary-input"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                      />
                    </div>
                    <div className="salary-apply-btn-container">
                      <Button 
                        variant="primary" 
                        className="salary-apply-btn"
                        onClick={() => setSalaryFilter({ min: minSalary, max: maxSalary })}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {(jobTypeFilters.length > 0 || postedDateFilter || industryFilter || experienceLevelFilter || locationFilter || salaryFilter.min || salaryFilter.max) && (
                <Button 
                  variant="outline-secondary" 
                  className="clear-filters-btn"
                  onClick={() => {
                    setJobTypeFilters([]);
                    setPostedDateFilter('');
                    setIndustryFilter('');
                    setExperienceLevelFilter('');
                    setLocationFilter('');
                    setMinSalary('');
                    setMaxSalary('');
                    setSalaryFilter({ min: '', max: '' });
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JobPortalPage;