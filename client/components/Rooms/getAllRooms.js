import { GET } from '../../helpers/http.js';

function getAllRooms() {
  return GET('/api/room');
}

export { getAllRooms };
