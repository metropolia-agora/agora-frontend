import { authentication } from './common/authentication';
import { api } from './common/api';
import { renderNavigationBar } from './common/renderNavigationBar.js';

// Authentication check
const currentUser = await authentication.check();

// Redirecting user to home if not logged in
if (!currentUser) {
  window.location.assign('/');
}

// Render navigation bar
const navbar = document.querySelector('#mobile-navigation-bar');
renderNavigationBar(navbar, currentUser);

// Pick html elements
const form = document.querySelector('#new-post');
const content = document.querySelector('#content');
const file = document.querySelector('#file');

// Handle new post
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Build body data
  const body = new FormData();
  if (content.value) body.append('content', content.value);
  if (file.files.length > 0) body.append('file', file.files[0]);

  // Check file size
  if (body.has('file')) {
    const file = body.get('file');
    if (file.size >= 10485760) {
      window.alert('The file is too large. Maximum 10MB.');
      return;
    }
  }

  // Upload new post
  if (body.has('content') || body.has('file')) {
    const response = await api.post('/api/posts', body);
    if (!response.ok) {
      window.alert('An unexpected error has occured.');
    } else {
      window.location.assign('/');
    }
  } else {
    window.alert('The post cannot be empty. Please add some text or a file.');
  }
});
