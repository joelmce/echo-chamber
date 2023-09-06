const prisma = require('../database/prismaClient');

/**
 * GET all rooms currently existing
 */
async function getAllRooms(req, res) {
  const allRooms = await prisma.room.findMany();
  res.json(allRooms);
}

/**
 * Create a room
 */
async function createRoom(req, res) {
  const { roomName } = req.body;

  const room = await prisma.room.create({
    data: {
      roomName: roomName,
    },
  });

  res.json(room);
}

/**
 * Return data of a room from an id
 */
async function getRoomById(req, res) {
  const roomId = req.params.id;
  console.log(roomId);
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
