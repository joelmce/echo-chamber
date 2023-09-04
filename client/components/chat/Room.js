import html from '/helpers/html.js';
import { displayMessage } from './displayMessages.js';

const url = 'http://localhost:3000/api/message/';

export class Room {
  static roomId;
  constructor(roomId, roomName) {
    Room.roomId = roomId;
    this.roomName = roomName;
    this.joinRoom();
  }

  async joinRoom() {
    console.log('Joined ' + this.roomName);

    const roomData = await fetch(url + Room.roomId).then((response) =>
      response.json()
    );

    const messages = await this.getMessages();

    messages.forEach((message) => {
      displayMessage(message.messageContent, this.roomName, 'Alex');
    });

    const chatDisplay = document.getElementById('chat-display');
    const h2 = html('h2', this.roomName);
    chatDisplay.replaceChildren(h2);
  }

  getMessages() {
    return fetch(url + Room.roomId).then((res) => res.json());
  }

  static async sendMessage(content) {
    // roomid, authorid, contentq
    console.log('Room id:' + Room.roomId);
    console.log(content);

    const messageData = {
      authorId: 'usr_78525ea9-f555-44c5-b719-d9a1ce5d9ea6',
      roomId: Room.roomId,
      content: content,
    };

    // Save message to database
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    }).then((response) => response.json());

    console.log(result);
    console.log(messageData);
  }
}
