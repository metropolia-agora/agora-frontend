import { api } from './common/api';
import { authentication } from './common/authentication';

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');

// Load the data of the post that is being viewed
const id = new URL(window.location).searchParams.get('id');
const data = await api.get(`/api/posts/${id}`);
if (!data.ok) {
  console.log('wrong post');
} else {
  const { post, comments } = data;
  console.log('viewing post', post, comments);
}
