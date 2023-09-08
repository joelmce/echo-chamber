import rooms from './roomList.js';
import { Room } from './chat/Room.js';
import { joinRoom } from '/helpers/rooms.js';

function renderRoomsSidebar() {
  const roomsList = document.getElementById('room-list');

  rooms().then((response) => {
    response.forEach((room) => {
      const button = document.createElement('li');
      button.textContent = room.roomName;
      button.className = 'room-name';
      roomsList.append(button);

      button.addEventListener('click', () => {
        const activeRoom = document.querySelector('.active-room');
        activeRoom?.classList.remove('active-room');
        button.classList.add('active-room');

        const chatTitle = document.getElementById('chat-title');

        const connectedUserCount = document.getElementById('connected-users');

        console.log(room);
        chatTitle.textContent = room.roomName;
        joinRoom(room.roomId);
      });
    });
  });
}

export default renderRoomsSidebar;
