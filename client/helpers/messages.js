import { GET, POST } from './http.js';
import getUser from './getUser.js';
import { socket } from './socket.js';

export function getMessagesInRoom(roomId) {
  return GET(`/api/message/${roomId}`);
}

export async function sendMessage(roomId, content) {
  const { userId, username } = await getUser();

  await POST('/api/message', {
    authorId: userId,
    roomId: roomId,
    content: content,
  })
    .then(() => {
      /* Tell the server there is a new message incoming */
      socket.emit('new message', content, username, roomId);
    })
    .catch((err) => console.error(err));
}
