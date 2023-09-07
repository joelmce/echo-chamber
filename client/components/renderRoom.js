import html from '/helpers/html.js';
import { Song } from './Song.js';
import { getSongs, addSong } from '../helpers/songs.js';
import { getRoom } from '../helpers/rooms.js';
import { socket } from '../helpers/socket.js';
import { parseYouTubeURL } from '../helpers/parseYouTubeURL.js';
import { isValidURL } from '../helpers/isValidURL.js';

function renderRoom(room) {
  renderChat(room);
  renderPlaylist(room);
}

function renderChat(room) {}

async function renderPlaylist(room) {
  const playlistDisplay = document.getElementById('playlist-display');
  const songsData = await getSongs(room.roomId);
  const songs = await songsData.map(Song);
  playlistDisplay.replaceChildren(...songs);
}

export function listenForPlaylistSubmit() {
  const playlistForm = document.getElementById('playlist-form');
  playlistForm.addEventListener('submit', handleNewSong);
}

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

export { renderRoom };
