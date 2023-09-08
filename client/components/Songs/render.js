import html from '/helpers/html.js';
import { getAllSongs } from './getAllSongs.js';
import { handlePlay } from './handlePlay.js';
import { handleLike } from './handleLike.js';
import { handleNewSong } from './handleNewSong.js';

function renderSong(song) {
  const playlistDisplay = document.getElementById('playlist-display');
  const songElement = Song(song);
  playlistDisplay.append(songElement);
}

async function renderAllSongs(roomId) {
  const playlistDisplay = document.getElementById('playlist-display');
  const data = await getAllSongs(roomId);
  const songs = data.map(Song);
  playlistDisplay.replaceChildren(...songs);
}

function Song(song) {
  const { songName, likedBy } = song;

  return html('div', { class: 'song', dataset: song }, [
    html('p', songName, { class: 'song-name' }),
    html('button', 'Play', {
      class: 'play-btn',
      onclick: handlePlay,
    }),
    html('button', `${likedBy.length} Like`, {
      class: 'like-btn',
      onclick: handleLike,
    }),
  ]);
}

async function renderPlaylist(room) {
  const playlistSection = document.getElementById('playlist-section');
  const data = await getAllSongs(room.roomId);
  const songs = data.map(Song);
  const playlist = Playlist(songs);
  playlistSection.replaceWith(playlist);
}

function Playlist(songs) {
  return html('section', { id: 'playlist-section' }, [
    html('iframe', { src: '', id: 'player', height: '335' }),
    html('div', { id: 'playlist-display' }, songs),
    html(
      'form',
      { id: 'playlist-form', class: 'form-inline', onsubmit: handleNewSong },
      [
        html('input', {
          name: 'song-url',
          id: 'playlist-input',
          type: 'url',
          class: 'input',
          placeholder: 'Add a YouTube URL',
        }),
        html('button', 'Add', { class: 'btn' }),
      ]
    ),
  ]);
}

export { renderPlaylist, renderSong, Song, renderAllSongs };
