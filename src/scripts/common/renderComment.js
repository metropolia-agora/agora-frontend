import { ElementHelper } from './ElementHelper';

export const renderComment = (parent, comment, user) => {

  // Container
  const container = ElementHelper.create('div').setId(`comment_${comment.id}`).setClass('comment-container');

  // Profile picture
  const profilePicture = ElementHelper.create('div').setClass('comment-profile').setParent(container);
  if (comment.ownerFilename) {
    ElementHelper.create('img').setSrc(comment.ownerFilename).setParent(profilePicture);
  } else {
    ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').setParent(profilePicture);
  }

  // Content
  const content = ElementHelper.create('div').setClass('comment-content').setParent(container);
  ElementHelper.create('p').setText(comment.ownerUsername).setParent(content);
  ElementHelper.create('p').setText(comment.content).setParent(content);

  // Actions
  const actions = ElementHelper.create('div').setClass('comment-actions').setParent(container);
  if (user?.type === 2 || user?.id === comment.ownerId) {
    ElementHelper.create('img').setSrc('assets/remove.svg').setParent(actions);
  }

  return parent.appendChild(container.htmlElement);

};
