const prisma = require('../database/prismaClient');

/**
 * GET /api/playlist/:id
 * Returns all the songs in the given playlist
 * @param {Number} req: playlist id
 * @param {Object} res: songs in playlist
 */
async function getSongsInPlaylist(req, res) {
  const { id } = req.params;

  const songs = await prisma.room.findMany({
    where: {
      roomId: id,
    },
    select: {
      songs: true,
    },
  });

  res.json(songs);
}

/**
 * POST /api/playlist/:id
 * Add a song to a playlist
 */
async function addSongToPlaylist(req, res) {
  const { songURL, roomId } = req.body;

  console.log('songURL', songURL);
  console.log('roomId', roomId);

  const addSong = await prisma.room.update({
    where: {
      roomId,
    },
    data: {
      push: {
        songURL,
        songLikes: 0,
      },
    },
  });

  res.json(addSong);
}

async function getYouTubeData(req, res) {
  const { id } = req.params;
  const apiKey = process.env.YOUTUBE_API_KEY;

  console.log('youtube id', id);

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
  getYouTubeData,
};
