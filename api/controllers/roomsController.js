const prisma = require("../database/prismaClient");

async function getAllRooms(req, res) {
  const allRooms = prisma.room.findMany();
  res.json(allRooms);
}

async function getRoomById(req, res) {
  const { roomId } = req.params;
  const room = prisma.room.findUnique({
    where: {
      id: Number(roomId),
    },
  });

  res.json(room);
}

module.exports = {
  getAllRooms,
  getRoomById,
};
