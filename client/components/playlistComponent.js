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

}

export default renderPlaylist;