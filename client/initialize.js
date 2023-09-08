import { handleMessagesSocket } from './components/Messages/handleMessagesSocket.js';
import { renderNavbar } from './components/Navbar/render.js';
import {
  handleAllSongsSocket,
  handleSongSocket,
} from './components/Songs/handleSongsSocket.js';

renderNavbar();
handleSongSocket();
handleAllSongsSocket();
handleMessagesSocket();
