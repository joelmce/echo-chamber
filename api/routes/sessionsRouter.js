const express = require('express');
const router = express.Router();

const {
  isLoggedIn,
  login,
  logout,
} = require('../controllers/sessionsController.js');

router.get('/', isLoggedIn);
router.post('/', login);
router.delete('/', logout);

module.exports = router;
