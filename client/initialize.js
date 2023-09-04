import renderChat from './components/chatComponent.js';
import renderPlaylist from './components/playlistComponent.js';
import renderRoomsSidebar from './components/roomSideComponent.js';
import renderUserStatus from './components/userStatus/renderUserStatus.js';

renderChat('room_f5de2b61-71dc-4370-8cb6-802dd14544eb');
renderPlaylist(1);
renderRoomsSidebar();

renderUserStatus();
