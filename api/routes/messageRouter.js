const express = require('express');
const {
  addMessage,
  getMessages,
  deleteMessage,
} = require('../controllers/messagesController.js');

const router = express.Router();

router.post('/', addMessage);
router.get('/:roomId', getMessages);
router.delete('/', deleteMessage);

module.exports = router;
