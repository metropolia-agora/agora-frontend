// LocalStorage utility functions
export const storage = {
  // Get the is-onboarded marker from LocalStorage
  getIsOnboarded: () => window?.localStorage?.getItem('agora_is_onboarded'),
  // Set the is-onboarded marker in LocalStorage
  setIsOnboarded: (isOnboarded) => window?.localStorage?.setItem('agora_is_onboarded', isOnboarded),
  // Get the JWT token from LocalStorage
  getToken: () => window?.localStorage?.getItem('agora_token') ?? undefined,
  // Set a new JWT token in LocalStorage
  setToken: (token) => {
    if (token) {
      window?.localStorage?.setItem('agora_token', token);
    } else {
      window?.localStorage?.removeItem('agora_token');
    }
  },
  // Get the user id from LocalStorage
  getUserId: () => window?.localStorage?.getItem('agora_userid') ?? undefined,
  // Set a new user id in LocalStorage
  setUserId: (userId) => {
    if (userId) {
      window?.localStorage?.setItem('agora_userid', userId);
    } else {
      window?.localStorage?.removeItem('agora_userid');
    }
  },
};
