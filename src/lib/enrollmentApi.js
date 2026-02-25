import api from './api';

export const enrollmentApi = {
  getCourseEnrollments: (courseId, params = {}) =>
    api.get(`/enrollments/course/${courseId}`, { params }),

  setEnrollmentBlock: (courseId, userId, blocked, reason) =>
    api.patch(`/enrollments/${courseId}/block/${userId}`, { blocked, reason }),

  replyToReview: (courseId, userId, reply) =>
    api.post(`/enrollments/course/${courseId}/review/${userId}/reply`, { reply }),

  enroll: (courseId) =>
    api.post(`/enrollments/${courseId}`),

  getEnrollment: (courseId) =>
    api.get(`/enrollments/${courseId}`),

  unenroll: (courseId) =>
    api.delete(`/enrollments/${courseId}`),
};

export default enrollmentApi;
