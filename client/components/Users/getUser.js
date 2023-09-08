import { GET } from '../../helpers/http.js';

function getUser() {
  return GET('/api/sessions').then((res) => res.data);
}

export { getUser };
