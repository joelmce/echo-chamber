// RENDER CHAT-BOX UI
function renderChat(room) {
  // boring html component rendering
  const pageContainer = document.getElementById('page-container');
  const newE = (tag) => document.createElement(tag);

  const chatContainer = newE('div');
  chatContainer.className = 'chat-container';

  const chatWrapper = newE('div');
  chatWrapper.className = 'chat-wrapper';

  const msgDisplay = newE('div');
  msgDisplay.className = 'msg-display';

  const chatForm = newE('form');
  chatForm.className = 'chat-input';

  const chatField = newE('input');
  chatField.setAttribute('type', 'text');
  chatField.className = 'chat-field';

  const enterBtn = newE('button');
  enterBtn.className = 'enter-btn';
  enterBtn.innerHTML = 'enter';

  chatForm.appendChild(chatField);
  chatForm.appendChild(enterBtn);

  chatWrapper.appendChild(msgDisplay);
  chatWrapper.appendChild(chatForm);

  chatContainer.appendChild(chatWrapper);
  pageContainer.appendChild(chatContainer);

  // load existing messages from database
  const existingMsgs = loadMessages(room)
    .then((messages) => {
      msgDisplay.innerHTML = '';
      messages.forEach((message) => {
        displayMessage(message.messageContent, room);
      });
      console.log('fetched messages array:', messages);
    })
    .catch((error) => {
      console.error('error loading messages', error);
    });

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
    displayMessage(message, room);
    sendMessage(message, room);
  });

  // send message to socket server on form submit
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatField.value;
    if (message.trim() !== '') {
      chatSocket.emit('message', message);
      chatField.value = '';
    }
  });
}

// display messages client-side
// USER PARAMETER IS USED FOR USER-AVATAR RENDERING
export function displayMessage(message, room, user) {
  console.log('Message in room:', room);
  const msgDisplay = document.querySelector('.msg-display');

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-container';

  const avatarImg = document.createElement('img');
  avatarImg.className = 'avatar';

  // AVATAR IMG PLACEHOLDER
  avatarImg.src =
    'https://dl.openseauserdata.com/cache/originImage/files/547152b481352a23d622d9ec71a568e3.png';
  // REPLACE WITH USERS AVATAR

  messageDiv.appendChild(avatarImg);

  const messageP = document.createElement('p');
  messageP.className = 'message';
  messageP.textContent = `user: ${message}`;

  messageDiv.appendChild(messageP);
  msgDisplay.insertBefore(messageDiv, msgDisplay.firstChild);

  messageP.style.opacity = '0';
  messageP.offsetHeight;

  requestAnimationFrame(() => {
    messageP.style.opacity = '1';
  });
}

// fetch existing messages from database as an array
function loadMessages(room) {
  const url = `http://localhost:3000/api/message/${room}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('no response from db');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('error fetching messages', error);
      throw error;
    });
}

// send message from chat to database
function sendMessage(message, room) {
  const messageData = {
    authorId: 1,
    roomId: room,
    content: message,
  };

  fetch('http://localhost:3000/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  })
    .then((response) => response.json())
    .then((newMessage) => {
      console.log('new message:', newMessage);
    })
    .catch((error) => {
      console.error('error adding msg to db:', error);
    });
}

export default renderChat;
