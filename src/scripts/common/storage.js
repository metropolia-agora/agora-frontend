// LocalStorage utility functions
export const storage = {
  // Get the JWT token from LocalStorage
  getToken: () => window?.localStorage?.getItem('agora_token') ?? undefined,
  // Set a new JWT token in LocalStorage
  setToken: (token) => window?.localStorage?.setItem('agora_token', token),
  // Get the user id from LocalStorage
  getUserId: () => window?.localStorage?.getItem('agora_userid') ?? undefined,
  // Set a new user id in LocalStorage
  setUserId: (userId) => window?.localStorage?.setItem('agora_userid', userId),
  // Clear all data from LocalStorage
  clear: () => window?.localStorage?.clear(),
};
