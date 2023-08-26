const prisma = require('../database/prismaClient');

/**
 * Save a message to the database in the given room id.
 * @param {*} req
 * @param {*} res
 */
async function addMessage(req, res) {
  const { authorId, roomId, content } = req.body;

  const message = await prisma.message.create({
    data: {
      messageContent: content,
      messageAuthor: {
        connect: {
          authorId: authorId,
        },
      },
      room: {
        connect: {
          roomId: roomId,
        },
      },
    },
  });
  res.send(message);
}

/**
 * Returns all the messages given with a room id
 * @param {*} req
 * @param {*} res
 */
async function getMessages(req, res) {
  const { roomId } = req.params;

  const messages = await prisma.message.findMany({
    where: {
      roomId: Number(roomId),
    },
    select: {
      authorId: true,
      content: true,
    },
  });
}

module.exports = {
  addMessage,
  getMessages,
};
