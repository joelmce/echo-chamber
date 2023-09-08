import html from '/helpers/html.js';
import { getAllSongs } from './getAllSongs.js';
import { handlePlay } from './handlePlay.js';
import { handleLike } from './handleLike.js';

async function renderAllSongs(room) {
  const data = await getAllSongs(room.roomId);
  const songs = await data.map(Song);

  const playlistDisplay = document.getElementById('playlist-display');
  playlistDisplay.replaceChildren(...songs);

  const iframe = document.querySelector('iframe');
  iframe.src = '';
}

function renderSong(song) {
  const playlistDisplay = document.getElementById('playlist-display');
  const songElement = Song(song);
  playlistDisplay.append(songElement);
}

function Song(song) {
  const { songId, songName, songLikes } = song;
  return html('div', { class: 'song', dataset: song }, [
    html('p', songName, { class: 'song-name' }),
    html('button', 'Play', {
      class: 'play-btn',
      onclick: () => handlePlay(songId),
    }),
    html('button', `${songLikes} Like`, {
      class: 'like-btn',
      onclick: handleLike,
    }),
  ]);
}

export { renderAllSongs, renderSong, Song };
