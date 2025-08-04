import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// Subjects API
export const subjectsAPI = {
  getAll: () => api.get('/subjects'),
  getByClass: (className) => api.get(`/subjects/class/${className}`),
  getById: (subjectId) => api.get(`/subjects/${subjectId}`),
  search: (query) => api.get(`/subjects/search/${query}`),
  create: (subjectData) => api.post('/subjects', subjectData),
  update: (subjectId, subjectData) => api.put(`/subjects/${subjectId}`, subjectData),
  delete: (subjectId) => api.delete(`/subjects/${subjectId}`),
};

// Exam Papers API
export const examPapersAPI = {
  getAll: (params = {}) => api.get('/exam-papers', { params }),
  getBySubject: (subjectId, params = {}) => api.get(`/exam-papers/subject/${subjectId}`, { params }),
  getById: (paperId) => api.get(`/exam-papers/${paperId}`),
  download: (paperId) => api.post(`/exam-papers/${paperId}/download`),
  getYears: (subjectId) => api.get(`/exam-papers/subject/${subjectId}/years`),
  getStats: () => api.get('/exam-papers/stats/overview'),
  create: (paperData) => api.post('/exam-papers', paperData),
  update: (paperId, paperData) => api.put(`/exam-papers/${paperId}`, paperData),
  delete: (paperId) => api.delete(`/exam-papers/${paperId}`),
};

// Videos API (existing)
export const videosAPI = {
  getAll: (params = {}) => api.get('/videos', { params }),
  getById: (videoId) => api.get(`/videos/${videoId}`),
  getBySubject: (subject) => api.get(`/videos/subject/${subject}`),
  create: (videoData) => api.post('/videos', videoData),
  update: (videoId, videoData) => api.put(`/videos/${videoId}`, videoData),
  delete: (videoId) => api.delete(`/videos/${videoId}`),
};

// Questions API (existing)
export const questionsAPI = {
  getAll: (params = {}) => api.get('/questions', { params }),
  getById: (questionId) => api.get(`/questions/${questionId}`),
  getBySubject: (subject) => api.get(`/questions/subject/${subject}`),
  create: (questionData) => api.post('/questions', questionData),
  update: (questionId, questionData) => api.put(`/questions/${questionId}`, questionData),
  delete: (questionId) => api.delete(`/questions/${questionId}`),
};

// Payment API
export const paymentAPI = {
  processPayment: (paymentData) => api.post('/payment', paymentData),
  getSubscription: () => api.get('/payment/subscription'),
  cancelSubscription: () => api.post('/payment/cancel'),
};

// Utility functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred';
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  return !!(token && userInfo);
};

export const getCurrentUser = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  window.location.href = '/';
};

// Export the main api instance for custom requests
export default api;
