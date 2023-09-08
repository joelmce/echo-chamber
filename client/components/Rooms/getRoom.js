import { socket } from '../../helpers/socket.js';
import { renderRoom } from './render.js';

let room = {};

function getRoom() {
  return room;
}

function joinRoom(newRoom) {
  Object.assign(room, newRoom);
  socket.emit('join room', room);
  renderRoom(room);
}

export { getRoom, joinRoom };
