// src/api/client.ts

import axios from 'axios';
import { appStorage } from '../storage/appStorage';

const API_BASE_URL = 'http://192.168.100.51:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: false,
});

apiClient.interceptors.request.use(
  async (config) => {
    const userId = await appStorage.getItem('x-user-id');

    if (userId) {
      config.headers['x-user-id'] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
      console.error('API Error Headers:', error.response.headers);
    } else if (error.request) {
      console.error('API Error Request:', error.request);
    } else {
      console.error('API Error Message:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;