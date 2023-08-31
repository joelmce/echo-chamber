import html from '../../helpers/html.js';
import renderLoginForm from './loginForm.js';
import renderSignupForm from './signupForm.js';

function renderLoggedOutUser() {
  const userStatus = document.getElementById('user-status');
  userStatus.replaceChildren(loggedOutUser());
}

function loggedOutUser() {
  return html({ class: 'form-field' }, [
    html('button', 'Login', {
      class: 'btn btn-light',
      onclick: renderLoginForm,
    }),
    html('button', 'Sign up', {
      class: 'btn btn-light',
      onclick: renderSignupForm,
    }),
  ]);
}

export default renderLoggedOutUser;
