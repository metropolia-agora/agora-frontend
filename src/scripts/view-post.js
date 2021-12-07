import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderComment } from './common/renderComment';
import { renderPost } from './common/renderPost';

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');

// Back button handler
const backButton = document.querySelector('header > img');
backButton.addEventListener('click', () => window.history.back());

// Load the data of the post that is being viewed
const id = new URL(window.location).searchParams.get('id');
const data = await api.get(`/api/posts/${id}`);
if (!data.ok) {
  console.log('wrong post');
} else {
  const { post, comments } = data;
  console.log('viewing post', post, comments);
  const postHolder = document.querySelector('#post-holder');
  renderPost(postHolder, post, user);
  const commentHolder = document.querySelector('#comment-holder');
  comments.forEach(comment => renderComment(commentHolder, comment, user));
}
