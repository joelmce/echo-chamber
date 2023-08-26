// RENDER CHAT-BOX UI
function renderChat(room) {
    const pageContainer = document.getElementById('page-container');
    const newE = tag => document.createElement(tag);

    const chatContainer = newE('div')
    chatContainer.className = 'chat-container';

    const chatWrapper = newE('div')
    chatWrapper.className = 'chat-wrapper';

    const msgDisplay = newE('div')
    msgDisplay.className = 'msg-display';


    const chatForm = newE('form')
    chatForm.className = 'chat-input';

    const chatField = newE('input')
    chatField.setAttribute('type', 'text');
    chatField.className = 'chat-field';

    const enterBtn = newE('button')
    enterBtn.className = 'enter-btn';
    enterBtn.innerHTML = 'enter';

    chatForm.appendChild(chatField);
    chatForm.appendChild(enterBtn);

    chatWrapper.appendChild(msgDisplay);
    chatWrapper.appendChild(chatForm);

    chatContainer.appendChild(chatWrapper);
    pageContainer.appendChild(chatContainer);

    const socket = new WebSocket('ws://localhost:3000');

    socket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened');
    });

    socket.addEventListener('message', async (event) => {
        const messageData = JSON.parse(event.data);

        if (messageData.type === 'Buffer') {
            const bufferData = new Uint8Array(messageData.data);
            const text = new TextDecoder().decode(bufferData);
            console.log('Message from server:', text);
            displayMessage(text, room);
        }
    });

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = chatField.value;
        if (message.trim() !== '') {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(message);
                chatField.value = '';
            } else {
                console.log('WebSocket is not in OPEN state');
            }
        }
    });
}

function displayMessage(message, room) {
    console.log('Message in room:', room);
    const msgDisplay = document.querySelector('.msg-display');

    const messageP = document.createElement('p');
    messageP.className = 'message';
    messageP.textContent = `guest: ${message}`;

    msgDisplay.insertBefore(messageP, msgDisplay.firstChild);
    dbLogMessage(message, room);

    messageP.style.opacity = '0';
    messageP.offsetHeight;

    requestAnimationFrame(() => {
        messageP.style.opacity = '1';
    });
}

function dbLogMessage(message) {

}

export default renderChat;
