import { socket } from '/helpers/socket.js';

/* Get all the songs in room by room id */
async function getSongs(roomId) {
  return fetch(`/api/playlist/${roomId}`).then((res) => res.json());
}

function addSong(song) {
  // emit new song to socket
  socket.emit('new song', song);

  // add new song to DB
  fetch('/api/playlist/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(song),
  });
}

export { getSongs, addSong };
