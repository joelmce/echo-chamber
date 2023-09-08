import { handleMessagesSocket } from './components/Messages/handleMessagesSocket.js';
import { renderNavbar } from './components/Navbar/render.js';
import { handleSongsSocket } from './components/Songs/handleSongsSocket.js';

renderNavbar();
handleSongsSocket();
handleMessagesSocket();
