// Home scripts

const createPostElement = (post, isModerator = false) => {

  // Container
  const container = ElementHelper.create('div').setClass('post-container');

  // Header
  const header = ElementHelper.create('div').setClass('post-header').setParent(container);
  const profilePicture = ElementHelper.create('div').setClass('post-header-profile').setParent(header);
  if (post.owner.filename) {
    ElementHelper.create('img').setSrc(post.owner.filename).setParent(profilePicture);
  } else {
    ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').setParent(profilePicture);
  }
  ElementHelper.create('div').setClass('post-header-username').setText(post.owner.username).setParent(header);
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
  ElementHelper.create('p').setText(post.upvotes).setParent(upvote);
  const downvote = ElementHelper.create('div').setClass('post-actions-item post-actions-downvote').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/downvote_inactive.svg').setParent(downvote);
  ElementHelper.create('p').setText(post.downvotes).setParent(downvote);
  const comment = ElementHelper.create('div').setClass('post-actions-item post-actions-comment').setParent(actions);
  ElementHelper.create('img').setClass('icon').setSrc('assets/comment.svg').setParent(comment);
  ElementHelper.create('p').setText(post.comments).setParent(comment);
  if (isModerator) {
    const remove = ElementHelper.create('div').setClass('post-actions-item post-actions-ban').setParent(actions);
    ElementHelper.create('img').setClass('icon').setSrc('assets/remove.svg').setParent(remove);
  }

  return container.htmlElement;
};

const posts = generateRandomPosts(30);
const postsHolder = document.querySelector('.home-posts');
posts.forEach(post => {
  postsHolder.appendChild(createPostElement(post, true));
});
