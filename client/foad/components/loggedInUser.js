import html from '../../helpers/html.js';
import renderLoggedOutUser from './loggedOutUser.js';
import userInfo from './userInfo.js';

function renderLoggedInUser(user) {
  const { username } = user;
  const userStatus = document.getElementById('user-status');
  userStatus.replaceChildren(loggedInUser(username));
}

function loggedInUser(username) {
  return html([
    userInfo(username),
    html('button', 'Log out', {
      class: 'btn btn-light',
      onclick: handleLogout,
    }),
  ]);
}

function handleLogout() {
  fetch('http://localhost:3000/api/sessions', {
    method: 'DELETE',
  })
    .then(renderLoggedOutUser)
    .catch((err) => console.error(err));
}

export default renderLoggedInUser;
