import { authentication } from './common/authentication';
import { renderTopMenu } from './common/renderTopMenu';

// Authentication check
const currentUser = await authentication.check();

// Render top menu (hamburger menu) content depending on user type
renderTopMenu(currentUser);
