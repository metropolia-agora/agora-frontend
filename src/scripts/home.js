import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderPost } from './common/renderPost';
import { renderNavigationBar } from './common/renderNavigationBar.js';
import { renderTopMenu } from './common/renderTopMenu';

// Authentication check
const currentUser = await authentication.check();

// Render top menu (hamburger menu) content depending on user type
renderTopMenu(currentUser);

// Render navigation bar
const navbar = document.querySelector('#mobile-navigation-bar');
renderNavigationBar(navbar, currentUser);

// Get post list holder component
const postsHolder = document.querySelector('.home-container');

// Last date before which posts are to be fetched, fetch trigger element, loading indicator
let lastDate = new Date();
let triggerElement = null;
let isLoading = false;

// Fetch posts from the feed
const fetchPostsFromFeed = async () => {
  isLoading = true;
  const data = await api.get(`/api/feed/recent?lastDate=${lastDate}`);
  if (!data.posts?.length) return;
  data.posts.forEach(post => renderPost(postsHolder, post, currentUser));
  const lastPost = data.posts[data.posts.length - 1];
  lastDate = lastPost.createdAt;
  triggerElement = document.querySelector(`#post_${lastPost.id}`);
  isLoading = false;
};

// Fetch posts from the feed once when opening the app
await fetchPostsFromFeed();

// Fetch posts from feed when scrolling to the trigger element
const page = document.querySelector('.home-page');
page.addEventListener('scroll', async () => {
  const { top } = triggerElement.getBoundingClientRect();
  if (!isLoading && top <= window.innerHeight) await fetchPostsFromFeed();
});
