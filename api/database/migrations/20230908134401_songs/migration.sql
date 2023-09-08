/*
  Warnings:

  - You are about to drop the column `songs` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "messageId" SET DEFAULT (concat('msg_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "songs",
ALTER COLUMN "roomId" SET DEFAULT (concat('room_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userId" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT;

-- CreateTable
CREATE TABLE "Song" (
    "songId" TEXT NOT NULL DEFAULT (concat('song_', gen_random_uuid()))::TEXT,
    "songName" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("songId")
);

-- CreateTable
CREATE TABLE "_SongToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SongToUser_AB_unique" ON "_SongToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToUser_B_index" ON "_SongToUser"("B");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToUser" ADD CONSTRAINT "_SongToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("songId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToUser" ADD CONSTRAINT "_SongToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
