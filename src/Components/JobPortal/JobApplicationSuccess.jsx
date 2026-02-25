import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import MainNavbar from '../MainNavbar';
import { AiOutlineCheck } from 'react-icons/ai';

const JobApplicationSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this would be an API call to fetch job details
  useEffect(() => {
    // Mock API fetch
    const fetchJobDetails = () => {
      // Sample job data - in a real app, this would come from an API
      const jobData = {
        id: parseInt(id),
        title: 'Software Engineer',
        company: 'Tech Corp',
      };

      setTimeout(() => {
        setJob(jobData);
        setLoading(false);
      }, 500); // Simulate API delay
    };

    fetchJobDetails();
  }, [id]);

  const handleViewApplication = () => {
    // In a real app, this would navigate to an application tracking page
    navigate('/jobs');
  };

  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  if (loading) {
    return (
      <div className="job-application-success-page">
        {/* <MainNavbar /> */}
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-application-success-page">
      {/* <MainNavbar /> */}
      
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5 text-center">
                <h2 className="mb-4">Application Submitted</h2>
                
                <div className="success-icon mb-4">
                  <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                    style={{
                      width: '100px', 
                      height: '100px',
                      backgroundColor: '#e6ffee',
                      border: '2px solid #4CAF50'
                    }}>
                    <AiOutlineCheck style={{ 
                      fontSize: '3rem', 
                      color: '#4CAF50' 
                    }}/>
                  </div>
                </div>
                
                <p className="mb-4 lead">
                  You have successfully applied for the<br />
                  <strong>{job.title}</strong> position at <strong>{job.company}</strong>
                </p>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-primary py-2"
                    onClick={handleViewApplication}
                    style={{ backgroundColor: '#0C316E', borderColor: '#0C316E' }}
                  >
                    View Application
                  </button>
                  
                  <button 
                    className="btn btn-outline-secondary py-2"
                    onClick={handleBackToJobs}
                  >
                    Back to Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationSuccess;