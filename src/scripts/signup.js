import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderTopMenu } from './common/renderTopMenu';

// Authentication check
const currentUser = await authentication.check();

// Render top menu (hamburger menu) content depending on user type
renderTopMenu(currentUser);

// Pick html elements
const form = document.getElementById('signup-form');
const inputUsername = document.getElementById('field-username');
const inputPassword = document.getElementById('field-password');
const inputPasswordMatch = document.getElementById('field-passwordMatch');

// Read values from input fields and check if passwords match when button clicked
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get input field values
  const username = inputUsername.value;
  const password = inputPassword.value;
  const doesMatch = inputPasswordMatch.value;

  // Make an api call if passwords match
  // If not, show an error
  if (password === doesMatch) {
    const response = await api.post('/api/users', { username, password });

    // If username already exists, show an error
    // If all is good, store credentials to localStorage and redirect to home page
    if (!response.ok) {
      alert(response.details.username);
    } else {
      const { user, token } = response;
      authentication.signin(token, user.id);
    }

  } else {
    alert('Passwords do not match.');
  }
});
