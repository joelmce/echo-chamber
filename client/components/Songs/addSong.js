import { socket } from '/helpers/socket.js';
import { POST } from '/helpers/http.js';

async function addSong(song) {
  const newSong = await POST('/api/songs', song);
  socket.emit('new song', newSong);
}

export { addSong };
