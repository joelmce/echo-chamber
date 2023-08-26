const express = require('express');
const {
  addMessage,
  getMessages,
} = require('../controllers/messagesController.js');

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.post('/', addMessage);
router.get('/:roomId', getMessages);

module.exports = router;
