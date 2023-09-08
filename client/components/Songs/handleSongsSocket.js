import { renderSong } from './Songs.js';
import { socket } from '/helpers/socket.js';

function handleSongsSocket() {
  socket.on('share song', (song) => {
    renderSong(song);
  });
}

export { handleSongsSocket };
