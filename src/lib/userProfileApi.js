import api from './api';

export const userProfileApi = {
  // Get user profile
  getUserProfile: () => api.get('/user/profile'),

  // Update user profile
  updateUserProfile: (profileData) => api.put('/user/profile', profileData),

  // Upload profile image
  uploadProfileImage: (imageData) => api.post('/user/profile/image', imageData),

  // Change password
  changePassword: (passwordData) => api.post('/user/profile/change-password', passwordData),

  // Get user's enrolled courses
  getUserCourses: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`/user/profile/courses?${queryParams}`);
  },

  // Get user's job applications
  getUserJobApplications: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`/user/profile/job-applications?${queryParams}`);
  },

  // Get user activity summary
  getUserActivitySummary: () => api.get('/user/profile/activity-summary'),

  // Wishlist APIs
  getWishlist: () => api.get('/wishlist'),
  addCourseToWishlist: (courseId) => api.post(`/wishlist/courses/${courseId}`),
  removeCourseFromWishlist: (courseId) => api.delete(`/wishlist/courses/${courseId}`),
  addContestToWishlist: (contestId) => api.post(`/wishlist/contests/${contestId}`),
  removeContestFromWishlist: (contestId) => api.delete(`/wishlist/contests/${contestId}`),
  checkWishlistStatus: (type, itemId) => api.get(`/wishlist/check/${type}/${itemId}`),
  clearWishlist: (type) => api.delete(`/wishlist/clear${type ? `?type=${type}` : ''}`),

  // Certificates APIs
  getUserCertificates: () => api.get('/certificates'),
  getCertificateStats: () => api.get('/certificates/stats'),
  removeCertificateFromUser: (certificateId) => api.delete(`/certificates/${certificateId}`),
  hasCertificate: (certificateId) => api.get(`/certificates/check/${certificateId}`),

  // Privacy Settings APIs
  getPrivacySettings: () => api.get('/user/privacy-settings'),
  updatePrivacySettings: (settings) => api.put('/user/privacy-settings', settings),

  // Follow APIs
  followUser: (userId) => api.post(`/follow/${userId}`),
  unfollowUser: (userId) => api.delete(`/follow/${userId}`),
  checkFollowStatus: (userId) => api.get(`/follow/status/${userId}`),
  getFollowStats: (userId) => api.get(`/follow/${userId}/stats`),
  getFollowers: (userId, params = {}) => api.get(`/follow/${userId}/followers`, { params }),
  getFollowing: (userId, params = {}) => api.get(`/follow/${userId}/following`, { params }),
  toggleFollowNotifications: (userId) => api.patch(`/follow/notifications/${userId}`),
};