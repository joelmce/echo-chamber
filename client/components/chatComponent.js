import { Room } from './chat/Room.js';
import chatSocket from '/helpers/chatSocket.js';
import { displayMessage } from './chat/displayMessages.js';

// RENDER CHAT-BOX UI
function renderChat(room) {
  // boring html component rendering
  const chatForm = document.getElementById('chat-form');
  const msgDisplay = document.getElementById('chat-display');
  const chatInput = document.getElementById('chat-input');
  // initialize socket for chat

  // handle socket message events from server, render messages and store in database
  chatSocket.on('share message', (message, authorName) => {
    console.log('share message arrived');
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
