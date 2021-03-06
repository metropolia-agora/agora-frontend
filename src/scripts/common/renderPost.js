import { api } from './api';
import { ElementHelper } from './ElementHelper';

// Up-/downvote icons (active and inactive)
const icons = {
  upvote: {
    active: 'assets/upvote_active.svg',
    inactive: 'assets/upvote_inactive.svg',
  },
  downvote: {
    active: 'assets/downvote_active.svg',
    inactive: 'assets/downvote_inactive.svg',
  },
};

// Handle reacting to a post, update UI and call API
const onPressReact = (postId, userId, type) => async (event) => {
  event.stopImmediatePropagation();
  if (!userId) {
    if (window.confirm('You need to sign in to be able to do this. Do you want to sign in now?')) {
      window.location.assign('/signin');
    }
    return;
  }

  // Get elements and check if the user has already up-/downvoted the post
  const upvoteCount = document.querySelector(`#post_${postId} > .post-actions > .upvote > p`);
  const downvoteCount = document.querySelector(`#post_${postId} > .post-actions > .downvote > p`);
  const upvoteIMG = document.querySelector(`#post_${postId} > .post-actions > .upvote > img`);
  const downvoteIMG = document.querySelector(`#post_${postId} > .post-actions > .downvote > img`);
  const isUpvoted = !upvoteIMG.src.includes('inactive');
  const isDownvoted = !downvoteIMG.src.includes('inactive');

  // Handle upvoting
  if (type === 1) {
    if (isUpvoted) {
      upvoteCount.textContent = String(Number.parseInt(upvoteCount.textContent) - 1);
      upvoteIMG.src = icons.upvote.inactive;
      await api.delete(`/api/posts/${postId}/reactions/${userId}`);
    } else {
      if (isDownvoted) {
        downvoteCount.textContent = String(Number.parseInt(downvoteCount.textContent) - 1);
        downvoteIMG.src = icons.downvote.inactive;
      }
      upvoteCount.textContent = String(Number.parseInt(upvoteCount.textContent) + 1);
      upvoteIMG.src = icons.upvote.active;
      await api.post(`/api/posts/${postId}/reactions/${userId}`, { type });
    }
  }

  // Handle downvoting
  if (type === -1) {
    if (isDownvoted) {
      downvoteCount.textContent = String(Number.parseInt(downvoteCount.textContent) - 1);
      downvoteIMG.src = icons.downvote.inactive;
      await api.delete(`/api/posts/${postId}/reactions/${userId}`);
    } else {
      if (isUpvoted) {
        upvoteCount.textContent = String(Number.parseInt(upvoteCount.textContent) - 1);
        upvoteIMG.src = icons.upvote.inactive;
      }
      downvoteCount.textContent = String(Number.parseInt(downvoteCount.textContent) + 1);
      downvoteIMG.src = icons.downvote.active;
      await api.post(`/api/posts/${postId}/reactions/${userId}`, { type });
    }
  }
};

// Handle removing a post, update UI and call API
const onPressRemove = (postId) => async (event) => {
  event.stopImmediatePropagation();
  if (window.confirm('Are you sure you want to remove this post? This cannot be undone.')) {
    await api.delete(`/api/posts/${postId}`);
    const isOnViewPostScreen = window.location.pathname === '/post';
    if (isOnViewPostScreen) {
      window.history.back();
    } else {
      document.querySelector(`#post_${postId}`).remove();
    }
  }
};

// Handle pressing the username and navigating to their profile page
const onPressUser = (userId) => (event) => {
  event.stopImmediatePropagation();
  window.location.assign(`/profile?id=${userId}`);
};

// Handle pressing the post and navigating to the detailed post view
const onPressPost = (postId) => (event) => {
  event.stopImmediatePropagation();
  const currentURL = window.location.pathname + window.location.search;
  const viewPostURL = `/post?id=${postId}`;
  if (currentURL !== viewPostURL) {
    window.location.assign(viewPostURL);
  }
};

// Format dates into human readable form
const formatDate = (date) => {
  const momentDate = moment(date);
  const oneDayAfter = moment(date).add(1, 'day');
  if (moment().isBefore(oneDayAfter)) {
    return momentDate.fromNow();
  } else {
    return momentDate.format('YYYY-MM-DD HH:mm');
  }
};

// Handle pressing the comment button and navigating to the detailed post view's comment section
const onPressComment = (postId, userId) => (event) => {
  event.stopImmediatePropagation();
  if (!userId) {
    if (window.confirm('You need to sign in to be able to do this. Do you want to sign in now?')) {
      window.location.assign('/signin');
    }
    return;
  }
  const currentURL = window.location.pathname + window.location.search;
  const viewPostURL = `/post?id=${postId}`;
  if (currentURL !== viewPostURL) {
    const commentURL = `/post?id=${postId}#comments`;
    window.location.assign(commentURL);
  } else {
    const commentInput = document.querySelector('#new-comment-input');
    commentInput.focus();
  }
};

// Render a post into parent element
export const renderPost = (parent, post, user) => {

  // Container
  const container = ElementHelper.create('div').setId(`post_${post.id}`).setClass('post-container');

  // Header
  const header = ElementHelper.create('div').setClass('post-header').setParent(container);
  const profilePicture = ElementHelper.create('div').setClass('post-header-profile').setOnClick(onPressUser(post.userId)).setParent(header);
  if (post.ownerFilename) {
    ElementHelper.create('img').setSrc(post.ownerFilename).setParent(profilePicture);
  } else {
    ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').setParent(profilePicture);
  }
  ElementHelper.create('div').setClass('post-header-username').setText(post.ownerUsername).setOnClick(onPressUser(post.userId)).setParent(header);
  ElementHelper.create('div').setClass('post-header-timestamp').setText(formatDate(post.createdAt)).setParent(header);

  // Content
  const content = ElementHelper.create('div').setClass('post-content').setOnClick(onPressPost(post.id)).setParent(container);
  if (post.content) ElementHelper.create('p').setText(post.content).setParent(content);
  if (post.filename) ElementHelper.create('img').setSrc(post.filename).setParent(content);

  // Actions
  const actions = ElementHelper.create('div').setClass('post-actions').setParent(container);

  // Actions - upvote
  const upvote = ElementHelper.create('div').setClass('post-actions-item upvote').setOnClick(onPressReact(post.id, user?.id, 1)).setParent(actions);
  const upvoteIcon = post.hasUpvoted ? 'assets/upvote_active.svg' : 'assets/upvote_inactive.svg';
  ElementHelper.create('img').setClass('icon').setSrc(upvoteIcon).setParent(upvote);
  ElementHelper.create('p').setText(post.upvoteCount).setParent(upvote);

  // Actions - downvote
  const downvote = ElementHelper.create('div').setClass('post-actions-item downvote').setOnClick(onPressReact(post.id, user?.id, -1)).setParent(actions);
  const downvoteIcon = post.hasDownvoted ? 'assets/downvote_active.svg' : 'assets/downvote_inactive.svg';
  ElementHelper.create('img').setClass('icon').setSrc(downvoteIcon).setParent(downvote);
  ElementHelper.create('p').setText(post.downvoteCount).setParent(downvote);

  // Actions - comment
  const comment = ElementHelper.create('div').setClass('post-actions-item comment').setOnClick(onPressComment(post.id, user?.id)).setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/comment.svg').setParent(comment);
  ElementHelper.create('p').setText(post.commentCount).setParent(comment);

  // Actions - remove
  if (user?.type === 2 || user?.id === post.userId) {
    const remove = ElementHelper.create('div').setClass('post-actions-item remove').setOnClick(onPressRemove(post.id)).setParent(actions);
    ElementHelper.create('img').setClass('icon').setSrc('assets/remove.svg').setParent(remove);
  }

  // Attach post to parent
  if (parent) {
    parent.appendChild(container.htmlElement);
  } else {
    return container.htmlElement;
  }
};
