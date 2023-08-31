import renderChat from './components/chatComponent.js';
import renderPlaylist from './components/playlistComponent.js';
import renderRoomsSidebar from "./components/roomSideComponent.js";

function renderPage(room) {
  const pageContainer = document.getElementById('page-container');
  pageContainer.innerHTML = '';

  const componentsWrapper = document.createElement('div');
  componentsWrapper.className = 'components-wrapper';

  const navbarContainer = document.createElement('div');
  navbarContainer.className = "navbar-component";
  renderRoomsSidebar();
  componentsWrapper.appendChild(navbarContainer);

  const chatContainer = document.createElement('div');
  chatContainer.className = 'chat-component';
  renderChat(room, chatContainer);
  componentsWrapper.appendChild(chatContainer);

  const playlistContainer = document.createElement('div');
  playlistContainer.className = 'playlist-component';
  renderPlaylist(room, playlistContainer);
  componentsWrapper.appendChild(playlistContainer);

  pageContainer.appendChild(componentsWrapper);
}

renderPage(1);
