import html from '../../helpers/html.js';
import formField from './formField.js';
import renderLoggedInUser from './loggedInUser.js';

function renderLoginForm() {
  const userStatus = document.getElementById('user-status');
  userStatus.replaceChildren(loginForm());
}

function loginForm() {
  return html([
    html('h2', 'Login', { class: 'section-title' }),
    html('form', { class: 'form', onsubmit: handleLogin }, [
      formField('email', { required: true, maxLength: 80 }),
      formField('password', { required: true, maxLength: 50 }),
      html('button', { class: 'btn btn-light' }, 'Login'),
    ]),
  ]);
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch('http://localhost:3000/api/sessions', {
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
