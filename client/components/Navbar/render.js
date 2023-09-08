import html from '../../helpers/html.js';

import { getAllRooms } from '../Rooms/getAllRooms.js';
import { joinRoom } from '../Rooms/getRoom.js';
import { renderUser } from '../Users/renderUserStatus.js';
import { highlightActiveRoom } from './highlightActiveRoom.js';

function renderNavbar() {
  renderAllNavLinks();
  renderUser();
}

async function renderAllNavLinks() {
  const nav = document.getElementById('rooms-list');
  const rooms = await getAllRooms();
  const navLinks = rooms.map(NavLink);
  nav.replaceChildren(...navLinks);
}

function NavLink(room) {
  return html('li', room.roomName, {
    className: 'room-name',
    onclick: (e) => {
      highlightActiveRoom(e);
      joinRoom(room);
    },
  });
}

export { renderNavbar };
