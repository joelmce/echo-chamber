/**
 * Initialise a new chat instance for a specific room. Every time a user elects
 * to join a room, this class is responsible for handling all chat based
 * mechanics.
 */
class ChatManager {
  #url = 'http://localhost:3000/api/message/';

  constructor(roomId) {
    this.roomId = roomId;
  }

  sendMessage(content) {
    return fetch(this.#url + this.roomId);
  }

  deleteMessage() {}
}
