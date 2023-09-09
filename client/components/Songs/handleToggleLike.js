import { PATCH } from '../../helpers/http.js';
import { getUser } from '../Users/getUser.js';
import { socket } from '../../helpers/socket.js';

async function toggleLike(song) {
  const user = await getUser();
  if (!user) return;
  const { userId } = user;
  const { roomId, songId } = song;
  const isLiked = song.likedBy.includes(userId);
  const endpoint = isLiked ? 'unlike' : 'like';

  await PATCH(`/api/songs/${endpoint}/${songId}`, { userId });

  socket.emit('update songs', roomId);
}

export { toggleLike };
