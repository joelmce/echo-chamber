const prisma = require('../database/prismaClient');

/**
 * POST a message to the database in the given room id.
 */
async function addMessage(req, res) {
  const { roomId, messageContent, messageAuthor } = req.body;

  const message = await prisma.message.create({
    data: {
      messageContent,
      messageAuthor: {
        connect: {
          userId: messageAuthor.userId,
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
 * GET all the messages given with a room id
 */
async function getMessages(req, res) {
  const roomId = req.params.roomId;
  const messages = await prisma.message.findMany({
    where: {
      roomId: roomId,
    },
    select: {
      messageContent: true,
      messageAuthor: {
        select: {
          userId: true,
          username: true,
        },
      },
    },
  });
  res.send(messages);
}

/**
 * DELETE message in database
 */
async function deleteMessage(req, res) {
  const { messageId } = req.body;

  const message = await prisma.message.delete({
    where: {
      messageId: messageId,
    },
  });

  res.send(message);
}

module.exports = {
  addMessage,
  getMessages,
  deleteMessage,
};
