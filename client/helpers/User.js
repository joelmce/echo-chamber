class User {
  #url = 'http://localhost:3000/api/session';

  static async getUserId() {
    const data = fetch(this.#url);
    return data.userId;
  }

  static async getUsername() {
    const data = fetch(this.#url);
    return data.username;
  }

  static async logout() {
    //logout getUserId()
  }
}