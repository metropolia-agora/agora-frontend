import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderPost } from './common/renderPost';
import { renderTopMenu } from "./common/renderTopMenu";

// Authentication check (User or null)
const user = await authentication.check();

// Render top menu (hamburger menu) content depending on user type
renderTopMenu(user);

// Pick navigation bar elements
const navHome = document.querySelector('#mobile-nav-home');
const navNew = document.querySelector('#mobile-nav-new');
const navProfile = document.querySelector('#mobile-nav-profile');

// Handle navigation bar clicks
navHome.addEventListener('click', () => window.location.assign('/'));
navProfile.addEventListener('click', () => window.location.assign(user ? '/settings' : '/signin'));
navNew.addEventListener('click', () => {
  if (user) {
    window.location.assign('/new');
  } else if (window.confirm('You need to sign in to be able to do this. Do you want to sign in now?')) {
    window.location.assign('/signin');
  }
});

// Get post list holder component
const postsHolder = document.querySelector('.home-posts');

// Last date before which posts are to be fetched, fetch trigger element, loading indicator
let lastDate = new Date();
let triggerElement = null;
let isLoading = false;

// Fetch posts from the feed
const fetchPostsFromFeed = async () => {
  isLoading = true;
  const data = await api.get(`/api/feed/recent?lastDate=${lastDate}`);
  if (!data.posts?.length) return;
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
