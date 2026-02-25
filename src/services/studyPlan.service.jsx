// Study Plan API Service
const API_BASE_URL = 'http://localhost:5000/study-plans';
const getAuthToken = () => {
  return localStorage.getItem('token');
};

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`
};

export const studyPlanService = {
  // Get all study plans with filters and pagination
  getStudyPlans: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE_URL}?${params}`, {
        method: 'GET',
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch study plans');
      return await response.json();
    } catch (error) {
      console.error('Error fetching study plans:', error);
      throw error;
    }
  },

  // Get single study plan by ID
  getStudyPlan: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch study plan');
      return await response.json();
    } catch (error) {
      console.error('Error fetching study plan:', error);
      throw error;
    }
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        method: 'GET',
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  },

  // Get calendar view
  getCalendarView: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE_URL}/calendar?${params}`, {
        method: 'GET',
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch calendar view');
      return await response.json();
    } catch (error) {
      console.error('Error fetching calendar view:', error);
      throw error;
    }
  },

  // Get today's tasks
  getTodaysTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/today`, {
        method: 'GET',
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch today\'s tasks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching today\'s tasks:', error);
      throw error;
    }
  },

  // Generate progress report
  generateProgressReport: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE_URL}/reports/progress?${params}`, {
        method: 'GET',
        headers
      });
      if (!response.ok) throw new Error('Failed to generate progress report');
      return await response.json();
    } catch (error) {
      console.error('Error generating progress report:', error);
      throw error;
    }
  },

  // Create new study plan
  createStudyPlan: async (data) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create study plan');
      return await response.json();
    } catch (error) {
      console.error('Error creating study plan:', error);
      throw error;
    }
  },

  // Update study plan
  updateStudyPlan: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update study plan');
      return await response.json();
    } catch (error) {
      console.error('Error updating study plan:', error);
      throw error;
    }
  },

  // Update progress
  updateProgress: async (id, progressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/progress`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(progressData)
      });
      if (!response.ok) throw new Error('Failed to update progress');
      return await response.json();
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  },

  // Delete study plan
  deleteStudyPlan: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers
      });
      if (!response.ok) throw new Error('Failed to delete study plan');
      return await response.json();
    } catch (error) {
      console.error('Error deleting study plan:', error);
      throw error;
    }
  }
};
