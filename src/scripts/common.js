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

// Random post generator utility
const generateRandomPosts = (amount) => {
  return Array(amount).fill(0).map(() => {
    const hasTextContent = Math.random() < 0.7;
    const hasFileContent = Math.random() < 0.5 || !hasTextContent;
    return {
      id: faker.random.uuid(),
      filename: hasFileContent ? `https://picsum.photos/seed/${faker.random.uuid()}/500/400` : null,
      content: hasTextContent ? faker.lorem.sentences() : null,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      owner: {
        id: faker.random.uuid(),
        username: faker.internet.userName(),
        filename: Math.random() <= 0.7 ? `https://picsum.photos/seed/${faker.random.uuid()}/200/300` : null,
      },
      upvotes: Math.round(Math.random() * 50),
      downvotes: Math.round(Math.random() * 10),
      comments: Math.round(Math.random() * 20),
    };
  });
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
