import { GET } from '../../helpers/http.js';

async function getAllSongs(roomId) {
  return GET(`/api/songs/${roomId}`);
}

export { getAllSongs };
