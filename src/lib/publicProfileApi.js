import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const publicProfileApi = {
  // Get public profile by user ID or identifier
  getPublicProfile: (identifier) => {
    return axios.get(`${API_URL}/public/profile/${identifier}`);
  },

  // Get follow statistics for a user (public)
  getFollowStats: (userId) => {
    return axios.get(`${API_URL}/follow/${userId}/stats`);
  },

  // Get leaderboard
  getLeaderboard: (params) => {
    return axios.get(`${API_URL}/public/leaderboard`, { params });
  },
};
