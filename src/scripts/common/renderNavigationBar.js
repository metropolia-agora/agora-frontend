import { ElementHelper } from './ElementHelper.js';

// Handle pressing home button
const onPressHome = () => (event) => {
  event.stopImmediatePropagation();
  window.location.assign('/');
};

// Handle pressing the new button
const onPressNew = (user) => (event) => {
  event.stopImmediatePropagation();
  if (user) {
    window.location.assign('/new');
  } else if (window.confirm('You need to sign in to be able to do this. Do you want to sign in now?')) {
    window.location.assign('/signin');
  }
};

// Handle pressing the profile button
const onPressProfile = (user) => (event) => {
  event.stopImmediatePropagation();
  if (user) {
    window.location.assign(`/profile?id=${user.id}`);
  } else {
    window.location.assign('/signin');
  }
};

// Render navigation bar into a container
export const renderNavigationBar = (container, user) => {
  ElementHelper.create('img').setSrc('assets/home.svg').setOnClick(onPressHome()).setParent(container);
  ElementHelper.create('img').setSrc('assets/new.svg').setOnClick(onPressNew(user)).setParent(container);
  if (user) {
    ElementHelper.create('img').setSrc('assets/user.svg').setOnClick(onPressProfile(user)).setParent(container);
  } else {
    ElementHelper.create('img').setSrc('assets/signin.svg').setOnClick(onPressProfile(user)).setParent(container);
  }
  return container;
};
