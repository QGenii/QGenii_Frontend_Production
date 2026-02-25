import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyJobPostings, deleteJob, getJobStatistics } from '../../lib/jobApi';
import './JobManagement.css';

const JobManagement = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: '', status: '' });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadJobs();
  }, [filter]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await getMyJobPostings(filter);
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This will also delete all applications.`)) {
      return;
    }

    try {
      await deleteJob(id);
      alert('Job deleted successfully');
      loadJobs();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete job');
    }
  };

  const getJobTypeLabel = (type) => {
    const labels = { JOB: 'Job', INTERNSHIP: 'Internship', SCHOLARSHIP: 'Scholarship' };
    return labels[type] || type;
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      ACTIVE: 'status-active',
      DRAFT: 'status-draft',
      CLOSED: 'status-closed',
      FILLED: 'status-filled',
    };
    return classes[status] || '';
  };

  return (
    <div className="job-management">
      <div className="container">
        {/* Header */}
        <div className="management-header">
          <div>
            <h1>Job Management</h1>
            <p>Manage your job postings, internships, and scholarships</p>
          </div>
          <button onClick={() => navigate('/dashboard/jobs/create')} className="btn-create">
            + Create New Posting
          </button>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="JOB">Jobs</option>
            <option value="INTERNSHIP">Internships</option>
            <option value="SCHOLARSHIP">Scholarships</option>
          </select>

          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="CLOSED">Closed</option>
            <option value="FILLED">Filled</option>
          </select>

          <button onClick={loadJobs} className="btn-refresh">
            Refresh
          </button>
        </div>

        {/* Stats Summary */}
        <div className="stats-summary">
          <div className="stat-card">
            <h3>{jobs.filter(j => j.status === 'ACTIVE').length}</h3>
            <p>Active Postings</p>
          </div>
          <div className="stat-card">
            <h3>{jobs.reduce((sum, j) => sum + j.applicationsCount, 0)}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>{jobs.reduce((sum, j) => sum + j.views, 0)}</h3>
            <p>Total Views</p>
          </div>
          <div className="stat-card">
            <h3>{jobs.filter(j => j.status === 'FILLED').length}</h3>
            <p>Filled Positions</p>
          </div>
        </div>

        {/* Jobs Table */}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">
            <p>No job postings found.</p>
            <button onClick={() => navigate('/dashboard/jobs/create')} className="btn-primary">
              Create Your First Posting
            </button>
          </div>
        ) : (
          <div className="jobs-table-container">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Applications</th>
                  <th>Views</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id}>
                    <td>
                      <div className="job-title-cell">
                        <Link to={`/jobs/${job._id}`} className="job-title-link">
                          {job.title}
                        </Link>
                        <span className="company-name-small">{job.company}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`type-badge ${job.type.toLowerCase()}`}>
                        {getJobTypeLabel(job.type)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>{job.location}</td>
                    <td>
                      <Link
                        to={`/dashboard/jobs/${job._id}/applications`}
                        className="applications-link"
                      >
                        {job.applicationsCount}
                      </Link>
                    </td>
                    <td>{job.views}</td>
                    <td>{new Date(job.applicationDeadline).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => navigate(`/dashboard/jobs/${job._id}/edit`)}
                          className="btn-action btn-edit"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => navigate(`/dashboard/jobs/${job._id}/applications`)}
                          className="btn-action btn-view"
                          title="View Applications"
                        >
                          👥
                        </button>
                        <button
                          onClick={() => handleDelete(job._id, job.title)}
                          className="btn-action btn-delete"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagement;
