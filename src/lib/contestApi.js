import api from './api';

export const listContests = (params = {}) => api.get('/contests', { params }).then(r => r.data);
export const listMyContests = () => api.get('/contests/mine').then(r => r.data);
export const getContest = (id) => api.get(`/contests/${id}`).then(r => r.data);
export const createContest = (payload) => api.post('/contests', payload).then(r => r.data);
export const updateContest = (id, payload) => api.patch(`/contests/${id}`, payload).then(r => r.data);
export const deleteContest = (id) => api.delete(`/contests/${id}`).then(r => r.data);
export const participateContest = (id) => api.post(`/contests/${id}/participate`).then(r => r.data);
export const submitContest = (id, payload) => api.post(`/contests/${id}/submit`, payload).then(r => r.data);
export const addContestReview = (id, payload) => api.post(`/contests/${id}/reviews`, payload).then(r => r.data);
export const listContestReviews = (id) => api.get(`/contests/${id}/reviews`).then(r => r.data);
export const replyContestReview = (id, reviewId, payload) => api.post(`/contests/${id}/reviews/${reviewId}/reply`, payload).then(r => r.data);
// Questions
export const listContestQuestions = (id) => api.get(`/contests/${id}/questions`).then(r => r.data);
export const getContestQuestions = (contestId) => api.get(`/contests/${contestId}/playable-questions`).then(r => r.data);
export const createContestQuestion = (id, payload) => api.post(`/contests/${id}/questions`, payload).then(r => r.data);
export const updateContestQuestion = (id, questionId, payload) => api.patch(`/contests/${id}/questions/${questionId}`, payload).then(r => r.data);
export const deleteContestQuestion = (id, questionId) => api.delete(`/contests/${id}/questions/${questionId}`).then(r => r.data);
export const reorderContestQuestions = (id, order) => api.post(`/contests/${id}/questions/reorder`, { order }).then(r => r.data);

// Participants
export const listContestParticipants = (id, params = {}) => api.get(`/contests/${id}/participants`, { params }).then(r => r.data);
// Leaderboard
export const getContestLeaderboard = (id, params = {}) => api.get(`/contests/${id}/leaderboard`, { params }).then(r => r.data);

// Participant-safe questions (no answers/solutions)
export const getContestPlayableQuestions = (id) => {
	return api.get(`/contests/${id}/playable-questions`).then(r => r.data);
}

// Get participant's current score
export const getParticipantScore = (contestId) => api.get(`/contests/${contestId}/my-score`).then(r => r.data);
