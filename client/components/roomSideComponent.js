import rooms from './roomList.js';
const newE = (tag) => document.createElement(tag);

function renderRoomsSidebar() {
  const roomsList = document.getElementById('room-list');

  rooms().then((response) => {
    response.forEach((room) => {
      const button = document.createElement('li');
      button.textContent = room.roomName;
      button.id = room.roomId;
      button.className = 'room-name';
      roomsList.append(button);
      console.log(button);
    });
  });
}

export default renderRoomsSidebar;
