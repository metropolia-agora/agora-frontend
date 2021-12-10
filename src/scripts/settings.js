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
const successNotification = document.getElementById('success');


// LOGOUT
document.getElementById('logout').addEventListener('click', () => {
   authentication.signout();
});

// CHANGE USERNAME
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

// DELETE USER
formDeleteUser.addEventListener('submit', async (event) => {
   event.preventDefault();

   // Get input field value
   const password = inputDeleteUser.value;

   // Show a confirmation message asking if user is sure they want to delete their account
   // If user is sure, make an api call
   // If user is not sure, clear the input field
   if (confirm('Are you sure you want to Delete?\nThis action cannot be reversed.') === true){
      const response = await api.delete(`/api/users/${user.id}`, { password });
      console.log('response: ', response);

      // If password is incorrect, show an error
      // If all is good, show a notification and relocate user back to home
      if (!response.ok) {
         alert(response.message);
      } else {
         alert('Account deleted.')
         window.location.assign('/');
      }
   } else {
      inputDeleteUser.value = '';
   }
});
