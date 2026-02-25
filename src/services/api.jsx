// services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User Profile APIs
export const userProfileAPI = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data) => apiClient.put('/user/profile', data),
  uploadProfileImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/user/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  changePassword: (oldPassword, newPassword) =>
    apiClient.post('/user/profile/change-password', { oldPassword, newPassword }),
  getActivitySummary: () => apiClient.get('/user/profile/activity-summary'),
  getCourses: () => apiClient.get('/user/profile/courses'),
  getJobApplications: () => apiClient.get('/user/profile/job-applications')
};

// User Activity APIs
export const userActivityAPI = {
  updateHeartbeat: () => apiClient.post('/me/heartbeat')
};

// Courses APIs
export const coursesAPI = {
  getAll: (filters) => apiClient.get('/courses', { params: filters }),
  getById: (id) => apiClient.get(`/courses/${id}`),
  create: (data) => apiClient.post('/courses', data),
  update: (id, data) => apiClient.patch(`/courses/${id}`, data),
  delete: (id) => apiClient.delete(`/courses/${id}`)
};

// Enrollments APIs
export const enrollmentsAPI = {
  getMyEnrollments: () => apiClient.get('/enrollments'),
  enroll: (courseId) => apiClient.post(`/enrollments/${courseId}`),
  getSpecific: (courseId) => apiClient.get(`/enrollments/${courseId}`),
  unenroll: (courseId) => apiClient.delete(`/enrollments/${courseId}`),
  updateProgress: (courseId, progress) =>
    apiClient.patch(`/enrollments/${courseId}/progress`, progress),
  addReview: (courseId, review) =>
    apiClient.post(`/enrollments/${courseId}/review`, review),
  getCourseEnrollments: (courseId) =>
    apiClient.get(`/enrollments/course/${courseId}`)
};

// Practice Questions APIs
export const practiceAPI = {
  // Categories
  getCategories: () => apiClient.get('/practice/categories'),
  getCategoryBySlug: (slug) => apiClient.get(`/practice/categories/${slug}`),
  createCategory: (data) => apiClient.post('/practice/categories', data),
  updateCategory: (slug, data) => apiClient.patch(`/practice/categories/${slug}`, data),
  deleteCategory: (slug) => apiClient.delete(`/practice/categories/${slug}`),

  // Questions
  contribute: (data) => apiClient.post('/practice/questions/contribute', data),
  getByCategory: (categorySlug) =>
    apiClient.get(`/practice/questions/category/${categorySlug}`),
  getBySlug: (slug) => apiClient.get(`/practice/questions/${slug}`),
  update: (slug, data) => apiClient.patch(`/practice/questions/${slug}`, data),
  delete: (slug) => apiClient.delete(`/practice/questions/${slug}`),
  runCode: (slug, code) => apiClient.post(`/practice/questions/${slug}/run`, { code }),
  submitCode: (slug, code) => apiClient.post(`/practice/questions/${slug}/submit`, { code }),
  getContributed: () => apiClient.get('/practice/questions/user/contributions'),
  getSolved: () => apiClient.get('/practice/questions/user/solved'),
  getPending: () => apiClient.get('/practice/questions/admin/pending'),
  getAll: (filters) => apiClient.get('/practice/questions/admin/all', { params: filters }),
  approve: (id) => apiClient.patch(`/practice/questions/${id}/approve`),
  reject: (id, reason) => apiClient.patch(`/practice/questions/${id}/reject`, { reason }),
  revoke: (id) => apiClient.patch(`/practice/questions/${id}/revoke`),

  // Comments
  getComments: (questionId) => apiClient.get(`/practice/comments/${questionId}`),
  addComment: (questionId, content) =>
    apiClient.post(`/practice/comments/${questionId}`, { content }),
  updateComment: (commentId, content) =>
    apiClient.patch(`/practice/comments/${commentId}`, { content }),
  deleteComment: (commentId) => apiClient.delete(`/practice/comments/${commentId}`),
  toggleCommentLike: (commentId) =>
    apiClient.post(`/practice/comments/${commentId}/like`)
};

// Contests APIs
export const contestsAPI = {
  getAll: () => apiClient.get('/contests'),
  getMine: () => apiClient.get('/contests/mine'),
  getById: (id) => apiClient.get(`/contests/${id}`),
  create: (data) => apiClient.post('/contests', data),
  update: (id, data) => apiClient.patch(`/contests/${id}`, data),
  delete: (id) => apiClient.delete(`/contests/${id}`),
  participate: (id) => apiClient.post(`/contests/${id}/participate`),
  submit: (id, answers) => apiClient.post(`/contests/${id}/submit`, { answers }),
  getLeaderboard: (id) => apiClient.get(`/contests/${id}/leaderboard`),
  getQuestions: (id) => apiClient.get(`/contests/${id}/questions`),
  addQuestion: (id, question) => apiClient.post(`/contests/${id}/questions`, question)
};

// Job Postings APIs
export const jobsAPI = {
  getAll: (filters) => apiClient.get('/jobs', { params: filters }),
  search: (query) => apiClient.get('/jobs/search', { params: { q: query } }),
  getFeatured: () => apiClient.get('/jobs/featured'),
  getById: (id) => apiClient.get(`/jobs/${id}`),
  create: (data) => apiClient.post('/jobs', data),
  update: (id, data) => apiClient.put(`/jobs/${id}`, data),
  delete: (id) => apiClient.delete(`/jobs/${id}`),
  getMyPostings: () => apiClient.get('/jobs/my/postings'),
  getStatistics: (id) => apiClient.get(`/jobs/${id}/statistics`)
};

// Job Applications APIs
export const applicationsAPI = {
  apply: (jobId) => apiClient.post(`/applications/jobs/${jobId}/apply`),
  getMyApplications: () => apiClient.get('/applications/my/applications'),
  getById: (id) => apiClient.get(`/applications/${id}`),
  withdraw: (id) => apiClient.post(`/applications/${id}/withdraw`),
  getJobApplications: (jobId) =>
    apiClient.get(`/applications/jobs/${jobId}/applications`)
};

// Blogs APIs
export const blogsAPI = {
  getAll: (filters) => apiClient.get('/blogs', { params: filters }),
  getMyPosts: () => apiClient.get('/blogs/my/posts'),
  getMyReposts: () => apiClient.get('/blogs/my/reposts'),
  getById: (id) => apiClient.get(`/blogs/${id}`),
  create: (data) => apiClient.post('/blogs', data),
  update: (id, data) => apiClient.patch(`/blogs/${id}`, data),
  delete: (id) => apiClient.delete(`/blogs/${id}`),
  like: (id) => apiClient.post(`/blogs/${id}/like`),
  unlike: (id) => apiClient.delete(`/blogs/${id}/like`),
  getComments: (id) => apiClient.get(`/blogs/${id}/comments`),
  addComment: (id, text) => apiClient.post(`/blogs/${id}/comments`, { text }),
  deleteComment: (id, commentId) =>
    apiClient.delete(`/blogs/${id}/comments/${commentId}`),
  repost: (id) => apiClient.post(`/blogs/${id}/repost`),
  removeRepost: (id) => apiClient.delete(`/blogs/${id}/repost`),
  getReposts: (id) => apiClient.get(`/blogs/${id}/reposts`)
};

// Admin APIs
export const adminAPI = {
  getUsers: (filters) => apiClient.get('/admin/users', { params: filters }),
  approveMentor: (id) => apiClient.patch(`/admin/users/${id}/approve`),
  blockUser: (id) => apiClient.patch(`/admin/users/${id}/block`),
  unblockUser: (id) => apiClient.patch(`/admin/users/${id}/unblock`),
  getUserActivity: (id) => apiClient.get(`/admin/users/${id}/activity`),
  getMetrics: () => apiClient.get('/admin/metrics'),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`)
};

// Categories APIs
export const categoriesAPI = {
  getAll: () => apiClient.get('/categories'),
  getBySlug: (slug) => apiClient.get(`/categories/${slug}`),
  create: (data) => apiClient.post('/categories', data),
  update: (id, data) => apiClient.patch(`/categories/${id}`, data),
  delete: (id) => apiClient.delete(`/categories/${id}`)
};

// Public APIs
export const publicAPI = {
  getProfile: (identifier) => apiClient.get(`/public/profile/${identifier}`),
  getLeaderboard: (params) => apiClient.get('/public/leaderboard', { params })
};

// Badges APIs
export const badgesAPI = {
  getAll: () => apiClient.get('/badges'),
  getById: (id) => apiClient.get(`/badges/${id}`),
  getUserBadges: (userId) => apiClient.get(`/users/${userId}/badges`),
  getMyBadgeProgress: () => apiClient.get('/my-badge-progress'),
  getDisplayedBadges: (userId) => apiClient.get(`/users/${userId}/badges/displayed`),
  getBadgeStats: (userId) => apiClient.get(`/users/${userId}/badge-stats`),
  getRecommendedBadges: () => apiClient.get('/recommended-badges'),
  toggleBadgeDisplay: (badgeId) => apiClient.post(`/badges/${badgeId}/toggle-display`),
  reorderBadges: (order) => apiClient.put('/badges/reorder', { order }),
  markBadgeViewed: (badgeId) => apiClient.post(`/badges/${badgeId}/mark-viewed`)
};

// Skills APIs
export const skillsAPI = {
  getAll: () => apiClient.get('/skills'),
  getById: (id) => apiClient.get(`/skills/${id}`),
  getSkillQuestions: (skillId) => apiClient.get(`/skills/${skillId}/questions`),
  create: (data) => apiClient.post('/skills', data),
  update: (id, data) => apiClient.patch(`/skills/${id}`, data),
  delete: (id) => apiClient.delete(`/skills/${id}`),
  addQuestion: (skillId, question) => apiClient.post(`/skills/${skillId}/questions`, question),
  updateQuestion: (skillId, questionId, data) => apiClient.patch(`/skills/${skillId}/questions/${questionId}`, data),
  deleteQuestion: (skillId, questionId) => apiClient.delete(`/skills/${skillId}/questions/${questionId}`)
};

// Authentication APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  getMe: () => apiClient.get('/auth/me')
};

export default apiClient;