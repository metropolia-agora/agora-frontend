import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderPost } from './common/renderPost';

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');

// Get post list holder component
const postsHolder = document.querySelector('.home-posts');

// Last date before which posts are shown, fetch trigger element, loading indicator
let lastDate = new Date();
let triggerElement = null;
let isLoading = false;

// Fetch posts from the feed
const fetchPostsFromFeed = async () => {
  isLoading = true;
  const data = await api.get(`/api/feed/recent?lastDate=${lastDate}`);
  data.posts.forEach(post => renderPost(postsHolder, post, user));
  const lastPost = data.posts[data.posts.length - 1];
  lastDate = lastPost.createdAt;
  triggerElement = document.querySelector(`#post_${lastPost.id}`);
  isLoading = false;
};

// Fetch posts from the feed once when opening the app
await fetchPostsFromFeed();

// Fetch posts from feed when scrolling to the trigger element
window.addEventListener('scroll', async () => {
  const { top } = triggerElement.getBoundingClientRect();
  if (!isLoading && top <= window.innerHeight) await fetchPostsFromFeed();
});
