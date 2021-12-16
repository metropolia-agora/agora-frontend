import { authentication } from './authentication';
import { ElementHelper } from './ElementHelper';

// Toggle hamburger menu on when menuButton clicked and prevent scrolling.
const onPressMenu = (event) => {
  event.preventDefault();
  document.querySelector('#top-menu > ul').classList.remove('hidden');
};

// Toggle hamburger menu off when closeButton clicked and allow scrolling again.
const onPressClose = (event) => {
  event.preventDefault();
  document.querySelector('#top-menu > ul').classList.add('hidden');
};

// Close menu when pressing the overlay
const onPressOverlay = (event) => {
  if (event.target.tagName === 'UL') {
    event.preventDefault();
    document.querySelector('#top-menu > ul').classList.add('hidden');
  }
};

// Logging out for eventListener
const onPressLogout = (event) => {
  event.preventDefault();
  authentication.signout();
};

export const renderTopMenu = (user) => {
  // Pick and create main top menu elements
  const navbar = document.getElementById('top-menu');
  const openButton = ElementHelper.create('button').setId('menuButton').setOnClick(onPressMenu).setParent(navbar);
  const overlay = ElementHelper.create('ul').setClass('menubar hidden').setOnClick(onPressOverlay).setParent(navbar);
  const closeButton = ElementHelper.create('button').setId('closeButton').setOnClick(onPressClose).setParent(overlay);
  const liHome = ElementHelper.create('li').setParent(overlay);

  // Add icon to buttons (menu & close)
  ElementHelper.create('i').setClass('fas fa-bars').setParent(openButton);
  ElementHelper.create('i').setClass('fas fa-times').setParent(closeButton);

  // Add home button as common menu element to all users
  ElementHelper.create('a').setHref('/').setText('Home').setParent(liHome);

  // If user if logged in, show buttons for profile, settings and logout.
  // If not, show buttons for sign in and sign up.
  if (user) {
    const liProfile = ElementHelper.create('li').setParent(overlay);
    const liSettings = ElementHelper.create('li').setParent(overlay);
    const liLogout = ElementHelper.create('li').setParent(overlay);
    ElementHelper.create('a').setHref(`/profile?id=${user.id}`).setText('Profile').setParent(liProfile);
    ElementHelper.create('a').setHref('/settings').setText('Settings').setParent(liSettings);
    ElementHelper.create('a').setOnClick(onPressLogout).setText('Sign out').setParent(liLogout);
  } else {
    const liSignin = ElementHelper.create('li').setParent(overlay);
    const liSignup = ElementHelper.create('li').setParent(overlay);
    ElementHelper.create('a').setHref('/signin').setText('Sign in').setParent(liSignin);
    ElementHelper.create('a').setHref('/signup').setText('Sign up').setParent(liSignup);
  }
};
