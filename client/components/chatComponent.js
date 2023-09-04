import { Room } from './chat/Room.js';

// RENDER CHAT-BOX UI
function renderChat(room) {
  // boring html component rendering
  const chatForm = document.getElementById('chat-form');
  const msgDisplay = document.getElementById('chat-display');
  const chatInput = document.getElementById('chat-input');

  // load existing messages from database
  // const existingMsgs = loadMessages(room)
  //   .then((messages) => {
  //     msgDisplay.innerHTML = '';
  //     messages.forEach((message) => {
  //       displayMessage(message.messageContent, room);
  //     });
  //     console.log('fetched messages array:', messages);
  //   })
  //   .catch((error) => {
  //     console.error('error loading messages', error);
  //   });

  // initialize socket for chat
  const chatSocket = io('http://localhost:3000', {
    query: {
      roomType: 'chat',
    },
  });

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
      chatSocket.emit('message', message);
      chatInput.value = '';
    }
  });
}

// display messages client-side
// USER PARAMETER IS USED FOR USER-AVATAR RENDERING

// fetch existing messages from database as an array
// function loadMessages(room) {
//   const url = `http://localhost:3000/api/message/${room}`;

//   return fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('no response from db');
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.error('error fetching messages', error);
//       throw error;
//     });
// }

// send message from chat to database
// function sendMessage(message, room) {
//   const messageData = {
//     authorId: 1,
//     roomId: room,
//     content: message,
//   };

//   fetch('http://localhost:3000/api/message', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(messageData),
//   })
//     .then((response) => response.json())
//     .then((newMessage) => {
//       console.log('new message:', newMessage);
//     })
//     .catch((error) => {
//       console.error('error adding msg to db:', error);
//     });
// }

export default renderChat;
