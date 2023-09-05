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
          userId: authorId,
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
  console.log('message sent:', message);
}

/**
 * Returns all the messages given with a room id
 * @param {*} req
 * @param {*} res
 */
async function getMessages(req, res) {
  const roomId = req.params.roomId;
  console.log(roomId);

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
