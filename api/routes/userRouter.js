const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require('../controllers/usersController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);
// TODO: router.put('/:id', updateUser);

module.exports = router;
