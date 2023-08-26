const prisma = require("../database/prismaClient");

async function getSongsInPlaylist(req, res) {
  const { playlistId } = req.params;

  const songs = await prisma.playlist.findMany({
    where: {
      playlistId: playlistId,
    },
    select: {
      songs: true,
    },
  });

  res.json(songs);
}

async function addSongToPlaylist(req, res) {
  const { songId, playlistId } = req.body;

  const addSong = await prisma.playlist.update({
    where: {
      playlistId: playlistId,
    },
    data: {
      songs: {
        push: songLink,
      },
    },
  });

  res.json(addSong);
}

module.exports = {
  getSongsInPlaylist,
  addSongToPlaylist,
};
