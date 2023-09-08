const prisma = require('../database/prismaClient');


/**
 * POST a new playlist to the room
 */
async function newPlaylist(req, res) {
  const { playlistName, roomId } = req.body;

  const playlist = await prisma.playlist.create({
    data: {
      playlistName: playlistName,
      room: {
        connect: {
          roomId: roomId,
        },
      },
    },
  });

  res.json(playlist);
}

/**
 * GET /api/playlist/:id
 * Returns all the songs in the given playlist
 * @param {Number} req: playlist id
 * @param {Object} res: songs in playlist
 */
async function getSongsInPlaylist(req, res) {
  const { roomId } = req.params;

  const room = await prisma.room.findUnique({
    where: {
      roomId,
    },
  });

  res.json(room.songs);
}

/**
 * POST /api/playlist/:id
 * Add a song to a playlist
 */
async function addSongToPlaylist(req, res) {
  const song = req.body;

  const room = await prisma.room.update({
    where: {
      roomId: song.roomId,
    },
    data: {
      songs: {
        push: song,
      },
    },
  });

  res.json(room.songs);
}

async function getYouTubeData(req, res) {
  const { id } = req.params;
  const apiKey = process.env.YOUTUBE_API_KEY;

  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=snippet`

  );
  const data = await response.json();
  const title = data.items[0].snippet.title;

  res.json({ title: title });
}

module.exports = {
  getSongsInPlaylist,
  addSongToPlaylist,
  newPlaylist,
  getYouTubeData,
};
