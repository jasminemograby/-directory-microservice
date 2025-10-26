import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage')
    if (token) {
      try {
        const authData = JSON.parse(token)
        if (authData.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`
        }
      } catch (error) {
        console.error('Error parsing auth token:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }
    
    const message = error.response?.data?.message || error.message || 'An error occurred'
    toast.error(message)
    
    return Promise.reject(error)
  }
)

// API service functions
export const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
    refresh: (token) => api.post('/auth/refresh', { token }),
  },

  // Company endpoints
  companies: {
    getAll: (params = {}) => api.get('/companies', { params }),
    getById: (id) => api.get(`/companies/${id}`),
    create: (data) => api.post('/companies', data),
    update: (id, data) => api.put(`/companies/${id}`, data),
    verify: (id, method) => api.post(`/companies/${id}/verify`, { method }),
    delete: (id) => api.delete(`/companies/${id}`),
  },

  // Employee endpoints
  employees: {
    getAll: (params = {}) => api.get('/employees', { params }),
    getById: (id) => api.get(`/employees/${id}`),
    create: (data) => api.post('/employees', data),
    update: (id, data) => api.put(`/employees/${id}`, data),
    enrich: (id, sources) => api.post(`/employees/${id}/enrich`, { sources }),
    addSkills: (id, skills) => api.post(`/employees/${id}/skills`, { skills }),
    delete: (id) => api.delete(`/employees/${id}`),
  },

  // Training endpoints
  training: {
    getRequests: (params = {}) => api.get('/training/requests', { params }),
    getRequestById: (id) => api.get(`/training/requests/${id}`),
    createRequest: (data) => api.post('/training/requests', data),
    updateRequest: (id, data) => api.put(`/training/requests/${id}`, data),
    approveRequest: (id, data) => api.post(`/training/requests/${id}/approve`, data),
    rejectRequest: (id, data) => api.post(`/training/requests/${id}/reject`, data),
    scheduleRequest: (id, data) => api.post(`/training/requests/${id}/schedule`, data),
    completeRequest: (id) => api.post(`/training/requests/${id}/complete`),
    deleteRequest: (id) => api.delete(`/training/requests/${id}`),
  },

  // Instructor endpoints
  instructors: {
    getAll: (params = {}) => api.get('/instructors', { params }),
    getById: (id) => api.get(`/instructors/${id}`),
    create: (data) => api.post('/instructors', data),
    update: (id, data) => api.put(`/instructors/${id}`, data),
  },

  // HR endpoints
  hr: {
    getDashboard: (params = {}) => api.get('/hr/dashboard', { params }),
    getEmployees: (params = {}) => api.get('/hr/employees', { params }),
    getTrainingRequests: (params = {}) => api.get('/hr/training-requests', { params }),
    getAnalytics: (params = {}) => api.get('/hr/analytics', { params }),
  },
}

export default api
