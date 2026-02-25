import api from './api.js';

export const practiceApi = {
  // Categories
  listCategories: () => api.get('/practice/categories'),
  getCategory: (slug) => api.get(`/practice/categories/${slug}`),
  createCategory: (data) => api.post('/practice/categories', data),
  updateCategory: (slug, data) => api.patch(`/practice/categories/${slug}`, data),
  deleteCategory: (slug) => api.delete(`/practice/categories/${slug}`),

  // Questions
  listQuestionsByCategory: (categorySlug, params = {}) => 
    api.get(`/practice/questions/category/${categorySlug}`, { params }),
  
  getQuestion: (slug) => api.get(`/practice/questions/${slug}`),
  
  contributeQuestion: (data) => api.post('/practice/questions/contribute', data),
  
  runCode: (slug, data) => api.post(`/practice/questions/${slug}/run`, data),
  
  submitCode: (slug, data) => api.post(`/practice/questions/${slug}/submit`, data),
  
  getMyContributions: (params = {}) => 
    api.get('/practice/questions/user/contributions', { params }),
  
  getMySolved: () => api.get('/practice/questions/user/solved'),
  
  // Admin/Mentor operations
  getPendingQuestions: () => api.get('/practice/questions/admin/pending'),
  
  getAllQuestions: (params = {}) => api.get('/practice/questions/admin/all', { params }),
  
  approveQuestion: (id) => api.patch(`/practice/questions/${id}/approve`),
  
  rejectQuestion: (id, reason) => 
    api.patch(`/practice/questions/${id}/reject`, { reason }),
  
  revokeApproval: (id) => api.patch(`/practice/questions/${id}/revoke`),
  
  updateQuestion: (id, data) => api.patch(`/practice/questions/${id}`, data),
  
  deleteQuestion: (id) => api.delete(`/practice/questions/${id}`),
  
  // Comments
  getComments: (questionId) => api.get(`/practice/comments/${questionId}`),
  
  addComment: (questionId, data) => api.post(`/practice/comments/${questionId}`, data),
  
  updateComment: (commentId, data) => api.patch(`/practice/comments/${commentId}`, data),
  
  deleteComment: (commentId) => api.delete(`/practice/comments/${commentId}`),
  
  toggleLike: (commentId) => api.post(`/practice/comments/${commentId}/like`)
};
