// Common scripts

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

// Render post into parent element
const renderPost = (parent, post, isModeratorView = false) => {

  // Container
  const container = ElementHelper.create('div').setClass('post-container');

  // Header
  const header = ElementHelper.create('div').setClass('post-header').setParent(container);
  const profilePicture = ElementHelper.create('div').setClass('post-header-profile').setParent(header);
  if (post.ownerFilename) {
    ElementHelper.create('img').setSrc(post.ownerFilename).setParent(profilePicture);
  } else {
    ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').setParent(profilePicture);
  }
  ElementHelper.create('div').setClass('post-header-username').setText(post.ownerUsername).setParent(header);
  const formattedDate = moment(post.createdAt).fromNow();
  ElementHelper.create('div').setClass('post-header-timestamp').setText(formattedDate).setParent(header);

  // Content
  const content = ElementHelper.create('div').setClass(`post-content`).setParent(container);
  if (post.content) ElementHelper.create('p').setText(post.content).setParent(content);
  if (post.filename) ElementHelper.create('img').setSrc(post.filename).setParent(content);

  // Actions
  const actions = ElementHelper.create('div').setClass('post-actions').setParent(container);
  const upvote = ElementHelper.create('div').setClass('post-actions-item post-actions-upvote').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/upvote_inactive.svg').setParent(upvote);
  ElementHelper.create('p').setText(post.upvoteCount).setParent(upvote);
  const downvote = ElementHelper.create('div').setClass('post-actions-item post-actions-downvote').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/downvote_inactive.svg').setParent(downvote);
  ElementHelper.create('p').setText(post.downvoteCount).setParent(downvote);
  const comment = ElementHelper.create('div').setClass('post-actions-item post-actions-comment').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/comment.svg').setParent(comment);
  ElementHelper.create('p').setText(post.commentCount).setParent(comment);
  if (isModeratorView) {
    const remove = ElementHelper.create('div').setClass('post-actions-item post-actions-ban').setParent(actions);
    ElementHelper.create('img').setClass('icon').setSrc('assets/remove.svg').setParent(remove);
  }

  // Attach post to parent
  return parent.appendChild(container.htmlElement);
};
