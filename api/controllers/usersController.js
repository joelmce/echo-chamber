const prisma = require('../database/prismaClient');
const { generateHash } = require('../helpers/bcrypt');

async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
}

async function getUserById(req, res) {
  const userId = parseInt(req.params.id);
  const user = await prisma.user.findUnique({ where: { userId } });
  res.json(user);
}

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

async function deleteUser(req, res) {
  const userId = parseInt(req.params.id);
  const deletedUser = await prisma.user.delete({ where: { userId } });
  res.json(deletedUser);
}

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
