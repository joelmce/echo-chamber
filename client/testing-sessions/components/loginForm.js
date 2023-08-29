import html from '../../helpers/html.js';
import formField from './formField.js';

function renderLoginForm(target = document.getElementById('page')) {
  target.replaceChildren(
    html('section', [
      html('h2', 'Login'),
      html('form', { class: 'list', onsubmit: handleLogin }, [
        formField('email', { required: true, maxLength: 80 }),
        formField('password', { required: true, maxLength: 50 }),
        html('button', { class: 'btn btn-primary' }, 'Login'),
      ]),
    ])
  );
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  axios
    .post('/api/sessions', data)
    .then((res) => {
      console.log('successful logged in');
    })
    .catch((err) => {
      console.error(err);
    });
}

export default renderLoginForm;
