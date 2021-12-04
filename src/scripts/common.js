// Common utilities

// LocalStorage utility functions
const storage = {
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

// API utility functions
const api = {
  BASE_URL: 'http://localhost:5000',
  _executeApiRequest: async (method, path, body) => {
    const authorization = storage.getToken();
    const headers = authorization ? { authorization } : {};
    const response = await fetch(api.BASE_URL + path, { method, body, headers });
    return response.json();
  },
  // Make a HTTP GET rquest
  get: async (path) => api._executeApiRequest('get', path),
  // Make a HTTP POST rquest
  post: async (path, body) => api._executeApiRequest('post', path, body),
  // Make a HTTP DELETE rquest
  delete: async (path, body) => api._executeApiRequest('delete', path, body),
};

// ElementHelper utility class
class ElementHelper {
  htmlElement;

  constructor(tagName) {
    this.htmlElement = document.createElement(tagName);
  }

  setId(id) {
    this.htmlElement.id = id;
    return this;
  }

  setClass(className) {
    this.htmlElement.className = className;
    return this;
  }

  setOnClick(onClick) {
    this.htmlElement.onClick = onClick;
    return this;
  }

  setSrc(src) {
    this.htmlElement.src = src;
    return this;
  }

  setText(textContent) {
    this.htmlElement.textContent = textContent;
    return this;
  }

  setParent(parent) {
    parent.htmlElement.appendChild(this.htmlElement);
    return this;
  }

  static create(tagName) {
    return new ElementHelper(tagName);
  }
}
