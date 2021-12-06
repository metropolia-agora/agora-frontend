import { storage } from './storage.js';

// Backend base URL
const BASE_URL = 'http://localhost:5000';

// Execute API requests with authorization header
const executeApiCall = async (method, path, body) => {
  const token = storage.getToken();
  const headers = token ? { authorization: `Bearer ${token}` } : {};
  const response = await fetch(BASE_URL + path, { method, body, headers });
  return response.json();
}

// API utility functions
export const api = {
  // Make a HTTP GET rquest
  get: async (path) => executeApiCall('get', path),
  // Make a HTTP POST rquest
  post: async (path, body) => executeApiCall('post', path, body),
  // Make a HTTP DELETE rquest
  delete: async (path, body) => executeApiCall('delete', path, body),
};
