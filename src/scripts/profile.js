import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderPost } from './common/renderPost';
import { renderProfilePicture } from './common/renderProfilePicture.js';
import { renderNavigationBar } from './common/renderNavigationBar.js';
import { renderTopMenu } from './common/renderTopMenu';

// Authentication check
const currentUser = await authentication.check();

// Render top menu (hamburger menu) content depending on user type
renderTopMenu(currentUser);

// Render navigation bar
const navbar = document.querySelector('#navigation-bar');
renderNavigationBar(navbar, currentUser);

// Load the data of the user whose profile is being viewed
const id = new URL(window.location).searchParams.get('id');
const userDataResponse = await api.get(`/api/users/${id}`);

// Redirect to 404 if not found
if (!userDataResponse.ok) {
  window.location.replace('/404');
} else {
  const viewedUser = userDataResponse.user;

  // Set username in header and username div
  const headerTitle = document.querySelector('header > h1');
  const usernameDiv = document.querySelector('.profile-username');
  headerTitle.textContent = viewedUser.username;
  usernameDiv.textContent = viewedUser.username;

  // Display profile picture
  const profilePicture = document.querySelector('.profile-picture');
  renderProfilePicture(profilePicture, viewedUser);

  // Fetch posts from the user and render them
  const postsHolder = document.querySelector('.profile-posts');
  const userPostsResponse = await api.get(`/api/users/${id}/posts`);
  userPostsResponse.posts.forEach(post => renderPost(postsHolder, post, currentUser));

  // Show edit profile and signout buttons
  if (currentUser?.id === viewedUser.id) {
    const actionsContainer = document.querySelector('.profile-actions');
    actionsContainer.classList.remove('hidden');
    const editButton = document.querySelector('#profile-edit');
    editButton.addEventListener('click', () => window.location.assign('/settings'));
    const signoutButton = document.querySelector('#profile-signout');
    signoutButton.addEventListener('click', () => authentication.signout());
  }
}
