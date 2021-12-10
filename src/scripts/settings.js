import { authentication } from './common/authentication';

// Pick html elements
const signout = document.querySelector('#signout');

// Handle signing out
signout.addEventListener('click', (event) => {
  event.preventDefault();
  authentication.signout();
});
