import html from '/helpers/html.js';
import { getAllSongs } from './getAllSongs.js';
import { handlePlay } from './handlePlay.js';
import { handleNewSong } from './handleNewSong.js';
import { toggleLike } from './handleToggleLike.js';
import { getUser } from '../Users/getUser.js';

function renderSong(song) {
  const playlistDisplay = document.getElementById('playlist-display');
  const songElement = Song(song);
  playlistDisplay.append(songElement);
}

async function renderAllSongs(roomId) {
  const playlistDisplay = document.getElementById('playlist-display');
  const data = await getAllSongs(roomId);
  const { userId } = await getUser();
  const songs = data.map(Song.bind(null, userId));
  playlistDisplay.replaceChildren(...songs);
}

function Song(userId, song) {
  const isLiked = song.likedBy.includes(userId);
  const likesCount = song.likedBy.length;
  const likeClass = isLiked ? 'liked' : '';
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
        class: `like-btn ${likeClass}`,
        onclick: () => toggleLike(song, isLiked, userId),
      }),
    ]
  );
}

async function renderPlaylist(room) {
  const playlistSection = document.getElementById('playlist-section');
  const data = await getAllSongs(room.roomId);
  const { userId } = await getUser();
  const songs = data.map(Song.bind(null, userId));
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
