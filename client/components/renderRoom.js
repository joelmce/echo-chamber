import { renderAllSongs } from '/components/Songs/Songs.js';
import { socket } from '/helpers/socket.js';
import { displayMessage } from './chat/displayMessages.js';
import { getMessagesInRoom, sendMessage } from '../helpers/messages.js';

function renderRoom(room) {
  renderChat(room);
  renderAllSongs(room);
}

async function renderChat(room) {
  /* Boring html component rendering */
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const messages = await getMessagesInRoom(room.roomId);

  messages.forEach(({ messageContent, messageAuthor }) => {
    displayMessage(messageContent, messageAuthor.username);
  });

  /* handle socket message events from server, render messages and store in database */
  socket.on('share message', (message, authorName) => {
    displayMessage(message, authorName);
  });

  /* send message to socket server on form submit */
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = chatInput.value;
    sendMessage(room.roomId, message);
    chatInput.value = '';
  });
}

export { renderRoom };
