const prisma = require('../database/prismaClient');
const { generateHash } = require('../helpers/bcrypt');

/**
 * GET all active users
 */
async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
}

/**
 * Return the user by the given user id
 */
async function getUserById(req, res) {
  const userId = parseInt(req.params.id);
  const user = await prisma.user.findUnique({ where: { userId } });
  res.json(user);
}

/**
 * Create a user
 */
async function createUser(req, res) {
  const { username, email, password } = req.body;

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      hash: generateHash(password),
    },
  });
  res.json(newUser);
}

/**
 * Deletes the user from the database
 */
async function deleteUser(req, res) {
  const userId = parseInt(req.params.id);
  const deletedUser = await prisma.user.delete({ where: { userId } });
  res.json(deletedUser);
}

/**
 * Returns the user by their email
 * @param {*} email
 * @returns {Promise<Object>}
 */
async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

// TODO: updateUser

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUser,
};
