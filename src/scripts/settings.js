import { authentication } from './common/authentication';
import { api } from "./common/api";

// Authentication check
const user = await authentication.check();

/*if (!user) {
    window.location.assign('/');
}*/

// Select html elements
const formChangeUsername = document.getElementById('change-username');
const formChangePassword = document.getElementById('change-password');
const formDeleteUser = document.getElementById('delete-user');
const inputUsername = document.getElementById('field-username');
const inputCurrentPassword = document.getElementById('field-currentPassword');
const inputNewPassword = document.getElementById('field-newPassword');
const inputNewPasswordMatch = document.getElementById('field-newPasswordMatch');
const inputDeleteUser = document.getElementById('field-password');
const logoutButton = document.getElementById('logout');
const successNotification = document.getElementById('success');

// CHANGING USERNAME
formChangeUsername.addEventListener('submit', async (event) => {
   event.preventDefault();

   const username = inputUsername.value;
   const response = await api.post(`/api/users/${user.id}/username`, { username });

   if (!response.ok) {
      alert(response.message);
      inputUsername.value = '';
   } else {
      successNotification.classList.add('visible');
      setTimeout( () => { successNotification.classList.remove('visible') }, 1000);
   }
});

// CHANGING PASSWORD
formChangePassword.addEventListener('submit', async (event) => {
   event.preventDefault();

   const currentPassword = inputCurrentPassword.value;
   const newPassword = inputNewPassword.value;
   const doesMatch = inputNewPasswordMatch.value;

   // If passwords match, make api call
   // If not, show an error
   if (newPassword === doesMatch) {
      const response = await api.post(`/api/users/${user.id}/password`, { newPassword, currentPassword });

      // If current password is incorrect, show an error
      // If all is good, show timed notification
      if (!response.ok) {
         alert(response.message);
      } else {
         successNotification.classList.add('visible');
         setTimeout( () => { successNotification.classList.remove('visible') }, 3000);
      }

      inputCurrentPassword.value = '';
      inputNewPassword.value = '';
      inputNewPasswordMatch.value = '';

   } else {
      alert('Passwords do not match.');
      inputCurrentPassword.value = '';
      inputNewPassword.value = '';
      inputNewPasswordMatch.value = '';
   }
});