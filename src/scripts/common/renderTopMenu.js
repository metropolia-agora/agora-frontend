import { authentication } from './authentication';
import { ElementHelper } from './ElementHelper';

// Logging out for eventListener
const onPressLogout = () => (event) => {
    event.preventDefault();
    authentication.signout();
}

export const renderTopMenu = (user) => {

    // Pick and create main top menu elements
    const navbar = document.getElementById('top-menu');
    const ul = ElementHelper.create('ul').setClass('menubar hidden').setParent(navbar);
    const liHome = ElementHelper.create('li').setParent(ul);
    ElementHelper.create('a').setHref('/').setText('Home').setParent(liHome);

    // Toggle hamburger menu on and off (hidden, not hidden) when button clicked.
    // When menu is shown, prevent scrolling.
    const onPressMenu = () => (event) => {
        event.preventDefault();
        ul.htmlElement.classList.remove('hidden');
        document.body.style.overflowY = 'hidden';

        // TODO: add close button to ul
    }

    // Create the last main top menu element (actual button and it's icon)
    const menuButton = ElementHelper.create('button').setId('menuButton').setOnClick(onPressMenu()).setParent(navbar);
    ElementHelper.create('i').setClass('fas fa-bars').setParent(menuButton);

    // If user if logged in, show buttons for profile, settings and logout.
    // If not, show buttons for sign in and sign up.
    if (user) {
        const liProfile = ElementHelper.create('li').setParent(ul);
        const liSettings = ElementHelper.create('li').setParent(ul);
        const liLogout = ElementHelper.create('li').setParent(ul);
        ElementHelper.create('a').setHref(`/profile?id=${user.id}`).setText('Profile').setParent(liProfile);
        ElementHelper.create('a').setHref('/settings').setText('Settings').setParent(liSettings);
        ElementHelper.create('button').setClass('button').setId('logout').setOnClick(onPressLogout()).setParent(liLogout);

        const button = document.getElementById('logout');
        ElementHelper.create('i').setClass('fas fa-sign-out-alt').setParent(button)
    } else {
        const liSignin = ElementHelper.create('li').setParent(ul);
        const liSignup = ElementHelper.create('li').setParent(ul);
        ElementHelper.create('a').setHref('/signin').setText('Sign in').setParent(liSignin);
        ElementHelper.create('a').setHref('/signout').setText('Sign out').setParent(liSignup);
    }
};
