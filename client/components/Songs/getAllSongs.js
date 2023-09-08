import { GET } from '../../helpers/http.js';

async function getAllSongs({ roomId }) {
  return GET(`/api/playlist/${roomId}`);
}

export { getAllSongs };
