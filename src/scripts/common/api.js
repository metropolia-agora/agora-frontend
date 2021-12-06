import { storage } from './storage';

// Backend base URL
export const BASE_URL = 'http://localhost:5000';

// Execute API requests with authorization header
const executeApiCall = async (method, path, body) => {
  const token = storage.getToken();
  const authorization = token ? { authorization: `Bearer ${token}` } : {};
  const headers = { 'Content-Type': 'application/json', ...authorization };
  const response = await fetch(BASE_URL + path, { method, body: JSON.stringify(body), headers });
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
