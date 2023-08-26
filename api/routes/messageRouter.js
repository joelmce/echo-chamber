const express = require('express');
const {
  addMessage,
  getMessages,
} = require('../controllers/messagesController.js');

const router = express.Router();

router.post('/', addMessage);
router.get('/:roomId', getMessages);

module.exports = router;
