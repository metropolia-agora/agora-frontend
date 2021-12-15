import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderComment } from './common/renderComment';
import { renderPost } from './common/renderPost';
import { renderProfilePicture } from './common/renderProfilePicture.js';

// Authentication check
const currentUser = await authentication.check();

// Load the data of the post that is being viewed
const id = new URL(window.location).searchParams.get('id');
const postDataResponse = await api.get(`/api/posts/${id}`);

// Redirect to 404 if not found
if (!postDataResponse.ok) {
  window.location.replace('/404');
} else {
  const { post, comments } = postDataResponse;

  // Render post
  const postHolder = document.querySelector('#post-holder');
  renderPost(postHolder, post, currentUser);

  // Render comments
  const ownComments = currentUser ? comments.filter(c => c.userId === currentUser.id) : [];
  const otherComments = currentUser ? comments.filter(c => c.userId !== currentUser.id) : comments;
  const commentHolder = document.querySelector('#comment-holder');
  ownComments.forEach(comment => renderComment(commentHolder, comment, currentUser));
  otherComments.forEach(comment => renderComment(commentHolder, comment, currentUser));

  // Create new comment
  if (currentUser) {

    // Show new comment form to signed-in users
    const newCommentContainer = document.querySelector('#new-comment-container');
    newCommentContainer.classList.remove('hidden');

    // Get input and button elements
    const commentButton = document.querySelector('#new-comment-button');
    const commentInput = document.querySelector('#new-comment-input');

    // Autofocus new comment input field if the url has #comments
    if (window.location.hash === '#comments') commentInput.focus();

    // Set user profile picture for new comment
    const commentProfile = document.querySelector('#new-comment-profile');
    renderProfilePicture(commentProfile, currentUser);

    // Disable comment button when comment input is empty
    commentInput.addEventListener('keyup', async (event) => {
      if (event.keyCode === 13) {
        await handleNewCommentSubmit();
      } else {
        commentButton.className = commentInput.value ? '' : 'disabled';
      }
    });

    // Listen to clicking the add comment button
    commentButton.addEventListener('click', async () => {
      await handleNewCommentSubmit();
    });

    // Handle posting comment to api, rendering new comment, emptying input field
    const handleNewCommentSubmit = async () => {
      const content = commentInput.value;
      if (content) {
        const response = await api.post(`/api/posts/${post.id}/comments`, { content });
        if (!response.ok) return window.alert('An unexpected error has occured.');
        const newComment = renderComment(null, response.comment, currentUser);
        commentHolder.insertBefore(newComment, commentHolder.children[0]);
        commentInput.value = '';
        commentButton.className = 'disabled';
        const commentCounter = document.querySelector(`#post_${post.id} > .post-actions .comment > p`);
        commentCounter.textContent = String(Number(commentCounter.textContent) + 1);
      }
    };
  }
}
