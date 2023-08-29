// RENDER PLAYLIST UI
function renderPlaylist(room) {
  // boring html component rendering
  const pageContainer = document.getElementById('page-container');
  const newE = (tag) => document.createElement(tag);

  const playlistContainer = newE('div');
  playlistContainer.className = 'playlist-container';

  const playlistWrapper = newE('div');
  playlistWrapper.className = 'playlist-wrapper';

  const queDisplay = newE('div');
  queDisplay.className = 'que-display';

  const searchForm = newE('form');
  searchForm.className = 'search-form';

  const searchField = newE('input');
  searchField.setAttribute('type', 'text');
  searchField.className = 'search-field';

  const enterBtn = newE('button');
  enterBtn.className = 'enter-btn';
  enterBtn.innerHTML = 'queue';

  searchForm.appendChild(searchField);
  searchForm.appendChild(enterBtn);

  playlistWrapper.appendChild(queDisplay);
  playlistWrapper.appendChild(searchForm);

  playlistContainer.appendChild(playlistWrapper);
  pageContainer.appendChild(playlistContainer);

  // initialize socket for playlist
  const playlistSocket = io('http://localhost:3000', {
    query: {
      roomType: 'playlist',
    },
  });

  // handle socket message events from server, render song to que
  playlistSocket.on('message', (message) => {
    console.log('song from server:', message);
    addSongToQ(message);
  });

  // send message to socket server on form submit
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const song = searchField.value;
    if (song.trim() !== '') {
      playlistSocket.emit('message', song);
      searchField.value = '';
    }
  });
}

// render song to playlist que
function addSongToQ(song) {
  console.log('song incoming...:', song);
  const qDisplay = document.querySelector('.que-display');
  const songContainer = document.createElement('div');
  songContainer.className = 'song-container';

  const songP = document.createElement('p');
  songP.textContent = song;
  songP.className = 'songQ';

  const upVote = document.createElement('button');
  upVote.className = 'upvote';

  const downVote = document.createElement('button');
  downVote.className = 'downvote';

  songP.append(upVote, downVote);

  songContainer.append(songP);

  qDisplay.appendChild(songContainer);
}

export default renderPlaylist;
