import { displayMessage } from './displayMessages.js';
import { User } from '../../helpers/User.js';
import getUser from '../../helpers/getUser.js';
import socket from '/helpers/socket.js';
import renderPlaylist from '../playlistComponent.js';

const url = '/api/message/';

/**
 * A discussion that we had internall was there needed
 * to be a way to create an instance on the client side
 * from the database, and vice versa so we can handle
 * the information on the frontend. For example:
 *
 * When a user clicks on a room, this creates a new Room
 * instance which then allows the user to sendMessage()
 *
 */
export class Room {
  static roomId;

  constructor(roomId, roomName) {
    Room.roomId = roomId;
    Room.roomName = roomName;
    this.joinRoom();
    socket.emit('join-room', roomId);
    renderPlaylist(roomId);
  }

  /**
   * When a user joins the room, we want to display all
   * messages in that specific room
   */
  async joinRoom() {
    document.getElementById('chat-display').innerHTML = '';
    const messages = await this.getMessages();
    messages.forEach(({ messageContent, messageAuthor }) => {
      displayMessage(messageContent, messageAuthor.username);
    });
  }

  /**
   * Gets the messages from room
   * @returns {Promise<Object>}
   */
  getMessages() {
    return fetch(url + Room.roomId).then((res) => res.json());
  }

  /**
   * Send the message to the room user is currently
   * connected to
   * @param {String} content: the message the user
   * is trying to send
   */
  static async sendMessage(content) {
    const { userId, username } = await getUser();

    const messageData = {
      authorId: userId,
      roomId: Room.roomId,
      content: content,
    };

    console.log(messageData);

    /* Save message to database */
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    }).then((response) => response.json());

    /* Tell the server there is a new message incoming */
    socket.emit('new message', content, User.getUsername(), Room.roomId);
  }
}
