import { renderMessage } from './render.js';
import { socket } from '../../helpers/socket.js';

function handleMessagesSocket() {
  socket.on('share message', (message) => {
    renderMessage(message);
  });
}

export { handleMessagesSocket };
