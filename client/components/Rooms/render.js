import { renderPlaylist } from '../Songs/render.js';
import { renderChat } from '../Messages/render.js';

function renderRoom(room) {
  renderChat(room);
  renderPlaylist(room);
}

export { renderRoom };
