// RENDER CHAT-BOX UI
function renderChat() {
    const pageContainer = document.getElementById('page-container');
    const newE = tag => document.createElement(tag);

    const chatContainer = newE('div')
    chatContainer.className = 'chat-container';

    const chatWrapper = newE('div')
    chatWrapper.className = 'chat-wrapper';

    const msgDisplay = newE('div')
    msgDisplay.className = 'msg-display';


    const chatInput = newE('div')
    chatInput.className = 'chat-input';

    const chatField = newE('input')
    chatField.setAttribute('type', 'text');
    chatField.className = 'chat-field';

    const enterBtn = newE('button')
    enterBtn.className = 'enter-btn';
    enterBtn.innerHTML = 'enter';

    chatWrapper.appendChild(msgDisplay);
    chatInput.appendChild(chatField);
    chatInput.appendChild(enterBtn);
    chatWrapper.appendChild(chatInput);
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
            displayMessage(text);
        }
    });

    enterBtn.addEventListener('click', () => {
        const message = chatField.value;
        if (message.trim() !== '') {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(message);
                console.log(message);
                chatField.value = '';
            } else {
                console.log('WebSocket is not in OPEN state');
            }
        }
    });
}

function displayMessage(message) {
    const msgDisplay = document.querySelector('.msg-display');

    const messageP = document.createElement('p');
    messageP.className = 'message';
    messageP.textContent = message;

    msgDisplay.append(messageP);
}

export default renderChat;
