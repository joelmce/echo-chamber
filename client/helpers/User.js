export class User {
  constructor(userId, username) {
    this.userId = userId;
    this.username = username;
  }

  static getUserId() {
    return this.userId;
  }

  static getUsername() {
    return this.username;
  }
}
