/*
DOCUMENTATION URL: https://www.prisma.io/docs/guides/migrate/seed-database
run 'npx prisma db seed'
*/

const prisma = require('./prismaClient.js');

async function main() {
  const alex = await prisma.user.upsert({
    // the 'update' section can empty, but if it's populated it will find users that match the 'where' details and edit that database entry
    where: { userId: 'usr_' },
    update: {
      username: 'Harry',
      email: 'harry@email.com',
      hash: '123456789',
    },
    // if the user doesn't exist, it will create a user with the details provided below
    create: {
      username: 'Alex',
      email: 'alex@email.com',
      hash: '123456789',
      // remember, when referencing related tables use the @relation name (connectedRoom), not it's reference (roomId)
      connectedRoom: {
        create: {
          roomName: "Alex's Room",
        },
      },
    },
  });

  const nikita = await prisma.user.upsert({
    where: { userId: 'user_' },
    update: {},
    create: {
      username: 'Nikita',
      email: 'nikita@email.com',
      hash: 'abcdefghi',
      connectedRoom: {
        create: {
          roomName: "Nikita's Room",
        },
      },
    },
  });

  const alexPlaylist = await prisma.playlist.upsert({
    where: { playlistId: 'pl_' },
    update: {},
    // if the user doesn't exist, it will create a user with the details provided below
    create: {
      playlistName: "Alex's Playlist",
      songs: [
        {
          songName: 'Apple',
          songLikes: 3,
        },
        {
          songName: 'Banana',
          songLikes: 2,
        },
        {
          songName: 'Cherry',
          songLikes: 0,
        },
      ],
      room: {
        create: {
          roomName: 'Test Room',
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
