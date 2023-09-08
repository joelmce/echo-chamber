const express = require('express');
const {
  getAllRooms,
  getRoomById,
  createRoom,
  userJoinRoom,
  getConnectUsers,
} = require('../controllers/roomsController.js');

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', createRoom);
router.patch('/', userJoinRoom);

module.exports = router;
