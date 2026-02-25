import api from './api.js';

export const contactApi = {
  // Submit contact form
  submitContactForm: (contactData) => api.post('/contact/submit', contactData),

  // Admin functions
  getAllContacts: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });

    return api.get(`/contact?${queryParams.toString()}`);
  },

  getContact: (id) => api.get(`/contact/${id}`),

  updateContactStatus: (id, updateData) => api.patch(`/contact/${id}/status`, updateData),

  getContactStats: () => api.get('/contact/stats')
};