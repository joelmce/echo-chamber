import html from '/helpers/html.js';
import formField from './formField.js';
import renderLoggedInUser from './loggedInUser.js';

function renderLoginForm() {
  const userStatus = document.getElementById('user-status');
  userStatus.replaceWith(loginForm());
}

function loginForm() {
  return html({ id: 'user-status' }, [
    html('h2', 'Login', { class: 'form-title' }),
    html('form', { class: 'form', onsubmit: handleLogin }, [
      formField('email', { required: true, maxLength: 80 }),
      formField('password', { required: true, maxLength: 50 }),
      html('button', { class: 'btn' }, 'Login'),
    ]),
  ]);
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ success, data }) => {
      if (success) {
        renderLoggedInUser(data);
      } else {
        console.error(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export default renderLoginForm;
export { handleLogin };
