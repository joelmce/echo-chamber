import { PATCH } from '../../helpers/http.js';
import { getUser } from '../Users/getUser.js';
import { socket } from '../../helpers/socket.js';

async function handleLike(e) {
  const { userId } = await getUser();
  const { songId, roomId } = e.target.parentNode.dataset;

  PATCH('/api/songs/', { songId, userId });
  socket.emit('like song', roomId);
}

export { handleLike };
