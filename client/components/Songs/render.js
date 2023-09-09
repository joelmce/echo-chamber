import html from '/helpers/html.js';
import { getAllSongs } from './getAllSongs.js';
import { handlePlay } from './handlePlay.js';
import { handleNewSong } from './handleNewSong.js';
import { toggleLike } from './handleToggleLike.js';
import { getUser } from '../Users/getUser.js';

async function renderSong(song) {
  const playlistDisplay = document.getElementById('playlist-display');
  const songElement = Song(song);
  playlistDisplay.append(songElement);
  updateLikes();
}

async function renderAllSongs(roomId) {
  const playlistDisplay = document.getElementById('playlist-display');
  const data = await getAllSongs(roomId);
  const songs = data.map(Song);
  playlistDisplay.replaceChildren(...songs);
  updateLikes();
}

async function updateLikes() {
  const user = await getUser();
  if (!user) return;

  const songs = document.querySelectorAll('.song');
  [...songs].forEach((song) => {
    const songId = song.dataset.songId;
    const likedBy = song.dataset.likedBy;
    const isLiked = likedBy.split(',').includes(user.userId);
    song.classList.toggle('liked', isLiked);
  });
}

function Song(song) {
  const likesCount = song.likedBy.length;
  const likeText = likesCount === 1 ? 'Like' : 'Likes';

  return html(
    'div',
    {
      class: 'song',
      dataset: song,
      style: { viewTransitionName: song.songId },
    },
    [
      html('p', song.songName, { class: 'song-name' }),
      html('button', 'Play', {
        class: 'play-btn',
        onclick: handlePlay,
      }),
      html('button', `${likesCount} ${likeText}`, {
        class: 'like-btn',
        onclick: () => toggleLike(song),
      }),
    ]
  );
}

async function renderPlaylist(room) {
  const playlistSection = document.getElementById('playlist-section');
  const data = await getAllSongs(room.roomId);
  const songs = data.map(Song);
  const playlist = Playlist(songs);
  playlistSection.replaceWith(playlist);
  updateLikes();
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
        html('button', 'Add', { class: 'btn-dark' }),
      ]
    ),
  ]);
}

export { renderPlaylist, renderSong, Song, renderAllSongs };
