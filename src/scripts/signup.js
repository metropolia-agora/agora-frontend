import { authentication } from './common/authentication';
import { api } from "./common/api";

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');

if (user) {
    alert('You are already signed in.\nCreating a new user disabled.')
}

// Pick html elements
const form = document.getElementById('signup-form');
const inputUsername = document.getElementById('field-username');
const inputPassword = document.getElementById('field-password');
const inputPasswordMatch = document.getElementById('field-passwordMatch');

// Read values from input fields and check if passwords match when button clicked
form.addEventListener('submit', async (event) => {
    event.preventDefault();

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
            inputUsername.value = '';
        } else {
            const { user, token } = response;
            authentication.signin(token, user.id);
        }

    } else {
        alert('Passwords do not match.');
        inputPassword.value = '';
        inputPasswordMatch.value = '';
    }

});
