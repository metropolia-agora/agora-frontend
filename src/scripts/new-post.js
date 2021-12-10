import { api } from './common/api';

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

  // Upload new post
  if (body.get('content') || body.get('file')) {
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
