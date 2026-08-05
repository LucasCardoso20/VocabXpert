// src/api/client.ts

import axios from 'axios';
import { appStorage } from '../storage/appStorage'; // ✅ URL base do seu backend
const API_BASE_URL = 'http://192.168.0.12:3000'; // Verifique se este IP ainda está correto!

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Tempo limite de 1.5 segundos
  withCredentials: false, // ✅ Incluir cookies e credenciais
});

// ✅ Interceptor para adicionar o x-user-id automaticamente
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

// ✅ Interceptor para tratamento de erros genéricos (opcional, mas recomendado)
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