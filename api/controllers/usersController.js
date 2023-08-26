const prisma = require('../database/prismaClient');

async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
}

async function getUserById(req, res) {
  const { id } = req.params;

  const user = prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.json(user);
}

module.exports = {
  getAllUsers,
  getUserById,
};
