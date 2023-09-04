import rooms from './roomList.js';
import { Room } from './chat/Room.js';
const newE = (tag) => document.createElement(tag);

function renderRoomsSidebar() {
  const roomsList = document.getElementById('room-list');

  rooms().then((response) => {
    response.forEach((room) => {
      const button = document.createElement('li');
      button.textContent = room.roomName;
      // button.dataset.id = room.roomId;
      button.className = 'room-name';
      roomsList.append(button);

      button.addEventListener(
        'click',
        () => new Room(room.roomId, room.roomName)
      );
    });
  });
}

export default renderRoomsSidebar;
