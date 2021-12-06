import { api } from './api';
import { storage } from './storage';

// Check the authentication credentials and return user data
const check = async () => {
  const token = storage.getToken();
  const userId = storage.getUserId();
  if (!token || !userId) {
    storage.clear();
    return null;
  } else {
    const data = await api.get(`/api/users/${userId}`);
    if (!data.ok) {
      storage.clear();
      return null;
    } else {
      return data.user;
    }
  }
};

// Set the authentication credentials and sign the user in
const signin = (token, userId) => {
  storage.setToken(token);
  storage.setUserId(userId);
  window.location.reload();
};

// Clear the authentication credentials and sign the user out
const signout = () => {
  storage.clear();
  window.location.reload();
};

// Authentication utility functions
export const authentication = { check, signin, signout };
