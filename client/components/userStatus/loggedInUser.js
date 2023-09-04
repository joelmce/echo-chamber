// import html from '/helpers/html.js';
import renderLoggedOutUser from './loggedOutUser.js';

function renderLoggedInUser(user) {
  const { username } = user;
  const userStatus = document.getElementById('user-status');
  userStatus.replaceWith(loggedInUser(username));
}

function loggedInUser(username) {
  return html({ id: 'user-status' }, [
    html({ class: 'user' }, [
      html('img', {
        src: `https://i.pravatar.cc/100?u=${username}`,
        class: 'user-avatar',
      }),
      html('p', username, { class: 'user-name' }),
    ]),
    html('button', 'Log out', { class: 'btn', onclick: handleLogout }),
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
