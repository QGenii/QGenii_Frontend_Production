import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createJob, updateJob, getJobById } from '../../lib/jobApi';
import './JobForm.css';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'JOB',
    company: '',
    companyLogo: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    qualifications: [''],
    skills: [''],
    location: '',
    locationType: 'ONSITE',
    experienceLevel: 'ENTRY',
    experienceRequired: { min: 0, max: null },
    employmentType: 'FULL_TIME',
    salary: { min: null, max: null, currency: 'USD', period: 'YEARLY' },
    duration: { value: null, unit: 'MONTHS' },
    applicationDeadline: '',
    startDate: '',
    numberOfPositions: 1,
    category: '',
    benefits: [''],
    applicationUrl: '',
    contactEmail: '',
    contactPhone: '',
    status: 'ACTIVE',
    isPublished: true,
    tags: [''],
  });

  useEffect(() => {
    if (isEditMode) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    try {
      const response = await getJobById(id);
      const job = response.data.job;
      
      // Transform data for form
      setFormData({
        ...job,
        requirements: job.requirements.length ? job.requirements : [''],
        responsibilities: job.responsibilities.length ? job.responsibilities : [''],
        qualifications: job.qualifications.length ? job.qualifications : [''],
        skills: job.skills.length ? job.skills : [''],
        benefits: job.benefits.length ? job.benefits : [''],
        tags: job.tags.length ? job.tags : [''],
        applicationDeadline: job.applicationDeadline.split('T')[0],
        startDate: job.startDate ? job.startDate.split('T')[0] : '',
      });
    } catch (error) {
      alert('Error loading job');
      navigate('/dashboard/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clean up array fields (remove empty strings)
    const cleanData = {
      ...formData,
      requirements: formData.requirements.filter(r => r.trim()),
      responsibilities: formData.responsibilities.filter(r => r.trim()),
      qualifications: formData.qualifications.filter(q => q.trim()),
      skills: formData.skills.filter(s => s.trim()),
      benefits: formData.benefits.filter(b => b.trim()),
      tags: formData.tags.filter(t => t.trim()),
    };

    try {
      setSubmitting(true);
      if (isEditMode) {
        await updateJob(id, cleanData);
        alert('Job updated successfully!');
      } else {
        const response = await createJob(cleanData);
        alert('Job created successfully!');
        navigate(`/dashboard/jobs/${response.data.job._id}/applications`);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save job');
    } finally {
      setSubmitting(false);
    }
  };

  const handleArrayInput = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length ? newArray : [''] });
  };

  if (loading) {
    return <div className="job-form-loading">Loading...</div>;
  }

  return (
    <div className="job-form-page">
      <div className="container">
        <div className="form-header">
          <h1>{isEditMode ? 'Edit' : 'Create New'} Job Posting</h1>
          <p>Fill in the details below to {isEditMode ? 'update' : 'create'} your job posting</p>
        </div>

        <form onSubmit={handleSubmit} className="job-form">
          {/* Basic Information */}
          <section className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label>Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="JOB">Job</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="SCHOLARSHIP">Scholarship</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="CLOSED">Closed</option>
                  <option value="FILLED">Filled</option>
                </select>
              </div>

              <div className="form-group">
                <label>Published</label>
                <select
                  value={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'true' })}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Company Logo URL</label>
                <input
                  type="url"
                  value={formData.companyLogo}
                  onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide a detailed description of the position..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Software Development, Marketing"
                />
              </div>

              <div className="form-group">
                <label>Number of Positions *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.numberOfPositions}
                  onChange={(e) => setFormData({ ...formData, numberOfPositions: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </section>

          {/* Location & Work Type */}
          <section className="form-section">
            <h2>Location & Work Type</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA or Remote"
                />
              </div>

              <div className="form-group">
                <label>Location Type *</label>
                <select
                  required
                  value={formData.locationType}
                  onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
                >
                  <option value="ONSITE">On-site</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>

              {formData.type !== 'SCHOLARSHIP' && (
                <div className="form-group">
                  <label>Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  >
                    <option value="FULL_TIME">Full-time</option>
                    <option value="PART_TIME">Part-time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="NOT_APPLICABLE">Not Applicable</option>
                  </select>
                </div>
              )}
            </div>
          </section>

          {/* Experience & Salary */}
          {formData.type !== 'SCHOLARSHIP' && (
            <section className="form-section">
              <h2>Experience & Compensation</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Experience Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  >
                    <option value="ENTRY">Entry Level</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="SENIOR">Senior</option>
                    <option value="LEAD">Lead</option>
                    <option value="NOT_APPLICABLE">Not Applicable</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Min Experience (years)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experienceRequired.min}
                    onChange={(e) => setFormData({
                      ...formData,
                      experienceRequired: { ...formData.experienceRequired, min: parseInt(e.target.value) || 0 }
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Max Experience (years)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experienceRequired.max || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      experienceRequired: { ...formData.experienceRequired, max: parseInt(e.target.value) || null }
                    })}
                    placeholder="Leave empty for no max"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Min Salary</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salary.min || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: { ...formData.salary, min: parseInt(e.target.value) || null }
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Max Salary</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salary.max || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: { ...formData.salary, max: parseInt(e.target.value) || null }
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Currency</label>
                  <select
                    value={formData.salary.currency}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: { ...formData.salary, currency: e.target.value }
                    })}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Period</label>
                  <select
                    value={formData.salary.period}
                    onChange={(e) => setFormData({
                      ...formData,
                      salary: { ...formData.salary, period: e.target.value }
                    })}
                  >
                    <option value="HOURLY">Hourly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Duration */}
          {(formData.type === 'INTERNSHIP' || formData.type === 'SCHOLARSHIP') && (
            <section className="form-section">
              <h2>Duration</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration Value</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duration.value || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      duration: { ...formData.duration, value: parseInt(e.target.value) || null }
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Duration Unit</label>
                  <select
                    value={formData.duration.unit}
                    onChange={(e) => setFormData({
                      ...formData,
                      duration: { ...formData.duration, unit: e.target.value }
                    })}
                  >
                    <option value="DAYS">Days</option>
                    <option value="MONTHS">Months</option>
                    <option value="YEARS">Years</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Requirements, Responsibilities, etc. */}
          <section className="form-section">
            <h2>Requirements & Responsibilities</h2>
            
            <div className="array-field-group">
              <label>Requirements</label>
              {formData.requirements.map((req, idx) => (
                <div key={idx} className="array-field-row">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayInput('requirements', idx, e.target.value)}
                    placeholder="Add a requirement..."
                  />
                  <button type="button" onClick={() => removeArrayField('requirements', idx)} className="btn-remove">×</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField('requirements')} className="btn-add">+ Add Requirement</button>
            </div>

            <div className="array-field-group">
              <label>Responsibilities</label>
              {formData.responsibilities.map((resp, idx) => (
                <div key={idx} className="array-field-row">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayInput('responsibilities', idx, e.target.value)}
                    placeholder="Add a responsibility..."
                  />
                  <button type="button" onClick={() => removeArrayField('responsibilities', idx)} className="btn-remove">×</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField('responsibilities')} className="btn-add">+ Add Responsibility</button>
            </div>

            <div className="array-field-group">
              <label>Qualifications</label>
              {formData.qualifications.map((qual, idx) => (
                <div key={idx} className="array-field-row">
                  <input
                    type="text"
                    value={qual}
                    onChange={(e) => handleArrayInput('qualifications', idx, e.target.value)}
                    placeholder="Add a qualification..."
                  />
                  <button type="button" onClick={() => removeArrayField('qualifications', idx)} className="btn-remove">×</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField('qualifications')} className="btn-add">+ Add Qualification</button>
            </div>

            <div className="array-field-group">
              <label>Skills</label>
              {formData.skills.map((skill, idx) => (
                <div key={idx} className="array-field-row">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayInput('skills', idx, e.target.value)}
                    placeholder="Add a skill..."
                  />
                  <button type="button" onClick={() => removeArrayField('skills', idx)} className="btn-remove">×</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField('skills')} className="btn-add">+ Add Skill</button>
            </div>

            <div className="array-field-group">
              <label>Benefits</label>
              {formData.benefits.map((benefit, idx) => (
                <div key={idx} className="array-field-row">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayInput('benefits', idx, e.target.value)}
                    placeholder="Add a benefit..."
                  />
                  <button type="button" onClick={() => removeArrayField('benefits', idx)} className="btn-remove">×</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField('benefits')} className="btn-add">+ Add Benefit</button>
            </div>
          </section>

          {/* Deadlines & Contact */}
          <section className="form-section">
            <h2>Deadlines & Contact Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Application Deadline *</label>
                <input
                  type="date"
                  required
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact Email *</label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>External Application URL</label>
              <input
                type="url"
                value={formData.applicationUrl}
                onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                placeholder="https://example.com/apply"
              />
            </div>

            <div className="array-field-group">
              <label>Tags</label>
              {formData.tags.map((tag, idx) => (
                <div key={idx} className="array-field-row">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayInput('tags', idx, e.target.value)}
                    placeholder="Add a tag..."
                  />
                  <button type="button" onClick={() => removeArrayField('tags', idx)} className="btn-remove">×</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField('tags')} className="btn-add">+ Add Tag</button>
            </div>
          </section>

          {/* Submit */}
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/dashboard/jobs')} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Saving...' : isEditMode ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
