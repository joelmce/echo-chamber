const prisma = require('../database/prismaClient');

async function newPlaylist(req, res) {
    const {playlistName, roomId} = req.body;

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
    const {playlistId} = req.params;

    const songs = await prisma.playlist.findMany({
        where: {
            playlistId: Number(playlistId),
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
    const {id} = req.params;
    const {songLink, songName} = req.body;

    const addSong = await prisma.playlist.update({
        where: {
            playlistId: Number(id),
        },
        data: {
            songs: {
                push: {
                    songName: songName,
                    songLink: songLink,
                },
            },
        },
    });

    res.json(addSong);
}

async function getYouTubeData(req, res) {
    const {videoId} = req.params;
    const apiKey = process.env.YOUTUBE_API_KEY;

    const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    );
    const data = await response.json();
    const title = data.items[0].snippet.title;

    res.json({title: title});
}

module.exports = {
    getSongsInPlaylist,
    addSongToPlaylist,
    newPlaylist,
    getYouTubeData,
};
