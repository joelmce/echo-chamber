const prisma = require('../database/prismaClient');

const getMessages = async (roomid) => {
  const messages = await prisma.messages.findMany({
    where: {
      roomId: Number(roomId),
    },
    select: {
      authorId: true,
      content: true,
    },
  });

  return messages;
};

const addMessage = async (authorId, roomId, content) => {
  try {
    await prisma.message.create({
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
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  addMessage,
  getMessages,
};
