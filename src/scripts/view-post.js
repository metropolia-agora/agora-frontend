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

  // Render post
  const postHolder = document.querySelector('#post-holder');
  renderPost(postHolder, post, user);

  // Render comments
  const ownComments = user ? comments.filter(c => c.userId === user.id) : [];
  const otherComments = user ? comments.filter(c => c.userId !== user.id) : comments;
  const commentHolder = document.querySelector('#comment-holder');
  ownComments.forEach(comment => renderComment(commentHolder, comment, user));
  otherComments.forEach(comment => renderComment(commentHolder, comment, user));
}
