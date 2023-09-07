import { renderSong } from '/components/Song.js';
const socket = io('http://localhost:3000');

function listenForNewSong() {
  socket.on('share song', (song) => {
    renderSong(song);
  });
}

export { socket, listenForNewSong };
