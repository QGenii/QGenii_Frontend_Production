import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Breadcrumb } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaClock } from 'react-icons/fa';
// import MainNavbar from '../MainNavbar';
import './JobDetails.css';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch job details
    const fetchJobDetails = async () => {
      // In a real app, you would fetch from an API
      setTimeout(() => {
        setJob({
          id,
          title: 'Software Engineer',
          company: 'Tech Corp',
          location: 'New Delhi, India',
          type: 'Full Time',
          workplace: 'On-site',
          salary: '₹100k - ₹120k',
          posted: '3 days ago',
          applicants: '18 applicants',
          deadline: '30 days remaining',
          description: `We are looking for a passionate Software Engineer to design, develop and install software solutions.
Software Engineer responsibilities include gathering user requirements, defining system functionality and writing code in various languages, like Java, Ruby on Rails or .NET programming languages (e.g. C++ or JavaScript). Our ideal candidates are familiar with the software development life cycle (SDLC) from preliminary system analysis to tests and deployment.
Ultimately, the role of the Software Engineer is to build high-quality, innovative and fully performing software that complies with coding standards and technical design.
We are looking for a passionate Software Engineer to design, develop and install software solutions.
Software Engineer responsibilities include gathering user requirements, defining system functionality and writing code in various languages, like Java, Ruby on Rails or .NET programming languages (e.g. C++ or JavaScript). Our ideal candidates are familiar with the software development life cycle (SDLC) from preliminary system analysis to tests and deployment.
Ultimately, the role of the Software Engineer is to build high-quality, innovative and fully performing software that complies with coding standards and technical design.`,
          responsibilities: [
            'Design, develop and maintain software solutions',
            'Collaborate with cross-functional teams',
            'Write clean, scalable code',
            'Test and debug programs',
            'Improve existing software'
          ],
          requirements: [
            "Bachelor's degree in Computer Science or related field",
            '3+ years of experience in software development',
            'Proficiency in JavaScript, React, Node.js',
            'Experience with database systems',
            'Problem-solving aptitude'
          ],
          benefits: [
            'Competitive salary',
            'Health insurance',
            'Flexible working hours',
            'Remote work options',
            'Professional development opportunities'
          ]
        });
        setLoading(false);
      }, 800);
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    navigate(`/jobs/${id}/apply`);
  };

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
      {/* <MainNavbar /> */}
      <Container className="py-4">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/jobs" }}>Jobs</Breadcrumb.Item>
          <Breadcrumb.Item active>Job Details</Breadcrumb.Item>
        </Breadcrumb>
        
        <Card className="job-details-card mb-4">
          <Card.Body>
            <div className="company-header mb-3">
              <div className="company-logo-container">
                <div className="company-logo">
                  {job.company.charAt(0)}
                </div>
              </div>
              <div className="company-info">
                <h5 className="company-name">{job.company}</h5>
              </div>
            </div>
            
            <div className="job-header">
              <h1 className="job-title">{job.title}</h1>
              
              <div className="job-location mb-3">
                <FaMapMarkerAlt className="location-icon" /> {job.location}
                <span className="posted-date ms-2">{job.posted} ({job.applicants || '18 applicants'})</span>
              </div>
              
              <div className="job-badges mb-4">
                <span className="job-badge">{job.workplace || 'On-site'}</span>
                <span className="job-badge">{job.type}</span>
              </div>
              
              <Button 
                variant="primary" 
                className="apply-now-btn"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </div>
            
            <hr />
            
            <Row>
              <Col md={8}>
                <section className="job-section">
                  <h2 className="section-title">Job Description</h2>
                  <p>{job.description}</p>
                </section>
                
                <section className="job-section">
                  <h2 className="section-title">Key Responsibilities</h2>
                  <ul>
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
                
                <section className="job-section">
                  <h2 className="section-title">Requirements</h2>
                  <ul>
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              </Col>
              
              <Col md={4}>
                <Card className="job-sidebar-card mb-4">
                  <Card.Body>
                    <h4>Job Details</h4>
                    
                    <div className="overview-item">
                      <div className="overview-label">Employment Type</div>
                      <div className="overview-value">{job.type}</div>
                    </div>
                    
                    <div className="overview-item">
                      <div className="overview-label">Experience Level</div>
                      <div className="overview-value">Mid-Senior Level</div>
                    </div>
                    
                    <div className="overview-item">
                      <div className="overview-label">Salary</div>
                      <div className="overview-value">{job.salary}</div>
                    </div>
                    
                    <div className="overview-item">
                      <div className="overview-label">Posted</div>
                      <div className="overview-value">{job.posted}</div>
                    </div>
                  </Card.Body>
                </Card>
                
                <Card className="job-sidebar-card">
                  <Card.Body>
                    <h4>Benefits</h4>
                    <ul className="benefits-list">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <div className="text-center mb-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="apply-btn-lg"
            onClick={handleApply}
          >
            Apply for this Job
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default JobDetailsPage;