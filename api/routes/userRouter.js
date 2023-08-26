const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/usersController');

const router = express.Router();

/**
 * Query the database for all the registers users
 * @returns {Object} allUsers: A json object with the data
 */
router.get('/', getAllUsers);
router.get('/:id', getUserById);

module.exports = router;
