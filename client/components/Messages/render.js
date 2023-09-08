import { getAllMessages } from './getAllMessages.js';
import { handleNewMessage } from './handleMessagesForm.js';
import html from '/helpers/html.js';

const AVATAR =
  'https://dl.openseauserdata.com/cache/originImage/files/547152b481352a23d622d9ec71a568e3.png';

function Message({ messageContent, messageAuthor: { username } }) {
  return html('div', { class: 'message-container' }, [
    html('img', { class: 'user-avatar', src: AVATAR }),
    html('p', `${username} - ${messageContent}`, { class: 'message' }),
  ]);
}

function renderMessage(message) {
  const chatDisplay = document.getElementById('chat-display');
  const chatMessage = Message(message);
  chatDisplay.append(chatMessage);
  chatMessage.scrollIntoView({ behavior: 'smooth' });
}

function Chat(room, messages) {
  return html('section', { id: 'chat-section' }, [
    html('h2', room.roomName, { id: 'chat-title' }),
    html('div', { id: 'chat-display' }, messages),
    html(
      'form',
      { id: 'chat-form', class: 'form-inline', onsubmit: handleNewMessage },
      [
        html('input', {
          name: 'message-content',
          id: 'chat-input',
          type: 'text',
          class: 'input',
          placeholder: 'Send a message',
        }),
        html('button', 'Send', { class: 'btn' }),
      ]
    ),
  ]);
}

async function renderChat(room) {
  const chatSection = document.getElementById('chat-section');
  const data = await getAllMessages(room);
  const messages = data.map(Message);
  const chat = Chat(room, messages);
  chatSection.replaceWith(chat);
}

export { renderMessage, renderChat };
