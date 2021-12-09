import { authentication } from './common/authentication';
import { api } from "./common/api";

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');

if (user) {
    window.location.assign('/');
}

// Pick html elements
const form = document.getElementById('signin-form');
const inputUsername = document.getElementById('field-username');
const inputPassword = document.getElementById('field-password');

// Read values from input fields and call api when button clicked
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = inputUsername.value;
    const password = inputPassword.value;

    // Check if the given credentials are valid.
    const response = await api.post('/api/users/auth', { username, password });

    // If given credentials are not valid, display en error
    // If all is good, store credentials to localStorage and redirect to home page
    if (!response.ok) {
        alert(response.message);
        inputUsername.value = '';
        inputPassword.value = '';
    } else {
        const {user, token} = response;
        authentication.signin(token, user.id);
    }

});
