import api from './api';

// Job Postings
export const getAllJobs = (params) => api.get('/jobs', { params }).then(r => r.data);
export const getJobById = (id) => api.get(`/jobs/${id}`).then(r => r.data);
export const createJob = (data) => api.post('/jobs', data).then(r => r.data);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data).then(r => r.data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`).then(r => r.data);
export const getMyJobPostings = (params) => api.get('/jobs/my/postings', { params }).then(r => r.data);
export const getJobStatistics = (id) => api.get(`/jobs/${id}/statistics`).then(r => r.data);
export const getFeaturedJobs = (limit = 10) => api.get('/jobs/featured', { params: { limit } }).then(r => r.data);
export const searchJobs = (params) => api.get('/jobs/search', { params }).then(r => r.data);

// Job Applications
export const submitApplication = (jobId, data) => api.post(`/applications/jobs/${jobId}/apply`, data).then(r => r.data);
export const getMyApplications = (params) => api.get('/applications/my/applications', { params }).then(r => r.data);
export const getApplicationById = (id) => api.get(`/applications/${id}`).then(r => r.data);
export const withdrawApplication = (id) => api.post(`/applications/${id}/withdraw`).then(r => r.data);
export const getApplicationsForJob = (jobId, params) => api.get(`/applications/jobs/${jobId}/applications`, { params }).then(r => r.data);
export const updateApplicationStatus = (id, data) => api.put(`/applications/${id}/status`, data).then(r => r.data);
export const bulkUpdateStatus = (jobId, data) => api.post(`/applications/jobs/${jobId}/bulk-update`, data).then(r => r.data);
export const addApplicationNote = (id, note) => api.post(`/applications/${id}/notes`, { note }).then(r => r.data);
export const scheduleInterview = (id, data) => api.post(`/applications/${id}/interview`, data).then(r => r.data);
