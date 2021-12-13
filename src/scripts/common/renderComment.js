import { ElementHelper } from './ElementHelper';
import { api } from './api';

// Handle removing a comment, calling the api, hiding the element, and decreasing counter
const onPressRemove = (postId, commentId) => async (event) => {
  event.stopImmediatePropagation();
  if (window.confirm('Are you sure you want to remove this comment? This cannot be undone.')) {
    await api.delete(`/api/posts/${postId}/comments/${commentId}`);
    const commentElement = document.querySelector(`#comment_${commentId}`);
    commentElement.remove();
    const commentCounter = document.querySelector(`#post_${postId} > .post-actions .comment > p`);
    commentCounter.textContent = String(Number(commentCounter.textContent) - 1);
  }
};

// Handle pressing the username and navigating to their profile page
const onPressUser = (userId) => (event) => {
  event.stopImmediatePropagation();
  window.location.assign(`/profile?id=${userId}`);
};

// Render a comment into parent element
export const renderComment = (parent, comment, user) => {

  // Container
  const container = ElementHelper.create('div').setId(`comment_${comment.id}`).setClass('comment-container');

  // Profile picture
  const profilePicture = ElementHelper.create('div').setClass('comment-profile').setOnClick(onPressUser(comment.userId)).setParent(container);
  if (comment.ownerFilename) {
    ElementHelper.create('img').setSrc(comment.ownerFilename).setParent(profilePicture);
  } else {
    ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').setParent(profilePicture);
  }

  // Content
  const content = ElementHelper.create('div').setClass('comment-content').setParent(container);
  ElementHelper.create('p').setText(comment.ownerUsername).setOnClick(onPressUser(comment.userId)).setParent(content);
  ElementHelper.create('p').setText(comment.content).setParent(content);

  // Actions
  if (user?.type === 2 || user?.id === comment.ownerId) {
    const actions = ElementHelper.create('div').setClass('comment-actions').setOnClick(onPressRemove(comment.postId, comment.id)).setParent(container);
    ElementHelper.create('img').setSrc('assets/remove.svg').setParent(actions);
  }

  if (parent) {
    parent.appendChild(container.htmlElement);
  } else {
    return container.htmlElement;
  }

};
