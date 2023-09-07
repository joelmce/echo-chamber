import { socket } from '/helpers/socket.js';
import { renderRoom } from '/components/renderRoom.js';

let room = {};

function joinRoom(roomId) {
  room.roomId = roomId;
  socket.emit('join-room', room.roomId);
  renderRoom(room);
}

function getRoom() {
  return room;
}

export { joinRoom, getRoom };
