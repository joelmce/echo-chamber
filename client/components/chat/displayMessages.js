function displayMessage(message, room, user) {
  console.log('Message in room:', room);
  const msgDisplay = document.getElementById('chat-display');

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-container';

  const avatarImg = document.createElement('img');
  avatarImg.className = 'user-avatar';

  // AVATAR IMG PLACEHOLDER
  avatarImg.src =
    'https://dl.openseauserdata.com/cache/originImage/files/547152b481352a23d622d9ec71a568e3.png';
  // REPLACE WITH USERS AVATAR

  messageDiv.appendChild(avatarImg);

  const messageP = document.createElement('p');
  messageP.className = 'message';
  messageP.textContent = `${user}: ${message}`;

  messageDiv.appendChild(messageP);
  msgDisplay.insertBefore(messageDiv, msgDisplay.firstChild);

  messageP.style.opacity = '0';
  messageP.offsetHeight;

  requestAnimationFrame(() => {
    messageP.style.opacity = '1';
  });
}

export default displayMessage;
