const prisma = require('../database/prismaClient');

async function createSong(req, res) {
  const { roomId, songName, urlId } = req.body;

  const song = await prisma.song.create({
    data: {
      songName,
      urlId,
      room: {
        connect: {
          roomId,
        },
      },
    },
    include: {
      likedBy: true,
    },
  });

  res.json(song);
}

async function getSongsByRoomId(req, res) {
  const { roomId } = req.params;

  const songs = await prisma.song.findMany({
    where: {
      roomId,
    },
    include: {
      likedBy: true,
    },
  });

  res.json(songs);
}

async function updateSongLikes(req, res) {
  const { songId, userId } = req.body;

  const song = await prisma.song.update({
    where: {
      songId,
    },
    data: {
      likedBy: {
        connect: {
          userId,
        },
      },
    },
  });

  res.json(song);
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
  getSongsByRoomId,
  createSong,
  updateSongLikes,
  getYouTubeData,
};
