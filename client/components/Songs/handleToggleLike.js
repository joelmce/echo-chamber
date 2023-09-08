import { PATCH } from '../../helpers/http.js';
import { getUser } from '../Users/getUser.js';
import { socket } from '../../helpers/socket.js';

async function toggleLike(song, isLiked, userId) {
  const { roomId, songId } = song;
  const endpoint = isLiked ? 'unlike' : 'like';

  await PATCH(`/api/songs/${endpoint}/${songId}`, { userId });

  socket.emit('update songs', roomId);
}

export { toggleLike };
