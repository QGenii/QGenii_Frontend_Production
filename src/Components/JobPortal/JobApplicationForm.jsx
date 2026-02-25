import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './JobApplication.css';

const JobApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    resume: null,
    jobTitle: '',
    workType: '',
    preferredLocation: '',
    highestQualification: '',
    yearsOfExperience: '',
    startDate: '',
    willingToRelocate: '',
    referenceName: '',
    relationship: '',
    referenceContact: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real app, you would submit the form data to an API
    // Simulate API request with a short delay
    setTimeout(() => {
      // Redirect to success page
      navigate(`/jobs/${id}/application-success`);
    }, 500);
  };

  return (
    <div className="form-container">
      <h2>Job Application Form</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section>
          <h3>Personal Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="e.g., Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn Profile</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="Enter Your LinkedIn Profile"
                value={formData.linkedin}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter Your Location, City"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group upload-group">
              <label htmlFor="resume">Upload Resume*</label>
              <div className="upload-container">
                <input
                  type="text"
                  readOnly
                  placeholder="PDF, DOCX"
                  value={formData.resume ? formData.resume.name : ''}
                />
                <button type="button" className="upload-btn" onClick={() => document.getElementById('resume-upload').click()}>
                  UPLOAD
                </button>
              </div>
              <input
                type="file"
                id="resume-upload"
                name="resume"
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                required
              />
            </div>
          </div>
        </section>
        
        {/* Position Applying For */}
        <section>
          <h3>Position Applying For</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title*</label>
              <select
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Job Title</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="preferredLocation">Preferred Location*</label>
              <select
                id="preferredLocation"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Preferred Location</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="workType">Work Type*</label>
              <select
                id="workType"
                name="workType"
                value={formData.workType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Work Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </section>
        
        {/* Professional Details */}
        <section>
          <h3>Professional Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="highestQualification">Highest Qualification*</label>
              <select
                id="highestQualification"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Highest Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Ph.D.">Ph.D.</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="yearsOfExperience">Total Years Of Experience*</label>
              <input
                type="text"
                id="yearsOfExperience"
                name="yearsOfExperience"
                placeholder="Enter Your Total Years of Experience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group full-width">
              <div className="skills-container">
                <div className="skill-tag">Communication</div>
                <div className="skill-tag">Tech Support</div>
                <div className="skill-tag">Sales</div>
                <div className="skill-tag">Why Should we hire you?</div>
              </div>
              <div className="max-words">Max 500 words</div>
            </div>
          </div>
        </section>
        
        {/* Side-by-side sections */}
        <div className="side-by-side-sections">
          {/* Availability */}
          <section className="half-section">
            <h3>Availability</h3>
            
            <div className="form-group mb-3">
              <label htmlFor="startDate">Select Start Date<span className="required">*</span></label>
              <div className="date-input-container">
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  placeholder="Start Date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  onClick={(e) => e.target.nextElementSibling?.click()}
                  required
                />
                <input 
                  type="date" 
                  id="startDatePicker"
                  style={{display: 'none'}}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      startDate: e.target.value
                    });
                  }} 
                />
                <span className="calendar-icon">📅</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="willingToRelocate">Willing To relocate?</label>
              <input
                type="text"
                id="willingToRelocate"
                name="willingToRelocate"
                placeholder="Willing to relocate"
                value={formData.willingToRelocate}
                onChange={handleInputChange}
              />
            </div>
          </section>
          
          {/* References */}
          <section className="half-section">
            <h3>References</h3>
            
            <div className="form-group mb-3">
              <label htmlFor="referenceName">Reference Name<span className="required">*</span></label>
              <input
                type="text"
                id="referenceName"
                name="referenceName"
                placeholder="Enter Reference Name"
                value={formData.referenceName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="relationship">Relationship<span className="required">*</span></label>
              <input
                type="text"
                id="relationship"
                name="relationship"
                placeholder="Enter Relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="referenceContact">Contact Information<span className="required">*</span></label>
              <input
                type="text"
                id="referenceContact"
                name="referenceContact"
                placeholder="Enter Contact Information"
                value={formData.referenceContact}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>
        </div>
        
        <div className="terms-container">
          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="agreeToTerms">I agree to the Terms and Privacy Policy</label>
          </div>
        </div>
        
        <div className="submit-container">
          <button type="submit" className="submit-button" disabled={formData.agreeToTerms === false}>
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;