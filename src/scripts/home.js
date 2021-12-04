// Home scripts

const renderPostTo = (parent, post, isModeratorView = false) => {

  // Container
  const container = ElementHelper.create('div').setClass('post-container');

  // Header
  const header = ElementHelper.create('div').setClass('post-header').setParent(container);
  const profilePicture = ElementHelper.create('div').setClass('post-header-profile').setParent(header);
  if (post.ownerFilename) {
    ElementHelper.create('img').setSrc(post.ownerFilename).setParent(profilePicture);
  } else {
    ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').setParent(profilePicture);
  }
  ElementHelper.create('div').setClass('post-header-username').setText(post.ownerUsername).setParent(header);
  const formattedDate = moment(post.createdAt).fromNow();
  ElementHelper.create('div').setClass('post-header-timestamp').setText(formattedDate).setParent(header);

  // Content
  const content = ElementHelper.create('div').setClass(`post-content`).setParent(container);
  if (post.content) ElementHelper.create('p').setText(post.content).setParent(content);
  if (post.filename) ElementHelper.create('img').setSrc(post.filename).setParent(content);

  // Actions
  const actions = ElementHelper.create('div').setClass('post-actions').setParent(container);
  const upvote = ElementHelper.create('div').setClass('post-actions-item post-actions-upvote').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/upvote_inactive.svg').setParent(upvote);
  ElementHelper.create('p').setText(post.upvoteCount).setParent(upvote);
  const downvote = ElementHelper.create('div').setClass('post-actions-item post-actions-downvote').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/downvote_inactive.svg').setParent(downvote);
  ElementHelper.create('p').setText(post.downvoteCount).setParent(downvote);
  const comment = ElementHelper.create('div').setClass('post-actions-item post-actions-comment').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/comment.svg').setParent(comment);
  ElementHelper.create('p').setText(post.commentCount).setParent(comment);
  if (isModeratorView) {
    const remove = ElementHelper.create('div').setClass('post-actions-item post-actions-ban').setParent(actions);
    ElementHelper.create('img').setClass('icon').setSrc('assets/remove.svg').setParent(remove);
  }

  // Attach post to parent
  return parent.appendChild(container.htmlElement);
};

// Get post holder component
const postsHolder = document.querySelector('.home-posts');

// Fetch and render most recent posts
api.get(`/api/feed/recent?lastDate=${new Date()}`).then(data => {
  data.posts.forEach(post => renderPostTo(postsHolder, post, true));
});
