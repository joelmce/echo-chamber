// RENDER CHAT-BOX UI
function renderChat() {
    const pageContainer = document.getElementById('page-container');
    const newE = tag => document.createElement(tag);

    const chatContainer = newE('div')
    chatContainer.className = 'chat-container';

    const chatWrapper = newE('div')
    chatWrapper.className = 'chat-wrapper';

    const chatInput = newE('div')
    chatInput.className = 'chat-input';

    const chatField = newE('input')
    chatField.setAttribute('type', 'text');
    chatField.className = 'chat-field';

    const enterBtn = newE('button')
    enterBtn.className = 'enter-btn';

    chatInput.appendChild(chatField);
    chatInput.appendChild(enterBtn);
    chatWrapper.appendChild(chatInput);
    chatContainer.appendChild(chatWrapper);
    pageContainer.appendChild(chatContainer);
}

export default renderChat;
