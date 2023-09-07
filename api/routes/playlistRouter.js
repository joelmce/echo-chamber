const express = require('express');
const {
  getYouTubeData,
  getSongsInPlaylist,
  addSongToPlaylist,
} = require('../controllers/playlistController.js');

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get('/:id', getSongsInPlaylist);
router.post('/', addSongToPlaylist);
router.get('/youtube-api/:id', getYouTubeData);

module.exports = router;
