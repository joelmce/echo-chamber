const newE = (tag) => document.createElement(tag);

function renderRoomsSidebar() {
  const pageContainer = document.getElementById('page-container');

  const navbarContainer = newE('div');
  navbarContainer.className = 'navbar-container';

  const navbar = newE('section');
  navbar.id = 'navbar';

  const roomsList = newE('ul');
  roomsList.id = 'room-list';

  const room1 = newE('li');
  room1.textContent = 'room 1';
  const room2 = newE('li');
  room2.textContent = 'room 2';
  room1.className = 'room-name';
  room2.className = 'room-name';

  roomsList.append(room1, room2);

  const userStatus = newE('div');
  userStatus.id = 'user-status';

  navbar.append(roomsList, userStatus);
  navbarContainer.appendChild(navbar);

  pageContainer.appendChild(navbarContainer);
}

export default renderRoomsSidebar;
