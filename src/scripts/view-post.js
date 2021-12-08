import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderComment } from './common/renderComment';
import { renderPost } from './common/renderPost';
import { ElementHelper } from './common/ElementHelper';

// Authentication check
const user = await authentication.check();

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

  // Render post
  const postHolder = document.querySelector('#post-holder');
  renderPost(postHolder, post, user);

  // Render comments
  const ownComments = user ? comments.filter(c => c.userId === user.id) : [];
  const otherComments = user ? comments.filter(c => c.userId !== user.id) : comments;
  const commentHolder = document.querySelector('#comment-holder');
  ownComments.forEach(comment => renderComment(commentHolder, comment, user));
  otherComments.forEach(comment => renderComment(commentHolder, comment, user));

  // Create new comment
  if (user) {

    // Show new comment form to signed-in users
    const newCommentElement = document.querySelector('#new-comment-container');
    newCommentElement.classList.remove('hidden');

    // Add new comments
    const commentButton = document.querySelector('#new-comment-button');
    const commentInput = document.querySelector('#new-comment-input');

    // Set user profile picture for new comment
    const commentProfile = document.querySelector('#new-comment-profile');
    if (user.filename) {
      commentProfile.appendChild(ElementHelper.create('img').setSrc(user.filename).htmlElement);
    } else {
      commentProfile.appendChild(ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').htmlElement);
    }

    // Disable comment button when comment input is empty
    commentInput.addEventListener('keyup', async (event) => {
      if (event.keyCode === 13) {
        await handleNewCommitSubmit();
      } else {
        commentButton.className = commentInput.value ? '' : 'disabled';
      }
    });

    // Listen to clicking the add comment button
    commentButton.addEventListener('click', async (event) => {
      event.stopImmediatePropagation();
      await handleNewCommitSubmit();
    });

    // Handle posting comment to api, rendering new comment, emptying input field
    const handleNewCommitSubmit = async () => {
      const content = commentInput.value;
      if (content) {
        const response = await api.post(`/api/posts/${post.id}/comments`, { content });
        if (!response.ok) return window.alert('An unexpected error has occured.');
        const newComment = renderComment(null, response.comment, user);
        commentHolder.insertBefore(newComment, commentHolder.children[0]);
        commentInput.value = '';
        commentButton.className = 'disabled';
        const commentCounter = document.querySelector(`#post_${post.id} > .post-actions .comment > p`);
        commentCounter.textContent = String(Number(commentCounter.textContent) + 1);
      }
    };
  }
}
