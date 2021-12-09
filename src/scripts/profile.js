import { api } from './common/api';
import { authentication } from './common/authentication';

// Authentication check
const user = await authentication.check();

// Load the data of the user whose profile is being viewed
const id = new URL(window.location).searchParams.get('id');
const data = await api.get(`/api/users/${id}`);
if (!data.ok) {
  window.location.replace('/404');
} else {
  const viewing = data.user;
  const headerTitle = document.querySelector('header h1');
  headerTitle.textContent = viewing.username;
}
