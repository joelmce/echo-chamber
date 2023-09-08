import { socket } from '/helpers/socket.js';
import { renderRoom } from '/components/renderRoom.js';
import { PATCH } from './http.js';
import getUser from './getUser.js';

let room = {};

async function joinRoom(roomId) {
  room.roomId = roomId;
  socket.emit('join-room', room.roomId);

  const user = await getUser();

  await PATCH('/api/room', {
    roomId: roomId,
    userId: user.userId,
  });

  renderRoom(room);
}

function getRoom() {
  return room;
}

export { joinRoom, getRoom };
