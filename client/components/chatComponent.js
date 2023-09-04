import { Room } from './chat/Room.js';
import chatSocket from '/helpers/chatSocket.js';

// RENDER CHAT-BOX UI
function renderChat(room) {
  // boring html component rendering
  const chatForm = document.getElementById('chat-form');
  const msgDisplay = document.getElementById('chat-display');
  const chatInput = document.getElementById('chat-input');
  // initialize socket for chat

  // client-side handling of new socket connection
  chatSocket.on('connect', () => {
    console.log('Socket.IO connection opened');
  });

  // handle socket message events from server, render messages and store in database
  chatSocket.on('message', (message) => {
    console.log('message from server:', message);
    // displayMessage(message, room);
    // sendMessage(message, room);
  });

  // send message to socket server on form submit
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value;
    Room.sendMessage(message);
    if (message.trim() !== '') {
      // chatSocket.emit('message', message);
      chatInput.value = '';
    }
  });
}

export default renderChat;
