import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationsForJob, updateApplicationStatus, bulkUpdateStatus, getJobById } from '../../lib/jobApi';
import './ApplicationManagement.css';

const ApplicationManagement = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', minExperience: '', search: '' });
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadJobAndApplications();
  }, [id, filters]);

  const loadJobAndApplications = async () => {
    try {
      setLoading(true);
      const [jobRes, appsRes] = await Promise.all([
        getJobById(id),
        getApplicationsForJob(id, filters)
      ]);
      setJob(jobRes.data.job);
      setApplications(appsRes.data.applications);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectApp = (appId) => {
    setSelectedApps(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const handleSelectAll = () => {
    if (selectedApps.length === applications.length) {
      setSelectedApps([]);
    } else {
      setSelectedApps(applications.map(app => app._id));
    }
  };

  const handleStatusChange = async (appId, status, rating = null) => {
    try {
      await updateApplicationStatus(appId, { status, rating });
      alert('Status updated successfully');
      loadJobAndApplications();
      setSelectedApps([]);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleBulkStatusChange = async (status) => {
    if (selectedApps.length === 0) {
      alert('Please select applications first');
      return;
    }

    const note = prompt(`Add a note for bulk ${status} action (optional):`);
    
    try {
      await bulkUpdateStatus(id, { applicationIds: selectedApps, status, note });
      alert(`${selectedApps.length} applications updated to ${status}`);
      loadJobAndApplications();
      setSelectedApps([]);
    } catch (error) {
      alert('Failed to update applications');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'gray',
      REVIEWING: 'blue',
      SHORTLISTED: 'green',
      REJECTED: 'red',
      WAITING: 'yellow',
      ACCEPTED: 'purple',
      WITHDRAWN: 'orange'
    };
    return colors[status] || 'gray';
  };

  const viewApplicationDetails = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  if (loading) {
    return <div className="app-mgmt-loading">Loading...</div>;
  }

  return (
    <div className="application-management">
      <div className="container">
        {/* Header */}
        <div className="app-mgmt-header">
          <div>
            <h1>Applications for: {job?.title}</h1>
            <p>{applications.length} total applications</p>
          </div>
        </div>

        {/* Filters & Bulk Actions */}
        <div className="app-mgmt-toolbar">
          <div className="filters">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="search-input"
            />
            
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="WAITING">Waiting</option>
              <option value="REJECTED">Rejected</option>
              <option value="ACCEPTED">Accepted</option>
            </select>

            <input
              type="number"
              placeholder="Min experience (years)"
              value={filters.minExperience}
              onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}
              className="filter-input"
            />
          </div>

          {selectedApps.length > 0 && (
            <div className="bulk-actions">
              <span>{selectedApps.length} selected</span>
              <button onClick={() => handleBulkStatusChange('SHORTLISTED')} className="bulk-btn shortlist">Shortlist</button>
              <button onClick={() => handleBulkStatusChange('REJECTED')} className="bulk-btn reject">Reject</button>
              <button onClick={() => handleBulkStatusChange('WAITING')} className="bulk-btn waiting">Move to Waiting</button>
              <button onClick={() => handleBulkStatusChange('ACCEPTED')} className="bulk-btn accept">Accept</button>
            </div>
          )}
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="no-applications">
            <p>No applications found for this posting.</p>
          </div>
        ) : (
          <div className="applications-table-container">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedApps.length === applications.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Applicant</th>
                  <th>Experience</th>
                  <th>Education</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app._id} className={selectedApps.includes(app._id) ? 'selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedApps.includes(app._id)}
                        onChange={() => handleSelectApp(app._id)}
                      />
                    </td>
                    <td>
                      <div className="applicant-info">
                        <strong>{app.applicant.name}</strong>
                        <span className="email">{app.applicant.email}</span>
                      </div>
                    </td>
                    <td>{app.experience} years</td>
                    <td>{app.education || 'Not provided'}</td>
                    <td>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className={`status-select status-${getStatusColor(app.status)}`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="REVIEWING">Reviewing</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                        <option value="WAITING">Waiting</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="ACCEPTED">Accepted</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={app.rating || ''}
                        onChange={(e) => handleStatusChange(app._id, app.status, parseFloat(e.target.value))}
                        className="rating-select"
                      >
                        <option value="">No Rating</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                      </select>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => viewApplicationDetails(app)}
                        className="btn-view-details"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showDetails && selectedApp && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedApp.applicant.name}'s Application</h2>
              <button onClick={() => setShowDetails(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <section className="detail-section">
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> {selectedApp.applicant.email}</p>
                {selectedApp.applicant.phone && <p><strong>Phone:</strong> {selectedApp.applicant.phone}</p>}
              </section>

              <section className="detail-section">
                <h3>Professional Details</h3>
                <p><strong>Experience:</strong> {selectedApp.experience} years</p>
                {selectedApp.education && <p><strong>Education:</strong> {selectedApp.education}</p>}
              </section>

              <section className="detail-section">
                <h3>Cover Letter</h3>
                <p className="cover-letter">{selectedApp.coverLetter}</p>
              </section>

              <section className="detail-section">
                <h3>Links</h3>
                {selectedApp.resume && (
                  <p><a href={selectedApp.resume} target="_blank" rel="noopener noreferrer" className="link">Resume/CV</a></p>
                )}
                {selectedApp.portfolio && (
                  <p><a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="link">Portfolio</a></p>
                )}
                {selectedApp.linkedIn && (
                  <p><a href={selectedApp.linkedIn} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a></p>
                )}
                {selectedApp.github && (
                  <p><a href={selectedApp.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a></p>
                )}
              </section>

              {selectedApp.additionalInfo && (
                <section className="detail-section">
                  <h3>Additional Information</h3>
                  <p>{selectedApp.additionalInfo}</p>
                </section>
              )}

              {selectedApp.notes && selectedApp.notes.length > 0 && (
                <section className="detail-section">
                  <h3>Internal Notes</h3>
                  {selectedApp.notes.map((note, idx) => (
                    <div key={idx} className="note">
                      <p>{note.text}</p>
                      <small>{new Date(note.createdAt).toLocaleString()}</small>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;
