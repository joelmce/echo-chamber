const prisma = require('../database/prismaClient');

/**
 * GET all rooms currently existing
 */
async function getAllRooms(req, res) {
  const allRooms = await prisma.room.findMany();
  res.json(allRooms);
}

async function getConnectUsers(req, res) {
  const connectedUsers = await prisma.room.findMany({
    by: 'users',
  });

  return connectedUsers;
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
  const room = await prisma.room.findUnique({
    where: {
      roomId: Number(roomId),
    },
  });

  res.json(room);
}

async function userJoinRoom(req, res) {
  const { roomId, userId } = req.body;

  const joinedRoom = await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      connectedRoom: {
        connect: {
          roomId: roomId,
        },
      },
    },
  });

  res.json(joinedRoom);
}

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  userJoinRoom,
  getConnectUsers,
};
