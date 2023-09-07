import { Room } from './chat/Room.js';
import socket from '/helpers/socket.js';
import { displayMessage } from './chat/displayMessages.js';

/* Render chat box UI */
function renderChat() {
  /* Boring html component rendering */
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  /* handle socket message events from server, render messages and store in database */
  socket.on('share message', (message, authorName) => {
    displayMessage(message, authorName);
  });

  /* send message to socket server on form submit */
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = chatInput.value;
    Room.sendMessage(message);
    chatInput.value = '';
  });
}

export default renderChat;
