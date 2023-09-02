// RENDER PLAYLIST UI

function renderPlaylist(room) {
    const playlistForm = document.getElementById('playlist-form');
    const playlistInput = document.getElementById('playlist-input');

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
    playlistForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(playlistInput.value);
        const song = playlistInput.value;
        if (song.trim() !== '') {
            playlistSocket.emit('message', song);
            playlistInput.value = '';
        }
    });
}

// render song to playlist que
function addSongToQ(song) {
    console.log('song incoming...:', song);
    const playlistDisplay = document.getElementById('playlist-display');
    const songContainer = document.createElement('div');
    songContainer.className = 'song-container';

    const songP = document.createElement('p');
    songP.className = 'songQ';

    const songObj = {
        songId: '',
        songTitle: '',
    }

    if (song.startsWith('https://www.youtube.com/watch')) {
        songObj.songId = song.slice(-11);

        fetch('/api/playlist/youtube-api/' + songObj.songId)
            .then((res) => res.json())
            .then((data) => {
                songP.textContent = data.title.replace(/\[[^\]]*]/g, '').trim();
                songObj.songTitle = data.title.replace(/\[[^\]]*]/g, '').trim();
                const upVote = document.createElement('button');
                upVote.className = 'upvote';
                songP.append(upVote);
                songContainer.append(songP);
                playlistDisplay.appendChild(songContainer);
                console.log(songObj);
                return songObj;
            })
            .catch((error) => {
                console.error('error fetching youTube data', error);
            });

        const iframe = document.querySelector('iframe');
        iframe.src = "https://www.youtube.com/embed/" + songObj.songId + "?autoplay=1";
    }
}

export default renderPlaylist;
