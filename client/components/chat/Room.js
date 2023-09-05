import html from '/helpers/html.js';
import { displayMessage } from './displayMessages.js';
import getUser from '/helpers/getUser.js';

const url = 'http://localhost:3000/api/message/';

export class Room {
  static roomId;
  constructor(roomId, roomName) {
    Room.roomId = roomId;
    Room.roomName = roomName;
    this.joinRoom();
  }

  async joinRoom() {
    console.log('Joined ' + Room.roomName);

    document.getElementById('chat-display').innerHTML = '';

    const messages = await this.getMessages();

    messages.forEach((message) => {
      displayMessage(message.messageContent, Room.roomName, 'Alex');
    });

    // const chatDisplay = document.getElementById('chat-display');
    // const h2 = html('h2', this.roomName);
    // chatDisplay.replaceChildren(h2);
  }

  getMessages() {
    return fetch(url + Room.roomId).then((res) => res.json());
  }

  static async sendMessage(content) {
    const { userId } = await getUser();

    const messageData = {
      authorId: userId,
      roomId: Room.roomId,
      content: content,
    };

    // Save message to database
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    }).then((response) => response.json());

    displayMessage(content, Room.roomName, 'Alex');
  }
}
