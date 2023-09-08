import { getRoom } from '../Rooms/getRoom.js';
import { getUser } from '../Users/getUser.js';
import { addMessage } from './addMessage.js';

async function handleNewMessage(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const messageContent = formData.get('message-content');

  if (!messageContent) return;

  const { roomId } = getRoom();
  const { userId, username } = await getUser();

  addMessage({
    roomId,
    messageContent,
    messageAuthor: {
      userId,
      username,
    },
  });

  form.reset();
}

export { handleNewMessage };
