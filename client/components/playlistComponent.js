import { socket } from '/helpers/socket.js';
import { Room } from './chat/Room.js';

/* Render playlist UI */
function renderPlaylist() {
  const playlistForm = document.getElementById('playlist-form');
  const playlistInput = document.getElementById('playlist-input');

  /* Handle socket message events from server, render song to queue */
  socket.on('share song', (song) => {
    addSongToQ(song);
  });

  /* send message to socket server on form submit */
  playlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const song = playlistInput.value.trim();
    console.log('form song URL', song);
    if (song.startsWith('https://www.youtube.com/watch')) {
      const url = '/api/playlist/' + Room.roomId;
      console.log(url);
      /* Save song to database */
      const messageData = {
        songURL: song,
      };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      }).then((response) => response.json());
    }

    if (song) {
      socket.emit('new song', song, Room.roomId);
      playlistInput.value = '';
    }
  });
}

/* render song to playlist queue */
export function addSongToQ(song) {
  const playlistDisplay = document.getElementById('playlist-display');
  const songContainer = document.createElement('div');
  songContainer.className = 'song-container';

  songContainer.addEventListener('click', function () {
    const iframe = document.querySelector('iframe');
    iframe.src = iframe.src =
      'https://www.youtube.com/embed/' + songObj.songId + '?autoplay=1';
  });

  const songP = document.createElement('p');
  songP.className = 'songQ';

  const songObj = {
    songId: '',
    songTitle: '',
  };

  if (song.startsWith('https://www.youtube.com/watch')) {
    songObj.songId = song.slice(-11);

    fetch('/api/playlist/youtube-api/' + songObj.songId)
      .then((res) => res.json())
      .then((data) => {
        songP.textContent = data.title.replace(/\[[^\]]*]/g, '').trim();
        songObj.songTitle = data.title.replace(/\[[^\]]*]/g, '').trim();
        const upVote = document.createElement('button');
        upVote.className = 'upvote';
        songContainer.append(songP);
        songContainer.append(upVote);
        playlistDisplay.appendChild(songContainer);

        return songObj;
      })
      .catch((error) => {
        console.error('error fetching youTube data', error);
      });
  }
}

export default renderPlaylist;
