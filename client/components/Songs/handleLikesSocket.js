// import { renderSong } from './render.js';
import { socket } from "/helpers/socket.js";

function handleLikesSocket() {
  socket.on("share like", (songData) => {
    // renderSong(song);
  });
}

export { handleLikesSocket };
