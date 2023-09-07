// import renderChat from '/components/chatComponent.js';
// import renderPlaylist from '/components/playlistComponent.js';
import renderRoomsSidebar from '/components/roomSideComponent.js';
import renderUserStatus from '/components/userStatus/renderUserStatus.js';
import { handleSongsForm } from '/components/Songs/handleSongsForm.js';
import { handleSongsSocket } from '/components/Songs/handleSongsSocket.js';

// renderChat();
// renderPlaylist(1);
renderRoomsSidebar();

renderUserStatus();

handleSongsForm();
handleSongsSocket();
