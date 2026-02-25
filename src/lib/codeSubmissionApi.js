import api from './api';

// Run code against public test cases
export const runCode = (contestId, questionId, payload) =>
  api.post(`/contests/${contestId}/questions/${questionId}/run`, payload).then(r => r.data);

// Submit code for evaluation
export const submitCode = (contestId, questionId, payload) =>
  api.post(`/contests/${contestId}/questions/${questionId}/submit`, payload).then(r => r.data);

// Get user's submissions for a question
export const getSubmissions = (contestId, questionId, params = {}) =>
  api.get(`/contests/${contestId}/questions/${questionId}/submissions`, { params }).then(r => r.data);

// Get submission details
export const getSubmissionDetails = (submissionId) =>
  api.get(`/contests/submissions/${submissionId}`).then(r => r.data);

// Get question leaderboard
export const getQuestionLeaderboard = (contestId, questionId) =>
  api.get(`/contests/${contestId}/questions/${questionId}/leaderboard`).then(r => r.data);
