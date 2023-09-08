import renderLoggedInUser from './loggedInUser.js';
import renderLoggedOutUser from './loggedOutUser.js';

// TODO: refactor userStatus

function renderUser() {
  fetch('/api/sessions')
    .then((res) => res.json())
    .then(({ success, data: user }) => {
      if (success) {
        renderLoggedInUser(user);
      } else {
        renderLoggedOutUser();
      }
    })
    .catch((err) => {
      renderLoggedOutUser();
      console.error(err);
    });
}

export { renderUser };
