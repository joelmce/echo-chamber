import html from '/helpers/html.js';
import { Song } from './Song.js';
import { getSongs } from '/helpers/getSongs.js';
import { getRoom } from '/helpers/rooms.js';
import { socket } from '/helpers/socket.js';

function renderRoom(room) {
  renderChat(room);
  renderPlaylist(room);
}

function renderChat(room) {}

function renderPlaylist(room) {
  renderSongs();
  listenForPlaylistSubmit();
}

async function renderSongs() {
  const playlistDisplay = document.getElementById('playlist-display');
  const songsData = await getSongs();
  const songs = await songsData.map(Song);
  playlistDisplay.replaceChildren(...songs);
}

function listenForPlaylistSubmit() {
  const playlistForm = document.getElementById('playlist-form');
  playlistForm.addEventListener('submit', handleNewSong);
}

function handleNewSong(e) {
  e.preventDefault();
  const playlistInput = document.getElementById('playlist-input');
  const songURL = playlistInput.value.trim();

  const isEmpty = !songURL;
  const isNotURL = !new URL(songURL);
  if (isEmpty || isNotURL) return;

  const { roomId } = getRoom();

  //1. send to socket
  socket.emit('new song', songURL, roomId);

  //2. send to db
  const songData = { songURL, roomId };

  fetch(`/api/playlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(songData),
  });

  playlistInput.value = '';
}

export { renderRoom };
