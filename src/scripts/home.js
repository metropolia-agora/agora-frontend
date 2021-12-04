// Home scripts

// Get post holder component
const postsHolder = document.querySelector('.home-posts');

// Fetch and render most recent posts
api.get(`/api/feed/recent?lastDate=${new Date()}`).then(data => {
  data.posts.forEach(post => renderPost(postsHolder, post, true));
});
