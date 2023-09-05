import { Room } from './chat/Room.js';
import socket from '/helpers/socket.js';
import { displayMessage } from './chat/displayMessages.js';

// RENDER CHAT-BOX UI
function renderChat() {
  // boring html component rendering
  const chatForm = document.getElementById('chat-form');
  const msgDisplay = document.getElementById('chat-display');
  const chatInput = document.getElementById('chat-input');
  // initialize socket for chat

  // handle socket message events from server, render messages and store in database
  socket.on('share message', (message, authorName) => {
    displayMessage(message, authorName);
  });

  // send message to socket server on form submit
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value;
    Room.sendMessage(message);
    chatInput.value = '';
  });
}

export default renderChat;
