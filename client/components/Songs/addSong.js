import { socket } from '/helpers/socket.js';
import { POST } from '/helpers/http.js';

function addSong(song) {
  socket.emit('new song', song);
  POST('/api/playlist', song);
}

export { addSong };
