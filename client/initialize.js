import renderChat from '/components/chatComponent.js';
import renderPlaylist from '/components/playlistComponent.js';
import renderRoomsSidebar from '/components/roomSideComponent.js';
import renderUserStatus from '/components/userStatus/renderUserStatus.js';
import { socket, listenForNewSong } from '../helpers/socket.js';
import { listenForPlaylistSubmit } from './components/renderRoom.js';

// renderChat();
// renderPlaylist(1);
renderRoomsSidebar();

renderUserStatus();

listenForNewSong();
listenForPlaylistSubmit();
