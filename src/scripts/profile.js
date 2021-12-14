import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderPost } from "./common/renderPost";
import {ElementHelper} from "./common/ElementHelper";

// Authentication check
const user = await authentication.check();

// Redirecting user to home if user not found
if (!user) {
  window.location.assign('/');
}

// Load the data of the user whose profile is being viewed

  const id = new URL(window.location).searchParams.get('id');
  const data = await api.get(`/api/users/${id}`);
if (!data.ok) {
    window.location.replace('/404');
  } else {
    const viewing = data.user;
    const headerTitle = document.querySelector('.user-name');
    headerTitle.textContent = viewing.username;

// Profile picture
    const profilePicture = document.querySelector('.profile-picture');
    if (viewing.filename) {
        profilePicture.appendChild(ElementHelper.create('img').setSrc(viewing.filename).htmlElement);
    } else {
        profilePicture.appendChild( ElementHelper.create('img').setSrc('assets/user.svg').htmlElement);
    }

// Get post list holder component
    const postsHolder = document.querySelector('.profile-posts');

// Last date before which posts are to be fetched, fetch trigger element, loading indicator
    let lastDate = new Date();
    let triggerElement = null;
    let isLoading = false;

// Fetch posts from the user
    const fetchPostsFromUser = async () => {
      isLoading = true;
      const data = await api.get(`/api/users/${id}/posts`);
      if (!data.posts?.length)return;
      data.posts.forEach(post => renderPost(postsHolder, post, user));
      const lastPost = data.posts[data.posts.length - 1];
      lastDate = lastPost.createdAt;
      triggerElement = document.querySelector(`#post_${lastPost.id}`);
      isLoading = false;
   };

// Fetch posts from the user once when opening the app
    await fetchPostsFromUser();

// Setting button
  document.getElementById("settings-button").addEventListener('click', () => window.location.assign('/settings'));
  if(user === viewing) {
      // clock is visible. hide it
    document.getElementById("settings-button").style.display = 'block';
      }
    else {
    document.getElementById("settings-button").style.display = 'none';
  }


}

