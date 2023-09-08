import { GET } from '../../helpers/http.js';

function getAllMessages({ roomId }) {
  return GET(`/api/message/${roomId}`);
}

export { getAllMessages };
