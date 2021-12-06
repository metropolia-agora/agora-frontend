import { authentication } from './common/authentication.js';

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');
