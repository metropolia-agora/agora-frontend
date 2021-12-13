import { storage } from './common/storage.js';

// Pick html elements
const signup = document.querySelector('#signup');
const signin = document.querySelector('#signin');
const anon = document.querySelector('#anon');

// Handle sign up button press
signup.addEventListener('click', (event) => {
  event.preventDefault();
  storage.setIsOnboarded(true);
  window.location.replace('/signup');
});

// Handle sign in button press
signin.addEventListener('click', (event) => {
  event.preventDefault();
  storage.setIsOnboarded(true);
  window.location.replace('/signin');
});

// Handle anon button press
anon.addEventListener('click', (event) => {
  event.preventDefault();
  storage.setIsOnboarded(true);
  window.location.replace('/');
});
