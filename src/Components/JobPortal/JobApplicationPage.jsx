import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Breadcrumb } from 'react-bootstrap';
// import MainNavbar from '../MainNavbar';
import JobApplicationForm from './JobApplicationForm';
import './JobApplication.css';

const JobApplicationPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch job details
    const fetchJobDetails = async () => {
      // In a real app, you would fetch from an API
      const mockJob = {
        id,
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'New Delhi, India',
        type: 'Full-time'
      };

      setTimeout(() => {
        setJob(mockJob);
        setLoading(false);
      }, 500);
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div>
        {/* <MainNavbar /> */}
        <Container className="py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading job details...</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <MainNavbar />
      <Container>
        <Breadcrumb className="mt-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/jobs" }}>
            Jobs
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/jobs/${id}/details` }}>
            Job Details
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Apply</Breadcrumb.Item>
        </Breadcrumb>
        
        <JobApplicationForm />
      </Container>
    </div>
  );
};

export default JobApplicationPage;