import { isValidURL } from '/helpers/isValidURL.js';
import { parseYouTubeURL } from '/helpers/parseYouTubeURL.js';
import { getRoom } from '/helpers/rooms.js';
import { addSong } from './addSong.js';

function handleSongsForm() {
  const playlistForm = document.getElementById('playlist-form');
  playlistForm.addEventListener('submit', submitNewSong);
}

async function submitNewSong(e) {
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

export { handleSongsForm };
