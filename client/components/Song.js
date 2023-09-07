import html from '/helpers/html.js';
import { parseYouTubeURL } from '/helpers/parseYouTubeURL.js';

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

function renderSong(song) {
  const playlistDisplay = document.getElementById('playlist-display');
  playlistDisplay.append(Song(song));
}

function handlePlay(id) {
  const iframe = document.querySelector('iframe');
  iframe.style.display = 'block';
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
}

function handleLike(e) {
  e.target.classList.toggle('liked');
  // TODO: update song likes in database
}

export { Song, renderSong };
