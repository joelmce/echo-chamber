const express = require('express');
const {
  getSongsInPlaylist,
  addSongToPlaylist,
  newPlaylist,
} = require('../controllers/playlistController.js');

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get('/:playlistId', getSongsInPlaylist);
// router.post('/:playlistId', addSongToPlaylist);
router.post('/new', newPlaylist);

module.exports = router;
