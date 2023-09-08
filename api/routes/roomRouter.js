const express = require('express');
const {
  getAllRooms,
  getRoomById,
  createRoom,
} = require('../controllers/roomsController.js');

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', createRoom);

module.exports = router;
