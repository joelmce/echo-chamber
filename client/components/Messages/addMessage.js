import { POST } from '../../helpers/http.js';
import { socket } from '../../helpers/socket.js';

function addMessage(message) {
  socket.emit('new message', message);
  POST('/api/message', message);
}

export { addMessage };
