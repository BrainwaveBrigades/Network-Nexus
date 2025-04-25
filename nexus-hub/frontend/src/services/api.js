// src/services/api.js
import axios from 'axios';

// Create axios instance with base URL and default headers
const API_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API service for mentorships
export const mentorshipService = {
  // Get mentorships with pagination and filtering
  getMentorships: async (page = 1, limit = 3, filters = {}) => {
    try {
      const { department, studyYear, search, mode } = filters;
      
      // Build query string
      let queryParams = `?page=${page}&limit=${limit}`;
      if (department && department !== 'All') queryParams += `&department=${department}`;
      if (studyYear) queryParams += `&studyYear=${studyYear}`;
      if (search) queryParams += `&search=${search}`;
      if (mode) queryParams += `&mode=${mode}`;
      
      const response = await api.get(`/mentorships${queryParams}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  // Get single mentorship by ID
  getMentorshipById: async (id) => {
    try {
      const response = await api.get(`/mentorships/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  // Get available departments for filtering
  getDepartments: async () => {
    try {
      const response = await api.get('/mentorships/metadata/departments');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  // Get available study years for filtering
  getStudyYears: async () => {
    try {
      const response = await api.get('/mentorships/metadata/studyyears');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// API service for applications
export const applicationService = {
  // Apply to a mentorship
  applyToMentorship: async (mentorshipId, data) => {
    try {
      const response = await api.post(`/applications/mentorships/${mentorshipId}/apply`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  // Validate PRN and get student details
  validatePRN: async (prn) => {
    try {
      const response = await api.get(`/applications/validate-prn/${prn}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Error handler function
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      success: false,
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      success: false,
      message: 'No response from server. Please check your internet connection.',
      status: 0
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      success: false,
      message: error.message || 'An unknown error occurred',
      status: 0
    };
  }
};

export default api;
