import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/api';

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    location: '',
    position: '',
    experience: '',
    currentCompany: '',
    currentRole: '',
    currentSalary: '',
    notice: '',
    skills: '',
    resume: null,
    coverLetter: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        resume: file
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData()
    formdata.append('firstname', formData.firstName)
    formdata.append('lastname', formData.lastName)
    formdata.append('email', formData.email)

    formdata.append('mobile', formData.mobile)
    formdata.append('gender', formData.gender)

    formdata.append('location', formData.location)
    formdata.append('position', formData.position)
    formdata.append('experience', formData.experience)
    formdata.append('currentCompany', formData.currentCompany)
    formdata.append('currentRole', formData.currentRole)
    formdata.append('currentSalary', formData.currentSalary)
    formdata.append('notice', formData.notice)
    formdata.append('skills', formData.skills)

    formdata.append('coverLetter', formData.coverLetter)
    formdata.append('resume', formData.resume)

    console.log('Form submitted:', formData);
    const data =  await api.post(`/appplication/jobs/${id}/apply`, formdata
      ,{
        header:{
          'Content-Type': 'application/json',
        }
      }

     
    )
    
     const response = await data.json()
      console.log(response)


    // Navigate to success page after submission
    navigate(`/jobs/${id}/application-success`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center mb-6 text-indigo-700">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
          <h1 className="text-xl font-semibold">Job Application Form</h1>
        </div>
        <p className="mb-6 text-sm text-gray-600">Please fill out required fields to complete your application.</p>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-indigo-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
              <h2 className="font-medium">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Mobile Number"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Location"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                <div className="flex items-center gap-4">
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" id="workPermit" name="workPermit" className="rounded border-gray-300 focus:ring-indigo-500" />
                    <label htmlFor="workPermit">Immigration/work permit</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Position & Experience Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-indigo-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
              <h2 className="font-medium">Position & Experience</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position Applied For*</label>
                <select
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select a Position</option>
                  <option value="software-engineer">Software Engineer</option>
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="backend-developer">Backend Developer</option>
                  <option value="fullstack-developer">Fullstack Developer</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience Level*</label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select from drop-down</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label htmlFor="currentCompany" className="block text-sm font-medium text-gray-700 mb-1">Current Company (Optional)</label>
                <input
                  type="text"
                  id="currentCompany"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Current Company"
                />
              </div>

              <div>
                <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700 mb-1">Current Role*</label>
                <input
                  type="text"
                  id="currentRole"
                  name="currentRole"
                  required
                  value={formData.currentRole}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Current Role"
                />
              </div>

              <div>
                <label htmlFor="currentSalary" className="block text-sm font-medium text-gray-700 mb-1">Current Salary*</label>
                <input
                  type="text"
                  id="currentSalary"
                  name="currentSalary"
                  required
                  value={formData.currentSalary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Current Salary"
                />
              </div>

              <div>
                <label htmlFor="notice" className="block text-sm font-medium text-gray-700 mb-1">Notice Period*</label>
                <select
                  id="notice"
                  name="notice"
                  required
                  value={formData.notice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="immediately">Immediately</option>
                  <option value="15-days">15 Days</option>
                  <option value="30-days">30 Days</option>
                  <option value="60-days">60 Days</option>
                  <option value="90-days">90 Days</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Known Skills & Technologies*</label>
              <textarea
                id="skills"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Describe your technical skills (e.g., Programming languages, frameworks, tools, etc.)"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Resume & Cover Letter Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-indigo-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
              </svg>
              <h2 className="font-medium">Resume & Cover letter</h2>
            </div>

            <div className="mb-4">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume*</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="mx-auto flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mb-4">PDF, DOC, DOCX (max 5MB)</p>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('resume').click()}
                    className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter*</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                required
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Tell us why you are interested in this position and what makes you a good fit for our team."
                rows="5"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
            >
              Submit Application
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting this application, you agree to our <a href="#" className="text-indigo-600 hover:underline">privacy policy</a> and <a href="#" className="text-indigo-600 hover:underline">terms of service</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
