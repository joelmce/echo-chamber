const prisma = require('../database/prismaClient');
const { generateHash } = require('../helpers/bcrypt');

async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
}

async function getUserById(req, res) {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      userId: Number(id),
    },
  });

  console.log(user);

  res.json(user);
}

async function createUser(req, res) {
  const { username, password } = req.body;

  const user = {
    username,
    hash: generateHash(password),
  };

  const newUser = await prisma.user.create({ data: user });

  res.json(newUser);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({
    where: {
      userId: Number(id),
    },
  });

  res.json(deletedUser);
}

// TODO: updateUser

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
