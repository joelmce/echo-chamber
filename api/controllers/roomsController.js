const prisma = require('../database/prismaClient');

async function getAllRooms(req, res) {
  const allRooms = await prisma.room.findMany();
  res.json(allRooms);
}

async function createRoom(req, res) {
  const { roomName } = req.body;

  const room = await prisma.room.create({
    data: {
      roomName: roomName,
    },
  });

  res.json(room);
}

async function getRoomById(req, res) {
  const { roomId } = req.params;
  const room = await prisma.room.findUnique({
    where: {
      roomId: Number(roomId),
    },
  });

  res.json(room);
}

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
};
