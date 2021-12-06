import { authentication } from './common/authentication';

// Authentication check
const user = await authentication.check();
console.log('Signed in as', user || 'anon');
