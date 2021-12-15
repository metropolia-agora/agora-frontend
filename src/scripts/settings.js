import { api } from './common/api';
import { authentication } from './common/authentication';
import { renderNavigationBar } from './common/renderNavigationBar.js';

// Authentication check
const currentUser = await authentication.check();

// Redirecting user to home if not logged in
if (!currentUser) {
  window.location.assign('/');
}

// Render navigation bar
const navbar = document.querySelector('#mobile-navigation-bar');
renderNavigationBar(navbar, currentUser);

// Select html elements
const formChangePicture = document.getElementById('change-picture');
const formChangeUsername = document.getElementById('change-username');
const formChangePassword = document.getElementById('change-password');
const formDeleteUser = document.getElementById('delete-user');
const inputPicture = document.getElementById('field-picture');
const inputUsername = document.getElementById('field-username');
const inputCurrentPassword = document.getElementById('field-currentPassword');
const inputNewPassword = document.getElementById('field-newPassword');
const inputNewPasswordMatch = document.getElementById('field-newPasswordMatch');
const inputDeleteUser = document.getElementById('field-password');
const buttonSubmitPicture = document.getElementById('submit-picture');
const successNotification = document.getElementById('saved');

// Pre-fill username input with current username
inputUsername.value = currentUser.username;

// Success helper
const showSuccessMessage = () => {
  successNotification.classList.add('visible');
  setTimeout( () => {
    successNotification.classList.remove('visible');
  }, 3000);
};

// Set save changes button text for profile picture upload
inputPicture.addEventListener('change', () => {
  buttonSubmitPicture.textContent = inputPicture.files.length ? 'Update picture' : 'Remove picture';
});

// CHANGE PROFILE PICTURE
formChangePicture.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Create form-data body
  const body = new FormData();
  if (inputPicture.files.length > 0) body.append('file', inputPicture.files[0]);

  // Check file size
  if (body.has('file')) {
    const file = body.get('file');
    if (file.size >= 10485760) {
      window.alert('The file is too large. Maximum 10MB.');
      return;
    }
  }

  // Send the file (or empty body) to the api
  const response = await api.post(`/api/users/${currentUser.id}/picture`, body);
  if (!response.ok) {
    window.alert(response.message);
  } else {
    showSuccessMessage();
  }

});

// CHANGE USERNAME
formChangeUsername.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get input field value
  const username = inputUsername.value;

  // Make an api call
  const response = await api.post(`/api/users/${currentUser.id}/username`, { username });

  // If username is already in use, show an error
  // If all is good, show a timed success notification and clear the input field
  if (!response.ok) {
    alert(response.message);
  } else {
    showSuccessMessage();
  }
});

// CHANGE PASSWORD
// Read values from input fields and check if passwords match when button clicked
formChangePassword.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get input field values
  const currentPassword = inputCurrentPassword.value;
  const newPassword = inputNewPassword.value;
  const doesMatch = inputNewPasswordMatch.value;

  // If passwords match, make api call
  // If not, show an error
  if (newPassword === doesMatch) {
    const response = await api.post(`/api/users/${currentUser.id}/password`, { newPassword, currentPassword });

    // If current password is incorrect, show an error
    // If all is good, show a timed success notification and clear the input fields
    if (!response.ok) {
      alert(response.message);
    } else {
      inputCurrentPassword.value = '';
      inputNewPassword.value = '';
      inputNewPasswordMatch.value = '';
      showSuccessMessage();
    }
  } else {
    alert('Passwords do not match.');
  }
});

// DELETE USER
formDeleteUser.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get input field value
  const password = inputDeleteUser.value;

  // Show a confirmation message asking if user is sure they want to delete their account
  // If user is sure, make an api call
  // If user is not sure, clear the input field
  if (confirm('This action cannot be reversed.\nClick "OK" if you want to continue nevertheless.') === true){
    const response = await api.delete(`/api/users/${currentUser.id}`, { password });
    console.log('response: ', response);

    // If password is incorrect, show an error
    // If all is good, show a notification and relocate user back to home
    if (!response.ok) {
      alert(response.message);
    } else {
      alert('Account deleted.');
      window.location.assign('/');
    }
  } else {
    inputDeleteUser.value = '';
  }
});
