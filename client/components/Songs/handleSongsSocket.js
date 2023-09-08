import { startViewTransition } from '../../helpers/startViewTransition.js';
import { renderAllSongs, renderSong } from './render.js';
import { socket } from '/helpers/socket.js';

function handleSongSocket() {
  socket.on('share song', (song) => {
    renderSong(song);
  });
}
function handleAllSongsSocket() {
  socket.on('update songs', (roomId) => {
    startViewTransition(() => renderAllSongs(roomId));
  });
}

export { handleAllSongsSocket, handleSongSocket };
