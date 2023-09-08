import { isValidURL } from '/helpers/isValidURL.js';
import { parseYouTubeURL } from '/helpers/parseYouTubeURL.js';

import { addSong } from './addSong.js';
import { getRoom } from '../Rooms/getRoom.js';

async function handleNewSong(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const songUrl = formData.get('song-url');

  const isEmpty = !songUrl;
  const isInvalidURL = !isValidURL(songUrl);
  if (isEmpty || isInvalidURL) return;

  const { songId, songName } = await parseYouTubeURL(songUrl);
  const { roomId } = getRoom();

  addSong({
    roomId,
    songId,
    songName,
    songUrl,
    songLikes: 0,
  });

  form.reset();
}

export { handleNewSong };
