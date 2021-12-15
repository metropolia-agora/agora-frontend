import { ElementHelper } from './ElementHelper.js';

// Render profile picture or icon into a container
export const renderProfilePicture = (container, user) => {
  if (user?.filename) {
    container.appendChild(ElementHelper.create('img').setSrc(user.filename).htmlElement);
  } else {
    container.appendChild(ElementHelper.create('img').setClass('icon').setSrc('assets/user.svg').htmlElement);
  }
};
