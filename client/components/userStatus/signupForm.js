import html from '/helpers/html.js';
import formField from './formField.js';
import { handleLogin } from './loginForm.js';

function renderSignupForm() {
  const userStatus = document.getElementById('user-status');
  userStatus.replaceWith(signupForm());
}

function signupForm() {
  return html({ id: 'user-status' }, [
    html('h2', 'Sign up', { class: 'form-title' }),
    html('form', { class: 'form', onsubmit: handleSignup }, [
      formField('username', { required: true, maxLength: 80 }),
      formField('email', { required: true, maxLength: 80 }),
      formField('password', { required: true, maxLength: 50 }),
      html('button', { class: 'btn' }, 'Sign up'),
    ]),
  ]);
}

function handleSignup(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      handleLogin(e);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default renderSignupForm;
