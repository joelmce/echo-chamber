/*
DOCUMENTATION URL: https://www.prisma.io/docs/guides/migrate/seed-database
run 'npx prisma db seed'
*/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main () {

    const alex = await prisma.user.upsert({
        // the 'update' section can empty, but if it's populated it will find users that match the 'where' details and edit that database entry
        where: { userId: 1},
        update: {
            username: 'Harry',
            hash: '123456789',
        },
        // if the user doesn't exist, it will create a user with the details provided below
        create: {
            username: 'Alex',
            hash: '123456789',
            // remember, when referencing related tables use the @relation name (connectedRoom), not it's reference (roomId)
            connectedRoom: {
                create: {
                    roomName: "Alex's Room"
                }
            }
        }
    })

    const nikita = await prisma.user.upsert({
        where: { userId: 2 },
        update: {},
        create: {
            username: 'Nikita',
            hash: 'abcdefghi',
            connectedRoom: {
                create: {
                    roomName: "Nikita's Room"
                }
            }
        }
    })

    const alexPlaylist = await prisma.playlist.upsert({
        where: { playlistId: 1},
        update: {},
        // if the user doesn't exist, it will create a user with the details provided below
        create: {
            playlistName: "Alex's Playlist",
            songs: [
                {
                    songName: "Apple",
                    songLikes: 3,
                },
                {
                    songName: "Banana",
                    songLikes: 2,
                },
                {
                    songName: "Cherry",
                    songLikes: 0,
                },
            ],
            room: {
                connect: {
                    roomId: 1,
                },
            },        
        }
    })

    // logging out the details can help confirm they've been entered into the database
    console.log({ alex, nikita })
}

main().then(async() => {
    await prisma.$disconnect()
}).catch(async(e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})