const express = require('express');
const {
  getSongsByRoomId,
  createSong,
  addLike,
  removeLike,
  getYouTubeData,
} = require('../controllers/songsController.js');

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get('/:roomId', getSongsByRoomId);
router.post('/', createSong);
router.patch('/like/:songId', addLike);
router.patch('/unlike/:songId', removeLike);
router.get('/youtube-api/:id', getYouTubeData);

module.exports = router;
