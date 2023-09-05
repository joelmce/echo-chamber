import html from '/helpers/html.js';
import { displayMessage } from './displayMessages.js';
import getUser from '/helpers/getUser.js';
import socket from '/helpers/socket.js';
import renderPlaylist from '../playlistComponent.js';

const url = 'http://localhost:3000/api/message/';

export class Room {
  static roomId;
  constructor(roomId, roomName) {
    Room.roomId = roomId;
    Room.roomName = roomName;
    this.joinRoom();
    socket.emit('join-room', roomId);
    renderPlaylist(roomId);
  }

  async joinRoom() {
    document.getElementById('chat-display').innerHTML = '';
    const messages = await this.getMessages();
    messages.forEach(({ messageContent, messageAuthor }) => {
      displayMessage(messageContent, messageAuthor.username);
    });
  }

  getMessages() {
    return fetch(url + Room.roomId).then((res) => res.json());
  }

  static async sendMessage(content) {
    const { userId, username } = await getUser();

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

    socket.emit('new message', content, username, Room.roomId);
  }
}
