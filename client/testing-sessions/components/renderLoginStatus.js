import html from '../../helpers/html.js';
import renderLoginForm from './loginForm.js';

function renderLoginStatus() {
  axios
    .get('http://localhost:3000/api/sessions')
    .then(({ data }) => {
      const username = data.data.username;

      if (username) {
        renderLoggedIn(username);
      } else {
        console.log('not logged in');
        renderLoggedOut();
      }
    })
    .catch((err) => {
      renderLoggedOut();
      console.error(err);
    });
}

function renderLoggedIn(username) {
  const userStatus = document.getElementById('user-status');

  const loginBtn = html([
    html('div', `logged in as ${username}`),
    html('button', 'Logout', { onclick: handleLogout }),
  ]);

  userStatus.replaceChildren(loginBtn);
}

function renderLoggedOut() {
  const userStatus = document.getElementById('user-status');

  const logoutBtn = html([
    html('button', 'Login', { onclick: () => renderLoginForm() }),
  ]);

  userStatus.replaceChildren(logoutBtn);
}

function handleLogout() {
  axios
    .delete('http://localhost:3000/api/sessions')
    .then((res) => {
      renderLoginStatus();
    })
    .catch((err) => {
      console.error(err);
    });
}

export default renderLoginStatus;
