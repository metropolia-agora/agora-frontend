import { api, authentication, renderPost } from './common';

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');

// Get post list holder component
const postsHolder = document.querySelector('.home-posts');

// Fetch and render most recent posts
api.get(`/api/feed/recent?lastDate=${new Date()}`).then(data => {
  data.posts.forEach(post => renderPost(postsHolder, post, user));
});
