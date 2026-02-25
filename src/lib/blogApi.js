import api from './api';

// Blog Posts
export const listBlogs = (params = {}) => api.get('/blogs', { params }).then(r => r.data);
export const listMyBlogs = (params = {}) => api.get('/blogs/my/posts', { params }).then(r => r.data);
export const listMyReposts = (params = {}) => api.get('/blogs/my/reposts', { params }).then(r => r.data);
export const getBlog = (id) => api.get(`/blogs/${id}`).then(r => r.data);
export const createBlog = (payload) => api.post('/blogs', payload).then(r => r.data);
export const updateBlog = (id, payload) => api.patch(`/blogs/${id}`, payload).then(r => r.data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`).then(r => r.data);

// Likes
export const likeBlog = (id) => api.post(`/blogs/${id}/like`).then(r => r.data);
export const unlikeBlog = (id) => api.delete(`/blogs/${id}/like`).then(r => r.data);

// Comments
export const listBlogComments = (id) => api.get(`/blogs/${id}/comments`).then(r => r.data);
export const addBlogComment = (id, payload) => api.post(`/blogs/${id}/comments`, payload).then(r => r.data);
export const deleteBlogComment = (blogId, commentId) => api.delete(`/blogs/${blogId}/comments/${commentId}`).then(r => r.data);

// Reposts
export const repostBlog = (id, comment) => api.post(`/blogs/${id}/repost`, { comment }).then(r => r.data);
export const unrepostBlog = (id) => api.delete(`/blogs/${id}/repost`).then(r => r.data);
export const listBlogReposts = (id) => api.get(`/blogs/${id}/reposts`).then(r => r.data);
