import { renderAllSongs } from '/components/Songs/Songs.js';

function renderRoom(room) {
  renderChat(room);
  renderAllSongs(room);
}

function renderChat(room) {}

export { renderRoom };
