import api from './api';

export const studyPlanApi = {
  // Get study plans with filters
  getStudyPlans: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`/study-plans?${queryParams}`);
  },

  // Get study plan by ID
  getStudyPlan: (id) => api.get(`/study-plans/${id}`),

  // Create new study plan
  createStudyPlan: (data) => api.post('/study-plans', data),

  // Update study plan
  updateStudyPlan: (id, data) => api.put(`/study-plans/${id}`, data),

  // Update progress
  updateProgress: (id, data) => api.patch(`/study-plans/${id}/progress`, data),

  // Delete study plan
  deleteStudyPlan: (id) => api.delete(`/study-plans/${id}`),

  // Get calendar view
  getCalendarView: (startDate, endDate) => 
    api.get(`/study-plans/calendar?startDate=${startDate}&endDate=${endDate}`),

  // Get today's tasks
  getTodaysTasks: () => api.get('/study-plans/today'),

  // Get dashboard statistics
  getDashboardStats: () => api.get('/study-plans/dashboard/stats'),

  // Generate progress report
  generateProgressReport: async (reportConfig) => {
    const params = new URLSearchParams();
    
    // Fix date serialization - only add valid dates
    if (reportConfig.startDate) {
      let startDate;
      if (typeof reportConfig.startDate === 'string' && reportConfig.startDate.trim()) {
        startDate = reportConfig.startDate.trim();
      } else if (reportConfig.startDate instanceof Date && !isNaN(reportConfig.startDate)) {
        startDate = reportConfig.startDate.toISOString().split('T')[0];
      }
      if (startDate) {
        params.append('startDate', startDate);
      }
    }
    
    if (reportConfig.endDate) {
      let endDate;
      if (typeof reportConfig.endDate === 'string' && reportConfig.endDate.trim()) {
        endDate = reportConfig.endDate.trim();
      } else if (reportConfig.endDate instanceof Date && !isNaN(reportConfig.endDate)) {
        endDate = reportConfig.endDate.toISOString().split('T')[0];
      }
      if (endDate) {
        params.append('endDate', endDate);
      }
    }
    
    if (reportConfig.format) params.append('format', reportConfig.format.toLowerCase());
    if (reportConfig.groupBy) params.append('groupBy', reportConfig.groupBy);
    if (reportConfig.sortBy) params.append('sortBy', reportConfig.sortBy);
    
    // Status filters
    const statusFilters = [];
    if (reportConfig.includeCompleted) statusFilters.push('COMPLETED');
    if (reportConfig.includeInProgress) statusFilters.push('IN_PROGRESS');
    if (reportConfig.includePending) statusFilters.push('PENDING');
    if (reportConfig.includeOverdue) statusFilters.push('OVERDUE');
    if (reportConfig.includeCancelled) statusFilters.push('CANCELLED');
    
    if (statusFilters.length > 0) {
      params.append('status', statusFilters.join(','));
    }
    
    // Content options
    if (reportConfig.includeSubtasks) params.append('includeSubtasks', 'true');
    if (reportConfig.includeProgressHistory) params.append('includeProgressHistory', 'true');
    if (reportConfig.includeStatistics) params.append('includeStatistics', 'true');
    
    const response = await api.get(`/study-plans/reports/progress?${params.toString()}`);
    
    // Handle CSV download
    if (reportConfig.format === 'CSV') {
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `study-plan-report-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
    
    return response;
  },

  // Download CSV report (deprecated - use generateProgressReport with CSV format)
  downloadProgressReport: (startDate, endDate) => 
    api.get(`/study-plans/reports/progress?startDate=${startDate}&endDate=${endDate}&format=csv`, {
      responseType: 'blob'
    }),
};