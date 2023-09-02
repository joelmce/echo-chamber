import html from '/helpers/html.js';
import renderLoginForm from './loginForm.js';
import renderSignupForm from './signupForm.js';

function renderLoggedOutUser() {
  const userStatus = document.getElementById('user-status');
  userStatus.replaceChildren(loggedOutUser());
}

function loggedOutUser() {
  return html({ class: 'form-field' }, [
    html('button', 'Login', { class: 'btn', onclick: renderLoginForm }),
    html('button', 'Sign up', { class: 'btn', onclick: renderSignupForm }),
  ]);
}

export default renderLoggedOutUser;
