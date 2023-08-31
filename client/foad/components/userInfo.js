import html from '../../helpers/html.js';

function userInfo(username) {
  return html({ class: 'user-info' }, [
    html('img', {
      src: `https://i.pravatar.cc/100?u=${username}`,
      alt: username,
      class: 'user-avatar',
    }),
    html('p', username, { class: 'user-name' }),
  ]);
}

export default userInfo;
