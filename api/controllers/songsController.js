const prisma = require('../database/prismaClient');

// This function is used to format the likedBy array to only include userIds instead of the entire user object
function formatLikedBy(song) {
  return {
    ...song,
    likedBy: song.likedBy.map((user) => user.userId),
  };
}

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
      likedBy: {
        select: {
          userId: true,
        },
      },
    },
  });

  const songWithUserIds = formatLikedBy(song);
  res.json(songWithUserIds);
}

async function getSongsByRoomId(req, res) {
  const { roomId } = req.params;

  const songs = await prisma.song.findMany({
    where: {
      roomId,
    },
    include: {
      likedBy: {
        select: {
          userId: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  songs.sort((a, b) => b.likedBy.length - a.likedBy.length);
  const songsWithUserIds = songs.map(formatLikedBy);
  res.json(songsWithUserIds);
}

async function addLike(req, res) {
  const { songId } = req.params;
  const { userId } = req.body;

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

async function removeLike(req, res) {
  const { songId } = req.params;
  const { userId } = req.body;

  const song = await prisma.song.update({
    where: {
      songId,
    },
    data: {
      likedBy: {
        disconnect: {
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
  addLike,
  removeLike,
  getYouTubeData,
};
