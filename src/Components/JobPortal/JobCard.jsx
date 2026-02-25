import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEnvironment } from 'react-icons/ai';
import './JobCard.css';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  const handleApplyNow = () => {
    navigate(`/jobs/${job.id}/details`);
  };

  // Get company initial for logo placeholder
  const companyInitial = job.company.charAt(0);

  return (
    <div className="job-card">
      <div className="job-card-content">
        <div className="job-card-left">
          <div className="company-logo">
            {companyInitial}
          </div>
        </div>
        
        <div className="job-card-middle">
          <h5 className="job-title">{job.title}</h5>
          <p className="company-name">{job.company}</p>
          <div className="job-location">
            <AiOutlineEnvironment className="location-icon" />
            <span>{job.location}</span>
          </div>
        </div>
        
        <div className="job-card-right">
          <button 
            className="apply-btn"
            onClick={handleApplyNow}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;