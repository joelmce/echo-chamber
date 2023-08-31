const newE = (tag) => document.createElement(tag);

function renderRoomsSidebar() {
    const pageContainer = document.getElementById('page-container');

    const navbarContainer = newE('div');
    navbarContainer.className = "navbar-container";

    const navbar = newE('section');
    navbar.id = "navbar";

    const roomsList = newE('ul');
    roomsList.id = "room-list";

    const userStatus = newE('div');
    userStatus.id = "user-status";

    const userInfo = newE('div');
    userInfo.id = "user-info";

    const userAvatar = newE('img');
    userAvatar.className = "user-avatar";

    const username = newE('p');
    username.className = "user-name";

    userInfo.append(userAvatar, username);
    navbar.append(roomsList, userStatus, userInfo);
    navbarContainer.appendChild(navbar);

    pageContainer.appendChild(navbarContainer);
}

export default renderRoomsSidebar;
