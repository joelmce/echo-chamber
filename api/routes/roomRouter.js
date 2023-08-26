const express = require('express');
const {
  getAllRooms,
  getRoomById,
  createRoom,
} = require('../controllers/roomsController.js');

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get('/', getAllRooms);
// router.get('/:id', getRoomById);
router.post('/new', createRoom);

module.exports = router;
