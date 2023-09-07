import html from '/helpers/html.js';
import { parseYouTubeURL } from '/helpers/parseYouTubeURL.js';

async function Song(songURL) {
  const { id, name } = await parseYouTubeURL(songURL);

  return html('div', { class: 'song' }, [
    html('p', name, { class: 'song-name' }),
    html('button', 'Play', {
      class: 'song-play',
      onclick: () => handlePlay(id),
    }),
    html('button', 'Like', { class: 'song-like', onclick: handleUpvote }),
  ]);
}

async function renderSong(song) {
  const playlistDisplay = document.getElementById('playlist-display');
  const songElement = await Song(song);
  playlistDisplay.append(songElement);
}

function handlePlay(id) {
  const iframe = document.querySelector('iframe');
  iframe.style.display = 'block';
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
}

function handleUpvote() {}

export { Song, renderSong };
