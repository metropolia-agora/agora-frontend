import { authentication } from './authentication';
import { ElementHelper } from './ElementHelper';

// Logging out for eventListener
const onPressLogout = () => (event) => {
    event.preventDefault();
    authentication.signout();
}

export const renderTopMenu = (user) => {
    // Pick top menu elements
    const hamburger = document.getElementById('menuButton');
    const ul = document.querySelector('.menubar');
    const liProfile = document.createElement('li');
    const liSettings = document.createElement('li');
    const liLogout = document.createElement('li');
    const liSignin = document.createElement('li');
    const liSignup = document.createElement('li');

    // Toggle hamburger menu on and off (hidden, not hidden) when button clicked.
    // When menu is shown, prevent scrolling.
    hamburger.addEventListener('click', (event) => {
        event.preventDefault();
        ul.classList.toggle('hidden');

        if (!ul.classList.contains('hidden')) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = '';
        }
    });

    // If user if logged in, show buttons for profile, settings and logout.
    // If not, show buttons for sign in and sign up.
    if (user) {
        ul.appendChild(liProfile);
        ul.appendChild(liSettings);
        ul.appendChild(liLogout);
        liProfile.appendChild(ElementHelper.create('a').setHref('/profile').setText('Profile').htmlElement);
        liSettings.appendChild(ElementHelper.create('a').setHref('/settings').setText('Settings').htmlElement);
        liLogout.appendChild(ElementHelper.create('button').setClass('button').setId('logout').setOnClick(onPressLogout()).htmlElement);

        const button = document.getElementById('logout');
        button.appendChild(ElementHelper.create('i').setClass('fas fa-sign-out-alt').htmlElement);
    } else {
        ul.appendChild(liSignin);
        ul.appendChild(liSignup);
        liSignin.appendChild(ElementHelper.create('a').setHref('/signin').setText('Sign in').htmlElement);
        liSignup.appendChild(ElementHelper.create('a').setHref('/signout').setText('Sign up').htmlElement);
    }
};
