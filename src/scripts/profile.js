import { api } from './common/api';
import { authentication } from './common/authentication';

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');

// Load the data of the user whose profile is being viewed
const id = new URL(window.location).searchParams.get('id');
const data = await api.get(`/api/users/${id}`);
if (!data.ok) {
  console.log('wrong user');
} else {
  const viewing = data.user;
  console.log('viewing the profile of', viewing.username);
}
