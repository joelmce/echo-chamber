import { isValidURL } from '/helpers/isValidURL.js';
import { parseYouTubeURL } from '../../helpers/parseYouTubeURL.js';

import { addSong } from './addSong.js';
import { getRoom } from '../Rooms/getRoom.js';
import { getUser } from '../Users/getUser.js';

async function handleNewSong(e) {
  e.preventDefault();
  const user = await getUser();
  if (!user) return;

  const form = e.target;
  const formData = new FormData(form);
  const songUrl = formData.get('song-url');

  const isEmpty = !songUrl;
  const isInvalidURL = !isValidURL(songUrl);
  if (isEmpty || isInvalidURL) return;

  const { urlId, songName } = await parseYouTubeURL(songUrl);
  const { roomId } = getRoom();

  addSong({
    roomId,
    songName,
    urlId,
  });

  form.reset();
}

export { handleNewSong };
