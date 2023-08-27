// RENDER PLAYLIST UI
function renderPlaylist(room) {
    const pageContainer = document.getElementById('page-container');
    const newE = tag => document.createElement(tag);

    const playlistContainer = newE('div')
    playlistContainer.className = 'playlist-container';

    const playlistWrapper = newE('div')
    playlistWrapper.className = 'playlist-wrapper';

    const queDisplay = newE('div')
    queDisplay.className = 'que-display';

    const searchForm = newE('form')
    searchForm.className = 'search-form';

    const searchField = newE('input')
    searchField.setAttribute('type', 'text');
    searchField.className = 'search-field';

    const enterBtn = newE('button')
    enterBtn.className = 'enter-btn';
    enterBtn.innerHTML = 'queue song';

    searchForm.appendChild(searchField);
    searchForm.appendChild(enterBtn);

    playlistWrapper.appendChild(queDisplay);
    playlistWrapper.appendChild(searchForm);

    playlistContainer.appendChild(playlistWrapper);
    pageContainer.appendChild(playlistContainer);

    const playlistSocket = new WebSocket('ws://localhost:3000/playlist');

    playlistSocket.addEventListener('message', async (event) => {
        const messageData = JSON.parse(event.data);

        if (messageData.type === 'Buffer') {
            const bufferData = new Uint8Array(messageData.data);
            const text = new TextDecoder().decode(bufferData);
            const jsonObject = JSON.parse(text);
            console.log('song from server:', jsonObject.message);
            addSongToQ(jsonObject.message);
        }
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const song = searchField.value;
        if (song.trim() !== '') {
            if (playlistSocket.readyState === WebSocket.OPEN) {
                const message = { type: 'playlist', message: song };
                playlistSocket.send(JSON.stringify(message));
                searchField.value = '';
            } else {
                console.log('WebSocket is not in OPEN state');
            }
        }
    });
}

function addSongToQ(song) {
    console.log("song incoming...:", song);
    const qDisplay = document.querySelector('.que-display');
    const songP = document.createElement('p');
    songP.textContent = song;
    songP.className = 'songQ';

    qDisplay.insertBefore(songP, qDisplay.firstChild);
}

export default renderPlaylist;
